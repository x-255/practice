import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
} from './lib/effect'

const data = reactive([])

effect(() => {
  data.push(1)
})

effect(() => {
  data.push(1)
})

// @ts-ignore
window.data = data
