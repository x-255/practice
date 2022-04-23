type ResolveFn = (value?: any) => void
type Args = any[]

class Queue<T> {
  private _queue: T[] = []

  get size() {
    return this._queue.length
  }

  enqueue(val: T) {
    this._queue.push(val)
  }

  dequeue() {
    return this._queue.shift()
  }
}

function createLimit(concurrency: number) {
  const queue = new Queue<AnyFunction>()
  let activeCount = 0

  async function run(fn: AnyFunction, resolve: ResolveFn, args: Args) {
    activeCount++

    const result = Promise.resolve(fn(...args))
    resolve(result)

    try {
      await result
    } catch {}

    next()
  }

  function next() {
    activeCount--

    if (queue.size > 0) {
      queue.dequeue()!()
    }
  }

  function enqueue(fn: AnyFunction, resolve: ResolveFn, args: Args) {
    queue.enqueue(run.bind(null, fn, resolve, args))

    queueMicrotask(() => {
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()!()
      }
    })
  }

  function generator(fn: AnyFunction, ...args: Args) {
    return new Promise((resolve) => enqueue(fn, resolve, args))
  }

  return generator
}

// example
function fetchSomething(v: string) {
  console.log(v)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(v)
    }, 1000)
  })
}

function doSomething() {
  console.log('do something')
  return 'something'
}

async function example() {
  const limit = createLimit(2)

  const inputs = [
    limit(() => fetchSomething('a')),
    limit(() => fetchSomething('b')),
    limit(() => fetchSomething('c')),
    limit(() => fetchSomething('d')),
    limit(() => doSomething()),
    limit(() => fetchSomething('e')),
  ]

  const results = await Promise.all(inputs)
  console.log(results)
}
example()
