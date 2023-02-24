import { effect, reactive } from './lib/effect'

const data = reactive({
  foo: 1,
  bar: 2,
})

// @ts-ignore
window.data = data

let temp1: any, temp2: any
effect(() => {
  console.log('fn1')

  effect(() => {
    console.log('fn2')
    temp2 = data.bar
  })

  temp1 = data.foo
})
