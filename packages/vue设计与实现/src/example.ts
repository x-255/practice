import { effect, reactive } from './lib/effect'

const data = reactive({ foo: 1 })

effect(() => {
  data.foo++
})

// @ts-ignore
window.data = data
