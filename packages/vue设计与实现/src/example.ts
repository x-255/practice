import { reactive, effect } from './lib/effect'

const data = reactive({
  foo: 'foo',
  bar: 1,
  ok: true,
})

// @ts-ignore
window.data = data

let temp1, temp2
effect(() => {
  console.log('e1')

  effect(function f2() {
    console.log('e2')
    temp1 = data.bar
  })
  temp2 = data.foo
})
