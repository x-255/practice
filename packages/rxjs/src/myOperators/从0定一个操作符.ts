import { interval, Observable } from "rxjs"

const takeFiveAndDouble = () => (source$: Observable<number>) => new Observable<number>(subscriber => {
  let seen = 0
  source$.subscribe({
    next(value) {
      if (seen++ < 5) {
        subscriber.next(value * 2)
      } else {
        subscriber.complete()
      }
    },
    error: subscriber.error,
    complete: subscriber.complete
  })
})

interval(1000).pipe(takeFiveAndDouble()).subscribe(console.log)

/* 
取前5个值并乘2
自定义操作符只需要返回一个函数，这个函数接收一个Observable，返回一个Observable即可
 */