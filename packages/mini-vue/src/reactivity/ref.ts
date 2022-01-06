import { reactive } from '.'
import { isObject } from '../shared'
import { track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'

interface Ref<T = any> {
  value: T
}

export function ref<T = any>(value: T): Ref<T> {
  if (isRef(value)) {
    return value
  }

  return new RefImpl(value)
}

function isRef(r: any): r is Ref {
  return r && r._isRef === true
}

class RefImpl<T> {
  public readonly _isRef = true
  private _value: T

  constructor(value: T) {
    this._value = convert<T>(value)
  }

  get value() {
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newValue) {
    this._value = convert(newValue)
    trigger(this, TriggerOpTypes.SET, 'value')
  }
}

function convert<T>(val: T) {
  return isObject(val) ? reactive(val as AnyObject) : val
}
