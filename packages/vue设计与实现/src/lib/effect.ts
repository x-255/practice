interface EffectOptions {
  lazy?: boolean
  scheduler?(): void
}

interface EffectFn {
  (): any
  deps: Set<AnyFunction>[]
}

let activeEffect: EffectFn
const bucket = new WeakMap<AnyObject, Map<PropertyKey, Set<AnyFunction>>>()
const effectStack: EffectFn[] = []

// @ts-ignore
window.bucket = bucket

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

  if (depsMap) {
    const deps = depsMap.get(key)

    if (!deps) return

    const effectsToRun = new Set(deps)
    effectsToRun.forEach((effect) => effect())
  }
}

function cleanup(effectFn: EffectFn) {
  for (let deps of effectFn.deps) {
    deps.delete(effectFn)
  }

  effectFn.deps.length = 0
}

export function reactive<T extends AnyObject>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)

      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal, receiver) {
      const res = Reflect.set(target, key, newVal, receiver)

      trigger(target, key)

      return res
    },
  })
}

export function effect(fn: AnyFunction, options: EffectOptions = {}) {
  const effectFn: EffectFn = () => {
    activeEffect = effectFn
    effectStack.push(effectFn)
    cleanup(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }

  effectFn.deps = []
  effectFn()
}
