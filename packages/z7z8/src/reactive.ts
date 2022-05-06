interface ReactiveEffect<T = any> {
  (...args: any): T
  scheduler: EffectScheduler
}

type AnyFunc = (...args: any[]) => any

type EffectScheduler = AnyFunc | null

interface EffectOptions {
  lazy?: boolean
  scheduler: EffectScheduler
}

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<string, Dep>

const targetMap = new WeakMap<object, KeyToDepMap>()
let activeEffect: ReactiveEffect | undefined

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

function effect(fn: AnyFunc, options: EffectOptions = { scheduler: null }) {
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

type ComputedGetter<T> = (...args: any) => T
type ComputedSetter<T> = (value: T) => void

function computed<T>(getter: ComputedGetter<T>) {
  return new ComputedRefImpl(getter, () => console.warn('计算属性不能修改'))
}

class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true
  public effect: ReactiveEffect<T>

  constructor(getter: ComputedGetter<T>, private _setter: ComputedSetter<T>) {
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          trigger(this, 'value')
        }
      },
    })
  }

  get value() {
    track(this, 'value')
    if (this._dirty) {
      this._value = this.effect()
      this._dirty = false
    }
    return this._value
  }

  set value(val: T) {
    this._setter(val)
  }
}

/* -------------------------------------------------------------------------- */
const state = reactive({ a: 1 })
const a2 = computed(() => state.a * 2)

effect(() => {
  console.log(a2.value)
})

const timer = setInterval(() => {
  state.a++

  if (state.a === 5) {
    clearInterval(timer)
  }
}, 1000)
