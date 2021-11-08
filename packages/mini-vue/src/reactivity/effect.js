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
  console.log(targetMap)
}

export function trigger(target, key, newValue, oldValue) {}
