/*
 * @Description:transducing
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-25 13:10:08
 */

import {
  compose,
  transduceFilter,
  transduceMap,
  filterReducer,
  listCombination,
  mapReducer,
  transduce,
} from './utils'

function isShortEnough(str: any) {
  return str.length <= 10
}

function isLongEnough(str: any) {
  return str.length >= 5
}

function strUppercase(str: any) {
  return str.toUpperCase()
}

function strConcat(str1: any, str2: any) {
  return str1 + str2
}

const words = ['You', 'have', 'written', 'something', 'very', 'interesting']
// const words = ['written']

/* const strUppercaseReducer = transduceMap(strUppercase)(listCombination)

const isLongEnoughReducer = transduceFilter(isLongEnough)(listCombination)

const isShortEnoughReducer = transduceFilter(isShortEnough)(listCombination)



const w1 = words
  .reduce(strUppercaseReducer, [])
  .reduce(isLongEnoughReducer, [])
  .reduce(isShortEnoughReducer, [])
  .reduce(strConcat, '')

console.log(w1) */

/* const transducer = compose(
  transduceMap(strUppercase),
  transduceFilter(isLongEnough),
  transduceFilter(isShortEnough)
)

const w2 = words.reduce(transducer(listCombination), [])
console.log(w2) */

/* const transducer = compose(
  (combinationFn: any) => mapReducer(strUppercase, combinationFn),
  (combinationFn: any) => filterReducer(isLongEnough, combinationFn),
  (combinationFn: any) => filterReducer(isShortEnough, combinationFn)
)

const w3 = words.reduce(transducer(listCombination), [])
console.log(w3) */

/* const transducer = (combinationFn: any) =>
  mapReducer(
    strUppercase,
    filterReducer(isLongEnough, filterReducer(isShortEnough, combinationFn))
  )
const w4 = words.reduce(transducer(listCombination), [])
console.log(w4) */

/* const transducer = (combinationFn: any) => (list: any[], val: any) => {
  val = strUppercase(val)
  return isLongEnough(val)
    ? isShortEnough(val)
      ? combinationFn(list, val)
      : list
    : list
}

const w5 = words.reduce(transducer(listCombination), [])
console.log(w5) */

/* const transducer = compose(
  transduceMap(strUppercase),
  transduceFilter(isLongEnough),
  transduceFilter(isShortEnough)
)

const w6 = transduce(transducer, listCombination, [], words)
console.log(w6)

const w7 = transduce(transducer, strConcat, '', words)
console.log(w7) */
