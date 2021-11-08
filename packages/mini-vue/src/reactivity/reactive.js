import { isObject } from '../shared'
import { mutableHandlers } from './baseHandlers'

const proxyMap = new WeakMap()

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers, proxyMap)
}

function createReactiveObject(target, baseHandlers, proxyMap) {
  if (!isObject(target)) {
    return target
  }

  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
