import { isFunction } from '../shared'
import { ReactiveEffect, effect, trigger, track } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'

interface ComputedRef<T = any> {
  readonly value: T
}

type ComputedGetter<T> = (...args: any[]) => T
type ComputedSetter<T> = (value: T) => void
interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>
export function computed<T>(options: WritableComputedOptions<T>): ComputedRef<T>
export function computed<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = () => {
      console.warn('计算属性不能修改')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl<T> {
  private _dirty = true
  private _value!: T
  public effect: ReactiveEffect<T>
  public readonly __isRef = true

  constructor(getter: ComputedGetter<T>, private _setter: ComputedSetter<T>) {
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          trigger(this, TriggerOpTypes.SET, 'value')
        }
      },
    })
  }

  get value() {
    track(this, TrackOpTypes.GET, 'value')
    if (this._dirty) {
      this._dirty = false
      this._value = this.effect()
    }
    return this._value
  }

  set value(newValue) {
    this._setter(newValue)
  }
}
