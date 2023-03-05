import { effect, reactive, computed } from './lib/effect'

const child = reactive<{ foo?: number }>({})
const parent = reactive({ foo: 1 })
Object.setPrototypeOf(child, parent)

effect(() => {
  console.log(child.foo)
})

// @ts-ignore
window.data = child
