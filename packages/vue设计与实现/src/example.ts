import {
  effect,
  reactive,
  computed,
  shallowReactive,
  readonly,
  shallowReadonly,
} from './lib/effect'

const obj = { foo: { bar: 1 } }
const data = readonly({ foo: { bar: 1 } })
const data2 = shallowReadonly({ foo: { bar: 1 } })

effect(() => {
  console.log(111, data.foo.bar)
})

effect(() => {
  console.log(222, data2.foo.bar)
})

setTimeout(() => {
  data.foo.bar++
  data2.foo.bar++
}, 500)

// @ts-ignore
window.data = data

// @ts-ignore
window.data2 = data2
