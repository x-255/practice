import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
  ref,
} from './lib/effect'

const data = ref(1)

effect(() => {
  console.log(`data.value====`, data.value)
})

// @ts-ignore
window.data = data
