import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
  ref,
  toRef,
  toRefs,
  proxyRefs,
} from './lib/effect'

const data = reactive({ foo: 1, bar: 1 })
const pRefs = reactive({ ...toRefs(data) })

console.log(pRefs)

// @ts-ignore
window.data = data
