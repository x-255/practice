import { reactive, effect } from './lib/effect'

const data = reactive({
  foo: 'foo',
  bar: 1,
  ok: true,
})

// @ts-ignore
window.data = data

/* effect(
  () => {
    console.log(data.bar)
  },
  {
    scheduler(fn) {
      setTimeout(fn)
    },
  }
)

data.bar++
console.log('end') */

const jobQueue = new Set<() => void>()
let isFlushing = false

function flushJob() {
  if (isFlushing) return
  isFlushing = true

  Promise.resolve()
    .then(() => {
      jobQueue.forEach((job) => job())
    })
    .finally(() => {
      isFlushing = false
    })
}

effect(
  () => {
    console.log(data.bar)
  },
  {
    scheduler(fn) {
      jobQueue.add(fn)
      flushJob()
    },
  }
)

data.bar++
data.bar++
