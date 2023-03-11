import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
} from './lib/effect'

const obj = {}
const data = reactive([obj])
console.log(data.includes(obj))

effect(() => {})

// @ts-ignore
window.data = data
