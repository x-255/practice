/*
 * @Description:transducing
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-24 22:14:28
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

const w3 = words.reduce(transducer(strConcat), '')
// console.log(w3)

const transducer2 = (combinationFn: any) =>
  mapReducer(
    strUppercase,
    filterReducer(isLongEnough, filterReducer(isShortEnough, combinationFn))
  )

const transducer3 = (combinationFn: any) => (list: any, val: any) => {
  if (isShortEnough(val)) {
    if (isLongEnough(val)) {
      return combinationFn(list, strUppercase(val))
    } else {
      return list
    }
  } else {
    return list
  }
}

const reducer1 = transducer3(listCombination)
// console.log(words.reduce(reducer1, []))

const reducer2 = transducer3(strConcat)
// console.log(words.reduce(reducer2, ''))

const reducer11 = (list: any[], val: any) => {
  if (isShortEnough(val)) {
    if (isLongEnough(val)) {
      return list.concat([strUppercase(val)])
    } else {
      return list
    }
  } else {
    return list
  }
}

const reducer22 = (str1: any, str2: any) => {
  if (isShortEnough(str2)) {
    if (isLongEnough(str2)) {
      return str1 + strUppercase(str2)
    } else {
      return str1
    }
  } else {
    return str1
  }
}
