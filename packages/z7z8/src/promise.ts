type ResultWithNon<T> = T | undefined | null

type Resolve<T> = (value?: T | PromiseLike<T>) => void
type Reject = (reson?: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type OnFulfilled<T, TResult1> = ResultWithNon<
  (value?: T | PromiseLike<T>) => TResult1 | PromiseLike<TResult1>
>
type OnRejected<TResult2> = ResultWithNon<(reson: any) => TResult2 | PromiseLike<TResult2>>
type Callback = (val: any) => void

const enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'
const isFunc = (val: unknown): val is AnyFunction => typeof val === 'function'
const isPromise = (val: unknown): val is PromiseLike<any> =>
  (isObject(val) || isFunc(val)) && isFunc(val.then)

class MyPromise<T> {
  private status: Status = Status.PENDING
  private value!: T | PromiseLike<T> | undefined
  private reson: any
  private onFulfilledCallbacks: Callback[] = []
  private onRejectedCallbacks: Callback[] = []

  constructor(executor: Executor<T>) {
    executor(this.resolve, this.reject)
  }

  private resolve = (value?: T | PromiseLike<T>) => {
    if (this.status === Status.PENDING) {
      this.status = Status.FULFILLED
      this.value = value

      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()!(value)
      }
    }
  }

  private reject = (reson?: any) => {
    if (this.status === Status.PENDING) {
      this.status = Status.REJECTED
      this.reson = reson

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()!(reson)
      }
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled: OnFulfilled<T, TResult1>,
    onRejected: OnRejected<TResult2>,
  ) {
    if (this.status === Status.FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    } else if (this.status === Status.REJECTED && onRejected) {
      onRejected(this.reson)
    } else {
      onFulfilled && this.onFulfilledCallbacks.push(onFulfilled)
      onRejected && this.onRejectedCallbacks.push(onRejected)
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

promise.then(
  (value) => {
    console.log('resolve', value)
  },
  (reason) => {
    console.log('reject', reason)
  },
)

// @ts-ignore
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
