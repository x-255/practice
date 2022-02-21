/** 创建偏函数 */
export const partial =
  (fn, ...presetArgs) =>
  (...laterArgs) =>
    fn(...presetArgs, ...laterArgs)

export const partialRight = (fn, ...presetArgs) =>
  reverseArgs(partial(reverseArgs(fn), ...presetArgs.reverse()))

/** 反转参数 */
export const reverseArgs =
  (fn) =>
  (...args) =>
    fn(...args.reverse())

/** 柯里化 */
export function curry(fn, arity = fn.length) {
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
export function looseCurry(fn, arity = fn.length) {
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
  (fn) =>
  (...args) =>
    args.reduce((ret, arg) => ret(arg), fn)

/** 强制把一个函数处理成单参数函数 */
export const unary = (fn) => (arg) => fn(arg)

export const identity = (v) => v

/** 恒定参数(Certain API) */
export const constant = (v) => () => v

/** 扩展参数 */
export const spreadArgs = (fn) => (argsArr) => fn(...argsArr)

/** 聚集参数 */
export const gatherArgs =
  (fn) =>
  (...argsArr) =>
    fn(argsArr)

/** 命名实参偏应用 */
export const partialProps =
  (fn, presetArgsObj: AnyObject) => (laterArgsObj: AnyObject) =>
    fn(Object.assign({}, presetArgsObj, laterArgsObj))

/** 命名实参柯里化 */
export function curryProps(fn, arity = 1) {
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
  (predicate) =>
  (...args) =>
    !predicate(...args)

export const when =
  (predicate, fn) =>
  (...args) =>
    predicate(...args) ? fn(...args) : undefined

export const compose2 = (fn2, fn1) => (origValue) => fn2(fn1(origValue))

export function compose(...fns) {
  const [fn1, fn2, ...rest] = fns.reverse()

  const composed = (...args) => fn2(fn1(...args))

  if (rest.length === 0) {
    return composed
  }

  return compose(...rest.reverse(), composed)
}

export const pipe = reverseArgs(compose)
