import { computed, effect, reactive, ref } from './src'

const a = ref(1)
const b = reactive({ b: 1 })
const ab = computed(() => String(a.value + b.b))

effect(() => {
  document.body.textContent = String(ab.value)
})

setInterval(() => {
  a.value++
}, 1000)
