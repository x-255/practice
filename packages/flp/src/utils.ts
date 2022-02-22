/** 创建偏函数 */
export const partial =
  (fn: any, ...presetArgs: any[]) =>
  (...laterArgs: any[]) =>
    fn(...presetArgs, ...laterArgs)

export const partialRight = (fn: any, ...presetArgs: any[]) =>
  reverseArgs(partial(reverseArgs(fn), ...presetArgs.reverse()))

/** 反转参数 */
export const reverseArgs =
  (fn: any) =>
  (...args: any[]) =>
    fn(...args.reverse())

/** 柯里化 */
export function curry(fn: any, arity = fn.length) {
  function nextCurried(prevArgs: any[]) {
    return function curried(nextArg: any) {
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
export function looseCurry(fn: any, arity = fn.length) {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(...nextArgs: any[]) {
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
  (fn: any) =>
  (...args: any[]) =>
    args.reduce((ret, arg) => ret(arg), fn)

/** 强制把一个函数处理成单参数函数 */
export const unary = (fn: any) => (arg: any) => fn(arg)

export const identity = (v: any) => v

/** 恒定参数(Certain API) */
export const constant = (v: any) => () => v

/** 扩展参数 */
export const spreadArgs = (fn: any) => (argsArr: any[]) => fn(...argsArr)

/** 聚集参数 */
export const gatherArgs =
  (fn: any) =>
  (...argsArr: any[]) =>
    fn(argsArr)

/** 命名实参偏应用 */
export const partialProps =
  (fn: any, presetArgsObj: any) => (laterArgsObj: any) =>
    fn(Object.assign({}, presetArgsObj, laterArgsObj))

/** 命名实参柯里化 */
export function curryProps(fn: any, arity = 1) {
  return (function nextCurried(prevArgsObj: any) {
    return function curried(nextArgObj: any) {
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
  fn: any,
  propOrder = fn
    .toString()
    .replace(
      /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/,
      '$1$2$3'
    )
    .split(/\s*,\s*/)
    .map((v: any) => v.replace(/[=\s].*$/, ''))
) {
  return function spreadFn(argsObj: any) {
    return fn(...propOrder.map((k: any) => argsObj[k]))
  }
}

export const not =
  (predicate: any) =>
  (...args: any) =>
    !predicate(...args)

export const when =
  (predicate: any, fn: any) =>
  (...args: any) =>
    predicate(...args) ? fn(...args) : undefined

export const compose2 = (fn2: any, fn1: any) => (origValue: any) =>
  fn2(fn1(origValue))

export function compose(...fns: any[]): any {
  const [fn1, fn2, ...rest] = fns.reverse()

  const composed = (...args: any[]) => fn2(fn1(...args))

  if (rest.length === 0) {
    return composed
  }

  return compose(...rest.reverse(), composed)
}

export const pipe = reverseArgs(compose)

export const binary = (fn: any) => (arg1: any, arg2: any) => fn(arg1, arg2)

export const partialThis = (fn: AnyFunction, ...presetArgs: any[]) =>
  function partiallyApplied(this: any, ...laterArgs: any[]) {
    return fn.apply(this, [...presetArgs, ...laterArgs])
  }

export const composeChainedMethods =
  (...fns: AnyFunction[]) =>
  (res: any) =>
    fns.reduceRight((res, fn) => fn.call(res), res)

/** 从原生方法获取柯里化的函数版本 */
export const unboundMethod = (methodName: string, argCount = 2) =>
  curry((...args: any[]) => {
    const _this = args.pop()
    return _this[methodName](...args)
  }, argCount)

export const prop = (name: any, obj: any) => obj[name]
export function setProp(name: any, obj: any, value: any) {
  const o = Object.assign({}, obj)
  o[name] = value
  return o
}
export const makeObjProp = (name: any, value: any) => setProp(name, {}, value)

export const guard = (fn: any) => (arg: any) => arg != null ? fn(arg) : arg

/* -------------------------------------------------------------------------- */
export function output(val: any) {
  console.log(val)
}

export const format = partialRight(JSON.stringify, null, 2)

export const log = compose(output, format)
