import { reactive, effect } from './lib/effect'

const data = reactive({
  foo: 'foo',
  bar: 1,
  ok: true,
})

// @ts-ignore
window.data = data

effect(() => {
  console.log(123)
  document.body.innerText = data.ok ? data.foo : 'not'
})

setTimeout(() => {
  data.ok = false
}, 1000)

setTimeout(() => {
  data.foo = 'false'
}, 2000)
