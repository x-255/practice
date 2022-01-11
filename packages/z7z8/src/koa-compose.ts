import { createWithTimers } from './delay'

export {}

const isFunction = (val: unknown): val is AnyFunction => typeof val === 'function'

function compose(middleware: AnyFunction[]) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }

  for (const fn of middleware) {
    if (!isFunction(fn)) {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }

  return (ctx: AnyObject, next?: AnyFunction) => {
    let index = -1

    const dispatch = (i: number): Promise<void> => {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }

      index = i

      let fn: AnyFunction | undefined = middleware[i]

      if (i === middleware.length) {
        fn = next
      }

      if (!fn) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

const wait = createWithTimers()

/* ;(async () => {
  const arr: number[] = []
  const stack = []

  stack.push(async (context: any, next: any) => {
    arr.push(1)
    await wait(1)
    await next()
    await wait(1)
    arr.push(6)
  })

  stack.push(async (context: any, next: any) => {
    arr.push(2)
    await wait(1)
    await next()
    await wait(1)
    arr.push(5)
  })

  stack.push(async (context: any, next: any) => {
    arr.push(3)
    await wait(1)
    await next()
    await wait(1)
    arr.push(4)
  })

  await compose(stack)({})
  console.log(arr)
})() */

/* ;(async () => {
  const arr: number[] = []
  const stack = []

  stack.push(async (ctx: any, next: any) => {
    arr.push(1)
    try {
      arr.push(6)
      await next()
      arr.push(7)
    } catch (err) {
      arr.push(2)
    }
    arr.push(3)
  })

  stack.push(async (ctx: any, next: any) => {
    arr.push(4)
    throw new Error()
  })

  await compose(stack)({})
  console.log(arr)
})() */

;(async () => {
  compose([
    async (ctx, next) => {
      await next()
      await next()
    },
  ])({}).then(
    () => {
      console.log(111)
    },
    (err) => {
      console.log(`err====`, err)
    },
  )
})()
