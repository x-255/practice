import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({ resolved, rejected })

    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach((interceptor) => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
