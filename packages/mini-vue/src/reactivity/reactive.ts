import { isObject } from '../shared'
import { mutableHandles } from './baseHandlers'

export function reactive<T extends object>(target: T): T {
  if (!isObject(target)) {
    console.warn(`reactive ${target} 必须是一个对象`)
    return target
  }

  return new Proxy<T>(target, mutableHandles)
}
