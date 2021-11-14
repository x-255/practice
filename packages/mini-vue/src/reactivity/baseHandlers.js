import { reactive } from './reactive'
import { hasOwn, isArray, isInt, isObject, isSymbol } from '../shared'
import { track, trigger } from './effect'
import { TriggerOpTypes } from './operations'

const createGetter = () => (target, key, receiver) => {
  const value = Reflect.get(target, key, receiver)
  if (isSymbol(key)) {
    return value
  }
  track(target, key)
  if (isObject(value)) {
    return reactive(value)
  }
  return value
}

const createSetter = () => (target, key, value, receiver) => {
  const oldValue = target[key]

  const hadKey = isArray(target) ? isInt(key) && parseInt(key) < target.length : hasOwn(target, key)

  const res = Reflect.set(target, key, value, receiver)

  if (!hadKey) {
    trigger(target, TriggerOpTypes.ADD, key, value)
  } else {
    trigger(target, TriggerOpTypes.SET, key, value, oldValue)
  }

  return res
}

const get = createGetter()

const set = createSetter()

export const mutableHandlers = {
  get,
  set,
}
