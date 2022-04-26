interface ReactiveEffect<T = any> {
  (...args: any): T
  scheduler: EffectScheduler
}

type EffectScheduler = AnyFunction | null

interface EffectOptions {
  lazy?: boolean
  scheduler: EffectScheduler
}

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<string, Dep>

const targetMap = new WeakMap<object, KeyToDepMap>()
let activeEffect: ReactiveEffect | undefined

function reactive<T extends object>(target: T) {
  return new Proxy<T>(target, {
    get(target: object, key: string, receiver: any) {
      const val = Reflect.get(target, key, receiver)
      track(target, key)
      return val
    },
    set(target: object, key: string, value: any, receiver: any) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    },
  })
}

function effect(fn: AnyFunction, options: EffectOptions = { scheduler: null }) {
  const effectFn = (() => {
    try {
      activeEffect = effectFn
      return fn()
    } finally {
      activeEffect = undefined
    }
  }) as ReactiveEffect

  effectFn.scheduler = options.scheduler

  if (!options.lazy) {
    effectFn()
  }

  return effectFn
}

function track(target: object, key: string) {
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

function trigger(target: object, key: string) {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    return
  }

  let deps = depsMap.get(key)

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

/* -------------------------------------------------------------------------- */
const state = reactive({ a: 1 })

effect(() => {
  console.log(state.a)
})

const timer = setInterval(() => {
  state.a++

  if (state.a === 5) {
    clearInterval(timer)
  }
}, 1000)
