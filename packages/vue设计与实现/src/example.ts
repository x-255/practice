import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
} from './lib/effect'

const data = reactive([1, 2, 3])

effect(() => {
  console.log(data[1])
})

data.length = 1

// @ts-ignore
window.data = data
