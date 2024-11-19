// 2630. 记忆函数 II

type Fn = (...params: any) => any

function memoize(fn: Fn): Fn {
  const resMap = new Map<string, any>()
  const argsMap = new Map<any, number>()
  let id = 0
  return function (this: any, ...args) {
    let key = ''
    for (let a of args) {
      if (!argsMap.has(a)) {
        argsMap.set(a, id++)
      }
      key += `${argsMap.get(a)},`
    }

    if (resMap.has(key)) {
      return resMap.get(key)
    }
    const res = fn.apply(this, args)
    resMap.set(key, res)
    return res
  }
}

let callCount = 0
const memoizedFn = memoize(function (a, b) {
  callCount += 1
  return a - b
})
const o = {}
console.log(memoizedFn(2, 2))
console.log(memoizedFn(2, 2))
console.log(memoizedFn(1, 2))
console.log(callCount)

export {}
