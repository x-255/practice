// @ts-ignore
type AnyObject = Record<keyof any, any>
// @ts-ignore
type AnyFunction = (...args: any[]) => any
// @ts-ignore
type Awaited<T> = T extends PromiseLike<infer P> ? Awaited<P> : T

type ResultWithNon<T> = T | undefined | null
type MaybePromiseLike<T> = T | PromiseLike<T>

type Resolve<T> = (value?: MaybePromiseLike<T>) => void
type Reject = (reason?: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type OnFulfilled<T, TResult1> = (value: T) => MaybePromiseLike<TResult1>
type OnRejected<TResult2> = (reason: any) => MaybePromiseLike<TResult2>
type Callback = (val: any) => void

const enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

const isObject = (val: unknown): val is AnyObject =>
  val !== null && typeof val === 'object'
const isFunc = (val: unknown): val is AnyFunction => typeof val === 'function'
const isPromise = (val: unknown): val is MyPromise<any> =>
  (isObject(val) || isFunc(val)) && isFunc(val.then)

class MyPromise<T> {
  private status: Status = Status.PENDING
  private value!: T
  private reason: any
  private onFulfilledCallbacks: Callback[] = []
  private onRejectedCallbacks: Callback[] = []

  constructor(executor: Executor<T>) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  private resolve = (value?: MaybePromiseLike<T>) => {
    if (this.status === Status.PENDING) {
      this.status = Status.FULFILLED
      this.value = value as T

      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()!(value)
      }
    }
  }

  private reject = (reason?: any) => {
    if (this.status === Status.PENDING) {
      this.status = Status.REJECTED
      this.reason = reason

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()!(reason)
      }
    }
  }

  then<TResult1 = T, TResult2 = never>(
    _onFulfilled?: ResultWithNon<OnFulfilled<T, TResult1>>,
    _onRejected?: ResultWithNon<OnRejected<TResult2>>,
  ): MyPromise<TResult1 | TResult2> {
    const onFulfilled: OnFulfilled<T, TResult1> = isFunc(_onFulfilled)
      ? _onFulfilled
      : (value: any) => value

    const onRejected: OnRejected<TResult2> = isFunc(_onRejected)
      ? _onRejected
      : (reason: any) => {
          throw reason
        }

    const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
      const createMicrotask = (fulfilled: boolean) => {
        const cb = fulfilled ? onFulfilled : onRejected
        const value = fulfilled ? this.value : this.reason

        queueMicrotask(() => {
          try {
            const x = cb(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === Status.FULFILLED) {
        createMicrotask(true)
      } else if (this.status === Status.REJECTED) {
        createMicrotask(false)
      } else {
        this.onFulfilledCallbacks.push(() => createMicrotask(true))

        this.onRejectedCallbacks.push(() => createMicrotask(false))
      }
    })

    return promise2
  }

  catch<TResult = never>(onRejected?: OnRejected<TResult>) {
    return this.then(null, onRejected)
  }

  static resolve<T>(value?: MaybePromiseLike<T>): MyPromise<T> {
    if (isPromise(value)) {
      return value
    }
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason?: any) {
    return new Promise((_, reject) => reject(reason))
  }

  static all<T extends readonly unknown[] | []>(
    values: T,
  ): MyPromise<{ -readonly [k in keyof T]: Awaited<T[k]> }> {
    return new MyPromise((resolve, reject) => {
      const res: any[] = []
      let count = 0

      for (let value of values) {
        MyPromise.resolve(value).then((val) => {
          res.push(val)
          if (++count === values.length) {
            resolve(res as any)
          }
        }, reject)
      }
    })
  }
}

function resolvePromise<T>(
  promise2: MyPromise<T>,
  x: MaybePromiseLike<T>,
  resolve: Resolve<T>,
  reject: Reject,
) {
  if (x === promise2) {
    const e = new TypeError(
      'TypeError: Chaining cycle detected for promise #<MyPromise>',
    )
    e.stack = ''
    return reject(e)
  }

  let called = false

  if (isObject(x) || isFunc(x)) {
    try {
      const then = (x as PromiseLike<T>).then

      if (isFunc(then)) {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          },
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

// 测试promise是否符合规范需要的声明
// @ts-expect-error
MyPromise.deferred = function () {
  Promise
  const result = {} as any
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = MyPromise
