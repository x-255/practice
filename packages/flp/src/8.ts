import { compose } from './utils'

/*
 * @Description:列表操作
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-21 23:15:05
 */
export {}

const arr1 = ['1', '2', '3', '4']
// console.log(map(arr1, unary(parseInt)))

const increment = (v) => ++v
const decrement = (v) => --v
const square = (v) => v * v

const double = (v) => v * 2

const arr2 = [increment, decrement, square]
  .map((fn) => compose(fn, double))
  .map((fn) => fn(3))

console.log(arr2)
