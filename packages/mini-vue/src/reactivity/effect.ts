import { TrackOpTypes, TriggerOpTypes } from './operations'

type EffectScheduler = AnyFunction | null

export interface ReactiveEffect<T = any> {
  (...args: any[]): T
  scheduler: EffectScheduler
}

export interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler: EffectScheduler
}

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<string, Dep>

const targetMap = new WeakMap<object, KeyToDepMap>()
const effectStack: ReactiveEffect[] = []
let activeEffect: ReactiveEffect | undefined

export function track(target: object, type: TrackOpTypes, key: string) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }

    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }

    deps.add(activeEffect)
  }
}

export function trigger(target: object, type: TriggerOpTypes, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  const deps = depsMap.get(key)
  if (!deps) {
    return
  }

  deps.forEach((effect) => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect()
    }
  })
}

export function effect<T = any>(fn: () => T, options: ReactiveEffectOptions = { scheduler: null }) {
  const effectFn = (() => {
    try {
      activeEffect = effectFn
      effectStack.push(effectFn)
      return fn()
    } finally {
      effectStack.pop()
      const n = effectStack.length
      activeEffect = n > 0 ? effectStack[n - 1] : undefined
    }
  }) as ReactiveEffect

  effectFn.scheduler = options.scheduler
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}
