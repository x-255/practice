import { effect, reactive, computed } from './lib/effect'

const data = reactive({
  foo: 1,
})

effect(() => {
  for (const key in data) {
    console.log(key)
  }
})

// @ts-ignore
window.data = data
