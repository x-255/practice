interface EffectFn<T = any> {
  (): T
  deps: Deps[]
}

type DepsMap = Map<PropertyKey, Deps>

type Deps = Set<EffectFn>

/**
 * 存储副作用函数的桶
 * 结构：
 * target
 *   \_key
 *      \_effectFn
 */
const bucket = new WeakMap<AnyObject, DepsMap>()

// 用一个全局变量储被注册的副作用函数
let activeEffect: EffectFn | undefined

// effect栈
const effectStack: EffectFn[] = []

export function effect(fn: AnyFunction) {
  const effectFn: EffectFn = () => {
    /**
     * 副作用函数执行前将其从相关联的依赖集合中移除
     * 当副作用函数执行后会重新建立联系，但在新的联系中不会包含遗留的副作用函数
     * 比如
     * const data = reactive({
     *     ok: true,
     *     text: 'not',
     *   })
     *   effect(() => {
     *     document.querySelector('#text')!.textContent = data.ok ? data.text : 'not'
     *   })
     *
     * data.ok = false
     * 之后无论text怎么变都不需要重新执行副作用函数
     */
    cleanup(effectFn)
    activeEffect = effectFn
    // 在调用副作用函数前压入栈中
    effectStack.push(effectFn)
    fn()
    /**
     * 当前副作用函数执行完，将其弹出栈，并恢复为之前的值
     * 如此，响应式数据就只会收集直接读取其值的副作用函数作为依赖，从而避免发生（比如effect嵌套导致的）错乱。
     */
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }

  // 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  effectFn()
}

export function reactive<T extends AnyObject>(target: T) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 将副作用函数activeEffect添加到桶中
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      // 把副作用函数从桶中取出执行
      trigger(target, key)

      return res
    },
  })
}

function track(target: AnyObject, key: PropertyKey) {
  if (!activeEffect) return

  let depsMap = bucket.get(target)

  if (!depsMap) bucket.set(target, (depsMap = new Map()))

  let deps = depsMap.get(key)

  if (!deps) depsMap.set(key, (deps = new Set()))

  deps.add(activeEffect)

  activeEffect.deps.push(deps)
}

function trigger(target: AnyObject, key: PropertyKey) {
  const depsMap = bucket.get(target)

  if (!depsMap) return

  const effects = depsMap.get(key)

  /**
   * 当副作用函数执行时会调用cleanup将其清除，但副作用函数的执行会导致其重新被收集到集合中
   * 这个过程可以用如下简短的代码来描述
   *
   * const set = new Set([1])
   * set.forEach(item => {
   *   set.delete(1)
   *   set.add(1)
   *   console.log('遍历中。。。')
   * })
   *
   * 语言规范中对此有明确的说明：
   * 在调用forEach遍历Set集合时，如果一个值已经被访问过了，但该值被删除并重新添加到集合，
   * 如果此时遍历没有结束，那么该值会重新被访问。因此上面的代码会无限执行。
   * 解决办法可以构造另外一个Set集合并遍历它。
   *
   * const set = new Set([1])
   * const newSet = new Set(set)
   *
   * newSet.forEach((item) => {
   *   set.delete(1)
   *   set.add(1)
   *   console.log('遍历中。。。')
   * })
   */
  const effectsToRun = new Set<EffectFn>()

  effects?.forEach((effect) => {
    /**
     * const data = reactive({ foo: 1 })
     * effect(() => {
     *   data.foo++
     * })
     *
     * 这段代码会导致无限递归循环，导致栈溢出
     * data.foo++ 相当于 data.foo = data.foo + 1
     * 这个语句中首先读取foo，会触发track操作，收集副作用函数到桶里，
     * 接着将其加一后在赋值给foo，此时触发trigger，从桶里取出副作用函数执行。
     * 但问题是该副作用函数正在执行中，还没执行完就又要开始下一次执行。
     * 这样会无限递归的调用自己，于是就产生了栈溢出。
     *
     * 因为读取和设置操作的都是同一个函数，也就是activeEffect。
     * 所以增加守卫条件：如果在trigger触发的副作用函数与正在执行的副作用函数相同，则不触发执行。
     */
    if (effect !== activeEffect) {
      effectsToRun.add(effect)
    }
  })

  effectsToRun.forEach((effect) => effect())
}

function cleanup(effectFn: EffectFn) {
  effectFn.deps.forEach((deps) => {
    deps.delete(effectFn)
  })

  effectFn.deps.length = 0
}
