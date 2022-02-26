import { curry } from 'ramda'

type Expect = <T, U>(f: (...args: T[]) => U, result: U, ...args: T[]) => boolean

export const expect: Expect = (f, result, ...args) => {
  const runResult = f(...args)
  const isExpect = JSON.stringify(runResult) === JSON.stringify(result)

  if (!isExpect) {
    console.log(`实际的结果：${runResult}`)
    console.log('===========')
    console.log(`期望的结果：${result}`)
  }

  return isExpect
}

export const trace = curry(function trace<T>(tag: string, x: T) {
  console.log(tag, x)
  return x
})
