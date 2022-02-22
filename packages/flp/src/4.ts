/*
 * @Description:组合函数
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-22 10:22:36
 */

import {
  compose,
  compose2,
  makeObjProp,
  partial,
  partialRight,
  pipe,
  prop,
} from './utils'

function words(str: any) {
  return String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w]+$/.test(v)
    })
}

function unique(list: any[]) {
  const uniqList: any[] = []

  for (let i = 0; i < list.length; i++) {
    // value not yet in the new list?
    if (uniqList.indexOf(list[i]) === -1) {
      uniqList.push(list[i])
    }
  }

  return uniqList
}

function skipShortWords(list: any[]) {
  const filteredList: any[] = []

  for (let i = 0; i < list.length; i++) {
    if (list[i].length > 4) {
      filteredList.push(list[i])
    }
  }

  return filteredList
}

function skipLongWords(list: any[]) {
  const filteredList: any[] = []

  for (let i = 0; i < list.length; i++) {
    if (list[i].length <= 4) {
      filteredList.push(list[i])
    }
  }

  return filteredList
}

const text =
  'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.'

const wordsUsed = unique(words(text))
// console.log(wordsUsed)

const uniqueWords = compose2(unique, words)
// console.log(uniqueWords(text))

const biggerWords1 = compose(skipShortWords, unique, words)

const wordsUsed1 = biggerWords1(text)

// console.log(wordsUsed1)

const filterWords = partialRight(compose, unique, words)

const biggerWords2 = filterWords(skipShortWords)
const shorterWords2 = filterWords(skipLongWords)

// console.log(biggerWords2(text))
// console.log(shorterWords2(text))

const biggerWords4 = pipe(words, unique, skipShortWords)
// console.log(biggerWords4(text))
const filterWords3 = partial(pipe, words, unique)
const biggerWords3 = filterWords3(skipShortWords)
const shorterWords3 = filterWords3(skipLongWords)
// console.log(biggerWords3(text))
// console.log(shorterWords3(text))

/* -------------------------------------------------------------------------- */

function ajax(url: any, data?: any, cb?: any) {
  switch (url) {
    case 'http://some.api/order':
      cb?.({ personId: 123 })
      break
    case 'http://some.api/person':
      cb?.({ name: 'xxx' })
      break
    default:
      cb?.({ url, data })
  }
}

function output(txt: any) {
  console.log(txt)
}

const getPerson = partial(ajax, 'http://some.api/person')
const getLastOrder = partial(ajax, 'http://some.api/order', { id: -1 })

// 命令式
/* 
getLastOrder( function orderFound(order){
    getPerson( { id: order.personId }, function personFound(person){
        output( person.name );
    } );
} );
*/

// 声明式
/* const extractName = partial(prop, 'name')
const outputPersonName = compose(output, extractName)
const processPerson = partialRight(getPerson, outputPersonName)
const personData = partial(makeObjProp, 'id')
const extractPersonId = partial(prop, 'personId')
const lookupPerson = compose(processPerson, personData, extractPersonId)

getLastOrder(lookupPerson) */

// 不使用独立变量，省去中间步骤的声明式
getLastOrder(
  pipe(
    partial(prop, 'personId'),
    partial(makeObjProp, 'id'),
    partialRight(getPerson, pipe(partial(prop, 'name'), output))
  )
)
