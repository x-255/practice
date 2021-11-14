import { runMain } from 'module'
import { isArray, isInt } from '../shared'
import { TriggerOpTypes } from './operations'

const targetMap = new WeakMap()
const effectStack = []
let activeEffect = null
let uid = 0

export function effect(fn, options = {}) {
  const _effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    _effect()
  }

  return _effect
}

function createReactiveEffect(fn, options) {
  const effect = () => {
    if (!effectStack.includes(effect)) {
      try {
        activeEffect = effect
        effectStack.push(activeEffect)
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.id = uid++
  effect.options = options
  effect.deps = []
  return effect
}

export function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep)
    }
  }
}

export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  function run(dep) {
    if (dep) dep.forEach((effect) => effect())
  }

  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= value) {
        run(dep)
      }
    })
  } else {
    if (key !== undefined) {
      run(depsMap.get(key))
    }

    switch (type) {
      case TriggerOpTypes.ADD:
        if (isArray(target) && isInt(key)) {
          run(depsMap.get('length'))
        }
        break

      default:
        break
    }
  }
}
