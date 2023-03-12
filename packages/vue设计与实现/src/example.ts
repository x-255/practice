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
} from './lib/effect'

const data = reactive({ foo: 1, bar: 1 })
const { foo, bar } = toRefs(data)

effect(() => {
  console.log(`foo.value====`, foo.value)
})

effect(() => {
  console.log(`bar.value====`, bar.value)
})

// @ts-ignore
window.data = data
