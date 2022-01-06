import { isObject } from '../shared'
import { track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import { reactive } from './reactive'

function createGetter(shallow = false) {
  return function get(target: object, key: string, receiver: object) {
    const res = Reflect.get(target, key, receiver)
    track(target, TrackOpTypes.GET, key)

    if (isObject(res) && !shallow) {
      return reactive(res)
    }

    return res
  }
}

function createSetter(shallow = false) {
  return function set(target: object, key: string, value: any, receiver: object) {
    const res = Reflect.set(target, key, value, receiver)
    trigger(target, TriggerOpTypes.SET, key)
    return res
  }
}

const get = createGetter()
const set = createSetter()

export const mutableHandles = {
  get,
  set,
}
