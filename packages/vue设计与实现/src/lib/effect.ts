type EffectFn = () => any

interface EffectOptions {
  lazy?: boolean
  scheduler?(): void
}

const bucket = new WeakMap<AnyObject, Map<PropertyKey, Set<EffectFn>>>()
let activeEffect: EffectFn

export function reactive<T extends AnyObject>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)

      if (!activeEffect) return value

      let depsMap = bucket.get(target)

      if (!depsMap) bucket.set(target, (depsMap = new Map()))

      let deps = depsMap.get(key)

      if (!deps) depsMap.set(key, (deps = new Set()))

      deps.add(activeEffect)

      return value
    },
    set(target, key, newVal, receiver) {
      const res = Reflect.set(target, key, newVal, receiver)

      const depsMap = bucket.get(target)

      if (depsMap) {
        const deps = depsMap.get(key)

        if (deps) {
          deps.forEach((effect) => effect())
        }
      }

      return res
    },
  })
}

export function effect(effectFn: EffectFn, options: EffectOptions = {}) {
  activeEffect = effectFn

  effectFn()
}
