import {
  binary,
  compose,
  composeChainedMethods,
  curry,
  guard,
  log,
  partial,
  partialRight,
  partialThis,
  pipe,
  prop,
  unboundMethod,
} from './utils'

/*
 * @Description:列表操作
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-22 15:29:16
 */
export {}

const arr1 = ['1', '2', '3', '4']
// console.log(map(arr1, unary(parseInt)))

const increment = (v: any) => ++v
const decrement = (v: any) => --v
const square = (v: any) => v * v

const double = (v: any) => v * 2
const isOdd = (v: any) => v % 2 == 1
const sum = (a: any, b: any) => a + b

const arr2 = [increment, decrement, square]
  .map((fn) => compose(fn, double))
  .map((fn) => fn(3))

// console.log(arr2)

// const pipeReducer = (composedFn: any, fn: any) => pipe(composedFn, fn)
const pipeReducer = binary(compose)

// const fn = [3, 17, 6, 4]
//   .map((v) => (n: any) => v * n)
//   .reduce((pre, cur) => (n) => cur(pre(n)))
const fn = [3, 17, 6, 4].map((v) => (n: any) => v * n).reduce(pipeReducer)

// console.log(fn(9))
// console.log(fn(10))

const ar1 = [1, 2, 3, 4, 5].reduce<any[]>((arr, v) => [...arr, double(v)], [])
// console.log(ar2)
const ar2 = [1, 2, 3, 4, 5].reduce<any[]>(
  (arr, v) => (isOdd(v) ? [...arr, v] : [...arr]),
  []
)
// console.log(ar2)

// const unique = (arr: any[]) => arr.filter((v, i) => arr.indexOf(v) === i)
const unique = (arr: any[]) =>
  arr.reduce<any[]>(
    (set, v) => (set.indexOf(v) === -1 ? [...set, v] : [...set]),
    []
  )
// console.log(unique([1, 4, 7, 1, 3, 1, 7, 9, 2, 6, 4, 0, 5, 3]))

const flatten = (arr: any[], depth = Infinity): any[] =>
  arr.reduce<any[]>(
    (ary, v) =>
      ary.concat(depth > 0 && Array.isArray(v) ? flatten(v, depth - 1) : [v]),
    []
  )

const ar3 = [[0, 1], 2, 3, [4, [5, 6, 7], [8, [9, [10, [11, 12], 13]]]]]
// console.log(flatten(ar3))
// console.log(flatten(ar3, 0))
// console.log(flatten(ar3, 1))
// console.log(flatten(ar3, 2))
// console.log(flatten(ar3, 3))
// console.log(flatten(ar3, 4))
// console.log(flatten(ar3, 5))

const flatMap = (mapperFn: any, arr: any[]) =>
  arr.reduce<any[]>((ary, v) => ary.concat(mapperFn(v)), [])

const firstNames = [
  { name: 'Jonathan', variations: ['John', 'Jon', 'Jonny'] },
  { name: 'Stephanie', variations: ['Steph', 'Stephy'] },
  { name: 'Frederick', variations: ['Fred', 'Freddy'] },
]

const ar4 = flatMap(
  (entry: any) => [entry.name].concat(entry.variations),
  firstNames
)
// log(ar4)

