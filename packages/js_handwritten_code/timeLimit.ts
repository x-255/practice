// leetcode 2637. 有时间限制的 Promise 对象

type Fn = (...params: any[]) => Promise<any>

function timeLimit(fn: Fn, t: number): Fn {
  return (...args: any[]) => new Promise(async (resolve, reject) => {
    const start = performance.now()
    let timer = setTimeout(() => {
      reject('Time Limit Exceeded')
    }, t)

    try {
      const res = await fn(...args)
      clearTimeout(timer)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

const limited = timeLimit((t) => new Promise((res) => setTimeout(res, t)), 100)
limited(50).then(console.log).catch(console.log) // "Time Limit Exceeded" at t=100ms

export {}