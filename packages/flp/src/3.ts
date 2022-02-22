/*
 * @Description:第 3 章：管理函数的输入
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-22 10:10:36
 */

import {
  constant,
  curry,
  curryProps,
  identity,
  looseCurry,
  not,
  partial,
  partialProps,
  partialRight,
  reverseArgs,
  unary,
  uncurry,
  when,
} from './utils'

export {}

function ajax(url: any, data: any, callback: any) {
  const res = { url, data }
  console.log(JSON.stringify(res))
  callback && callback(res)
}

// const getPerson = partial(ajax, '/person')
// getPerson('data', 'cb')
// const getCurrUser = partial(getPerson, 'user')
// getCurrUser('cccb')

const add = (a: any, b: any) => a + b

const arr = [1, 2, 3, 4].map(partial(add, 3))
// console.log(arr)

const cacheResult = reverseArgs(
  partial(reverseArgs(ajax), (res: any) => {
    console.log(`res====`, res)
  })
)

// cacheResult('/ccc', 'ddd')

const cacheResult2 = partialRight(ajax, (obj: any) => {
  console.log(`obj====`, obj)
})

// cacheResult2('/xxx', 'ooo')

const curriedAjax = curry(ajax)

// curriedAjax('/dd')('xx')(() => {
//   console.log(11)
// })

const arr2 = [1, 2, 3, 4].map(curry(add)(1))
// console.log(arr)

function sum(...args: any[]) {
  var sum = 0
  for (let i = 0; i < args.length; i++) {
    sum += args[i]
  }
  return sum
}

const curriedSum = curry(sum, 3)

// console.log(curriedSum(1)(2))

const curriedSum2 = looseCurry(sum, 5)
const uncurriedSum = uncurry(curriedSum2)
// console.log(curriedSum2(1, 2)(3)(4, 5))
// console.log(uncurriedSum(1, 2, 3, 4, 5))
const adder = looseCurry(sum, 2)
const arr3 = [1, 2, 3].map(adder(3))
// console.log(arr3)
const arr4 = [1, 2, 3].map(unary(adder(3)))
// console.log(arr4)

const words = '   Now is the time for all...  '.split(/\s|\b/)
// console.log(words)
// console.log(words.filter(identity))

// p1.then( foo ).then( () => p2 ).then( bar );
// 对比：
// p1.then( foo ).then( constant( p2 ) ).then( bar );

function foo({ x, y, z } = {} as any) {
  console.log(`x:${x} y:${y} z:${z}`)
}

const f1 = curryProps(foo, 3)
const f2 = partialProps(foo, { y: 2 })

// f1({ y: 2 })({ x: 1 })({ z: 3 })

// f2({ z: 3, x: 1 })

function output(txt: any) {
  console.log(txt)
}

// function printIf(predicate, msg) {
//   if (predicate(msg)) {
//     output(msg)
//   }
// }

function isShortEnough(str: string) {
  return str.length <= 5
}

const msg1 = 'Hello'
const msg2 = msg1 + ' World'

const printIf = uncurry(partialRight(when, output))
printIf(isShortEnough, msg1)
printIf(isShortEnough, msg2)

const isLongEnough = not(isShortEnough)
printIf(isLongEnough, msg1)
printIf(isLongEnough, msg2)