function zip(arr1: any[], arr2: any[]) {
  let zipped: any[] = []

  arr1 = arr1.slice()
  arr2 = arr2.slice()

  while (arr1.length > 0 && arr2.length > 0) {
    zipped.push([arr1.shift(), arr2.shift()])
  }

  return zipped
}
const ar5 = zip([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
// console.log(ar5)

function mergeLists(arr1: any[], arr2: any[]) {
  let merged: any[] = []

  arr1 = arr1.slice()
  arr2 = arr2.slice()

  while (arr1.length > 0 || arr2.length > 0) {
    if (arr1.length > 0) {
      merged.push(arr1.shift())
    }

    if (arr2.length > 0) {
      merged.push(arr2.shift())
    }
  }

  return merged
}

const ar6 = mergeLists([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
// console.log(ar6)

const mergeReducer = (merged: any[], v: any, i: number) =>
  merged.slice(0, i * 2).concat(v, merged.slice(i * 2))

const ar7 = [1, 3, 5, 7, 9].reduce(mergeReducer, [2, 4, 6, 8, 10])

// console.log(ar7)

const ar8 = composeChainedMethods(
  partialThis(Array.prototype.reduce, sum, 0),
  partialThis(Array.prototype.map, double),
  partialThis(Array.prototype.filter, isOdd)
)([1, 2, 3, 4, 5])

// console.log(ar8)

// const filter = (arr: any[], predicateFn: any) => arr.filter(predicateFn)

// const map = (arr: any[], mapperFn: any) => arr.map(mapperFn)

// const reduce = (arr: any[], reducerFn: any, initialValue: any) =>
//   arr.reduce(reducerFn, initialValue)

// const ar9 = compose(
//   partialRight(reduce, sum, 0),
//   partialRight(map, double),
//   partialRight(filter, isOdd)
// )([1, 2, 3, 4, 5])

// console.log(ar9)

// const filter = curry((predicateFn: any, arr: any) => arr.filter(predicateFn))

// const map = curry((mapperFn: any, arr: any) => arr.map(mapperFn))

// const reduce = curry((reducerFn: any, initialValue: any, arr: any) =>
//   arr.reduce(reducerFn, initialValue)
// )

const filter = unboundMethod('filter')
const map = unboundMethod('map')
const reduce = unboundMethod('reduce', 3)

const ar10 = compose(
  reduce(sum)(0),
  map(double),
  filter(isOdd)
)([1, 2, 3, 4, 5])

// console.log(ar10)

const getCurrentSession = () => ({ sessId: 113 })
const lookupUser = (sessionId: any) => ({ uId: 243 })
const lookupOrders = (userId: any) => ({ xxx: 'yyy' })
const processOrders = log

var getSessionId = partial(prop, 'sessId')
var getUserId = partial(prop, 'uId')

// var session, sessionId, user, userId, orders

// session = getCurrentSession()
// if (session != null) sessionId = getSessionId(session)
// if (sessionId != null) user = lookupUser(sessionId)
// if (user != null) userId = getUserId(user)
// if (userId != null) orders = lookupOrders(userId)
// if (orders != null) processOrders(orders)

// ;['sessId', 'uId']
//   .map(curry(prop))
//   .reduce(mergeReducer, [lookupUser])
//   .concat([lookupOrders, processOrders])
//   .map(guard)
//   .reduce((res, nextFn) => nextFn(res), getCurrentSession())

const removeInvalidChars = (str: string) => str.replace(/[^\w]*/g, '')

const upper = (str: string) => str.toUpperCase()

const elide = (str: string) =>
  str.length > 10 ? str.substr(0, 7) + '...' : str

const words = "Mr. Jones isn't responsible for this disaster!".split(/\s/)

const ar11 = words.map(removeInvalidChars).map(upper).map(elide)
// console.log(ar11)
const ar12 = words.map(pipe(removeInvalidChars, upper, elide))
// console.log(ar12)

/* ---------------------------------- 列表之外 ---------------------------------- */

const BinaryTree: any = (
  value: any,
  parent?: any,
  left?: any,
  right?: any
) => ({
  value,
  parent,
  left,
  right,
})

BinaryTree.forEach = function forEach(visitFn: AnyFunction, node: any) {
  if (node.left) {
    forEach(visitFn, node.left)
  }

  visitFn(node)

  if (node.right) {
    forEach(visitFn, node.right)
  }
}

BinaryTree.map = function map(mapperFn: AnyFunction, node: any) {
  if (node) {
    const newNode = mapperFn(node)
    newNode.parent = node.parent
    newNode.left = node.left ? map(mapperFn, node.left) : undefined
    newNode.right = node.right ? map(mapperFn, node.right) : undefined

    if (newNode.left) {
      newNode.left.parent = newNode
    }

    if (newNode.right) {
      newNode.right.parent = newNode
    }
    return newNode
  }
}

const banana = BinaryTree('banana')
const apple = (banana.left = BinaryTree('apple', banana))
const cherry = (banana.right = BinaryTree('cherry', banana))
const apricot = (apple.right = BinaryTree('apricot', apple))
const avocado = (apricot.right = BinaryTree('avocado', apricot))
const cantelope = (cherry.left = BinaryTree('cantelope', cherry))
const cucumber = (cherry.right = BinaryTree('cucumber', cherry))
const grape = (cucumber.right = BinaryTree('grape', cucumber))

// BinaryTree.forEach((node: any) => console.log(node.value), cherry)
var BANANA = BinaryTree.map(
  (node: any) => BinaryTree(node.value.toUpperCase()),
  banana
)

BinaryTree.forEach((node: any) => console.log(node.value), BANANA)
