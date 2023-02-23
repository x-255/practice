import { effect, reactive } from './lib/effect'

const data = reactive({
  ok: true,
  text: 'hi',
})

// @ts-ignore
window.data = data

effect(() => {
  document.querySelector('#text')!.textContent = data.ok ? data.text : 'not'
})

document.querySelector('#add')?.addEventListener('click', () => {
  data.ok = false
})
