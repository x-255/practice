export {}

interface Options {
  signal?: AbortSignal
}

type DelayOptions<T> = Options & { value?: T }

type CreateDelayOptions = Options & { willResolve?: boolean }

interface DelayWithClear<T> extends Promise<T> {
  clear(): void
}

interface Delay {
  <T>(ms: number, options?: DelayOptions<T>): DelayWithClear<T>
  reject<T>(ms: number, options?: DelayOptions<T>): DelayWithClear<T>
  range<T>(min: number, max: number, options?: DelayOptions<T>): DelayWithClear<T>
}

const createAbortError = () => {
  const err = new Error('Delay aborted')
  err.name = 'AbortError'
  return err
}

const createDelay =
  ({ willResolve = true }: CreateDelayOptions) =>
  <T>(ms: number, options: DelayOptions<T> = {}) => {
    const { value, signal } = options

    if (signal?.aborted) {
      throw Promise.reject(createAbortError())
    }

    let timer: number | null = null
    let settle: () => void
    let rejectFn: (reson?: T | Error) => void

    const signalListener = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      rejectFn(createAbortError())
    }

    const delay: DelayWithClear<T> = new Promise((resolve, reject) => {
      settle = () => {
        if (signal) {
          signal.removeEventListener('abort', signalListener)
        }

        if (willResolve) {
          resolve(value)
        } else {
          reject(value)
        }
      }

      rejectFn = reject
      timer = window.setTimeout(settle, ms)
    }) as any

    if (signal) {
      signal.addEventListener('abort', signalListener)
    }

    delay.clear = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
        settle()
      }
    }

    return delay
  }

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const createWithTimers = () => {
  const delay = createDelay({ willResolve: true }) as Delay

  delay.reject = createDelay({ willResolve: false })

  delay.range = (min, max, options) => delay(getRandomInt(min, max), options)

  return delay
}

/* ;(async () => {
  const delay = createWithTimers()
  const abort = new AbortController()

  setTimeout(() => {
    abort.abort()
  }, 500)

  const p = delay(3000, { value: 100, signal: abort.signal })

  setTimeout(() => {
    p.clear()
  }, 1000)

  const r = await p
  console.log(r)
})() */
