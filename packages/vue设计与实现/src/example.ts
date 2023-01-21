import { reactive, effect } from './lib/effect'

const data = reactive({
  foo: 'foo',
  bar: 1,
  ok: true,
})

// @ts-ignore
window.data = data

effect(() => {
  data.bar++
})
