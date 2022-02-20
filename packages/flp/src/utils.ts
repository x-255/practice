/** 创建偏函数 */
export const partial =
  (fn: AnyFunction, ...presetArgs) =>
  (...laterArgs) =>
    fn(...presetArgs, ...laterArgs)

export const partialRight = (fn: AnyFunction, ...presetArgs) =>
  reverseArgs(partial(reverseArgs(fn), ...presetArgs))

/** 反转参数 */
export const reverseArgs =
  (fn: AnyFunction) =>
  (...args) =>
    fn(...args.reverse())

/** 柯里化 */
export function curry(fn: AnyFunction, arity = fn.length) {
  function nextCurried(prevArgs: any[]) {
    return function curried(nextArg) {
      const args = [...prevArgs, nextArg]

      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  }

  return nextCurried([])
}

/** 松散柯里化 */
export function looseCurry(fn: AnyFunction, arity = fn.length) {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(...nextArgs) {
      const args = prevArgs.concat(nextArgs)

      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

/** 反柯里化 */
export const uncurry =
  (fn: AnyFunction) =>
  (...args) =>
    args.reduce((ret, arg) => ret(arg), fn)

/** 强制把一个函数处理成单参数函数 */
export const unary = (fn) => (arg) => fn(arg)

export const identity = (v) => v

/** 恒定参数(Certain API) */
export const constant = (v) => () => v

/** 扩展参数 */
export const spreadArgs = (fn: AnyFunction) => (argsArr) => fn(...argsArr)

/** 聚集参数 */
export const gatherArgs =
  (fn: AnyFunction) =>
  (...argsArr) =>
    fn(argsArr)

/** 命名实参偏应用 */
export const partialProps =
  (fn: AnyFunction, presetArgsObj: AnyObject) => (laterArgsObj: AnyObject) =>
    fn(Object.assign({}, presetArgsObj, laterArgsObj))

/** 命名实参柯里化 */
export function curryProps(fn: AnyFunction, arity = 1) {
  return (function nextCurried(prevArgsObj: AnyObject) {
    return function curried(nextArgObj) {
      const [key] = Object.keys(nextArgObj)
      const allArgsObj = Object.assign({}, prevArgsObj, {
        [key]: nextArgObj[key],
      })

      if (Object.keys(allArgsObj).length >= arity) {
        return fn(allArgsObj)
      } else {
        return nextCurried(allArgsObj)
      }
    }
  })({})
}

export function spreadArgProps(
  fn,
  propOrder = fn
    .toString()
    .replace(
      /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/,
      '$1$2$3'
    )
    .split(/\s*,\s*/)
    .map((v) => v.replace(/[=\s].*$/, ''))
) {
  return function spreadFn(argsObj) {
    return fn(...propOrder.map((k) => argsObj[k]))
  }
}

export const not =
  (predicate: AnyFunction) =>
  (...args) =>
    !predicate(...args)

export const when =
  (predicate: AnyFunction, fn: AnyFunction) =>
  (...args) =>
    predicate(...args) ? fn(...args) : undefined

export const compose2 = (fn2: AnyFunction, fn1: AnyFunction) => (origValue) =>
  fn2(fn1(origValue))
