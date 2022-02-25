/*
 * @Description:柯里化（curry） 练习
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-25 16:36:02
 */

import { filter, invoker, map, reduce, split, test } from 'ramda'
import { expect } from './test'

// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数
const words = split(' ')
expect(
  words,
  ['Jingle', 'bells', 'Batman', 'smells'],
  'Jingle bells Batman smells'
)

// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组
const sentences = map(words)
expect(
  sentences,
  [
    ['Jingle', 'bells', 'Batman', 'smells'],
    ['Robin', 'laid', 'an', 'egg'],
  ],
  ['Jingle bells Batman smells', 'Robin laid an egg']
)

// 练习 2
//==============
// 通过局部调用（partial apply）移除所有参数
const filterQs = filter(test(/q/i))
expect(
  filterQs,
  ['quick', 'quarry', 'quails'],
  ['quick', 'camels', 'quarry', 'over', 'quails']
)

// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
function _keepHighest(x: number, y: number) {
  return x >= y ? x : y
}

const max = reduce(_keepHighest, -Infinity)
expect(max, 5234, [323, 523, 554, 123, 5234])

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
const slice = invoker(2, 'slice')
expect(slice(1)(3), ['b', 'c'], ['a', 'b', 'c'])

// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
const take = slice(0)
expect(take(2), ['a', 'b'], ['a', 'b', 'c'])
