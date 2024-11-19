// leetcode 2721. 并行执行异步函数

type Fn<T> = () => Promise<T>

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const res: T[] = []
    let done = 0
    functions.forEach((fn, index) => {
      fn()
        .then((data) => {
          res[index] = data
          if (++done === functions.length) {
            resolve(res)
          }
        })
        .catch(reject)
    })
  })
}

const promise = promiseAll([
  () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
])
promise.then(console.log)

export {}