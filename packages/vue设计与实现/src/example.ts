import { effect, reactive, computed, shallowReactive } from './lib/effect'

const obj = { foo: { bar: 1 } }
const data = reactive({ foo: { bar: 1 } })
const data2 = shallowReactive({ foo: { bar: 1 } })

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
