import { reactive, effect } from './lib/effect'

const data = reactive({
  foo: 'foo',
  bar: 1,
})

effect(() => {
  document.body.innerText = data.foo
})

setTimeout(() => {
  data.foo = '999'
}, 1000)
