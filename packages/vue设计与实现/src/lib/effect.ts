interface EffectFn<T = any> {
  (): T
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

export function effect(fn: AnyFunction) {
  activeEffect = fn
  fn()
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
      trigger(target, key, value)

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
}

function trigger(target: AnyObject, key: PropertyKey, value: unknown) {
  const depsMap = bucket.get(target)

  if (!depsMap) return

  const effects = depsMap.get(key)

  effects && effects.forEach((effect) => effect())
}
