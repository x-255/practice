/*
 * @Description:递归
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-23 15:07:43
 */

import { identity } from './utils'

export {}

function maxEven(num1?: any, ...nums: any[]) {
  const maxRest: any = nums.length > 0 ? maxEven(...nums) : null
  return num1 % 2 !== 0 || num1 < maxRest ? maxRest : num1
}

// console.log(maxEven( 1, 10, 3, 2 ))

// function sum(num1?: any,...nums: any[]): any {
//   if (nums.length == 0) return num1;
//   return num1 + sum( ...nums );
// }

// console.log(fib(40))

/* ------------------------------ 正确的尾调用 (PTC) ------------------------------ */
// const sum = (function iife() {
//   return function sum(...nums: any[]) {
//     return sumRec(0, ...nums)
//   }

//   function sumRec(res?: any, num1?: any, ...nums: any[]): any {
//     res = res + num1
//     if (nums.length === 0) {
//       return res
//     }
//     return sumRec(res, ...nums)
//   }
// })()

// function sum(num1?: any, num2?: any, ...nums: any[]): any {
//   num1 = num1 + num2
//   if (nums.length === 0) {
//     return num1
//   }
//   return sum(num1, ...nums)
// }

// console.log(sum(3, 1, 17, 94, 8))

// function fib(n: any): any {
//   if (n <= 1) {
//     return n
//   }
//   return fib(n - 1) + fib(n - 2)
// }

/* ------------------------------ 后继传递格式 （CPS） ------------------------------ */
function fib(n: any, cont = identity): any {
  if (n <= 1) {
    return cont(n)
  }

  return fib(n - 2, (n2) => fib(n - 1, (n1) => cont(n1 + n2)))
}

// console.log(fib(10))

function trampoline(fn: AnyFunction) {
  return function trampolined(...args: any[]) {
    let res = fn(...args)

    while (typeof res === 'function') {
      res = res()
    }

    return res
  }
}

const sum = trampoline(function sum(num1?: any, num2?: any, ...nums: any[]) {
  num1 += num2
  if (nums.length === 0) {
    return num1
  }

  return () => sum(num1, ...nums)
})

let xs = []
for (let i = 0; i < 20000; i++) {
  xs.push(i)
}

console.log(sum(...xs))
