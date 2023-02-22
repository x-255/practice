import { effect, reactive } from './lib/effect'

const data = reactive({
  foo: 1,
  bar: 'xx',
})

effect(() => {
  document.querySelector('#text')!.textContent = data.foo + ''
})

document.querySelector('#add')?.addEventListener('click', () => {
  data.foo++
})
