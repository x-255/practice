import { effect, reactive } from './lib/effect'

const data = reactive({ foo: 1 })

// 决定副作用函数执行的时机
/* effect(
  () => {
    console.log(data.foo)
  },
  {
    scheduler(fn) {
      setTimeout(fn)
    },
  }
)

data.foo++
console.log('end') */

// 决定副作用函数执行的次数
const jobQueue = new Set<AnyFunction>()
const p = Promise.resolve()

let isFlushing = false
function flushJob() {
  if (isFlushing) return

  isFlushing = true

  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

effect(
  () => {
    console.log(data.foo)
  },
  {
    scheduler(fn) {
      jobQueue.add(fn)
      flushJob()
    },
  }
)

data.foo++
data.foo++

// @ts-ignore
window.data = data
