/*
 * @Description:transducing
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-24 17:31:28
 */

import {
  compose,
  transduceFilter,
  transduceMap,
  filterReducer,
  listCombination,
  mapReducer,
} from './utils'

function isLongEnough(str: any) {
  return str.length >= 5
}

function isShortEnough(str: any) {
  return str.length <= 10
}

function strUppercase(str: any) {
  return str.toUpperCase()
}

function strConcat(str1: any, str2: any) {
  return str1 + str2
}

const strUppercaseReducer = transduceMap(strUppercase)(listCombination)

const isLongEnoughReducer = transduceFilter(isLongEnough)(listCombination)

const isShortEnoughReducer = transduceFilter(isShortEnough)(listCombination)

const words = ['You', 'have', 'written', 'something', 'very', 'interesting']

const w1 = words
  .reduce(strUppercaseReducer, [])
  .reduce(isLongEnoughReducer, [])
  .reduce(isShortEnoughReducer, [])
  .reduce(strConcat, '')

// console.log(w1)

const transducer = compose(
  transduceMap(strUppercase),
  transduceFilter(isLongEnough),
  transduceFilter(isShortEnough)
)

const w2 = words.reduce(transducer(listCombination), [])
// console.log(w2)

const transducer1 = compose(
  (combinationFn: any) => mapReducer(strUppercase, combinationFn),
  (combinationFn: any) => filterReducer(isLongEnough, combinationFn),
  (combinationFn: any) => filterReducer(isShortEnough, combinationFn)
)

const reducer = mapReducer(
  strUppercase,
  filterReducer(isLongEnough, filterReducer(isShortEnough, listCombination))
)
const w4 = words.reduce(reducer, [])
// console.log(w4)

const w5 = words.reduce(transducer(strConcat), '')
console.log(w5)
