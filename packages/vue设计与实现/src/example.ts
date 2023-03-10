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
  for (let v of data) {
    console.log(`v====`, v)
  }
})

// @ts-ignore
window.data = data
