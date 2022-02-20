/*
 * @Description:组合函数
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-20 23:29:53
 */

import { compose2 } from './utils'

function words(str) {
  return String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w]+$/.test(v)
    })
}

function unique(list) {
  const uniqList: any[] = []

  for (let i = 0; i < list.length; i++) {
    // value not yet in the new list?
    if (uniqList.indexOf(list[i]) === -1) {
      uniqList.push(list[i])
    }
  }

  return uniqList
}

const text =
  'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.'

const wordsUsed = unique(words(text))
// console.log(wordsUsed)

const uniqueWords = compose2(unique, words)
console.log(uniqueWords(text))
