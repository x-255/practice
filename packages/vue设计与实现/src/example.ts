import { effect, reactive, computed } from './lib/effect'

const data = reactive({ foo: 1, bar: 2 })

const sum = computed(() => {
  const val = data.foo + data.bar
  console.log(11, val)

  return val
})

effect(() => {
  console.log(sum.value)
})

// @ts-ignore
window.data = data
