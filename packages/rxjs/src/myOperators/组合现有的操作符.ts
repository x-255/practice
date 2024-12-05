import { interval, map, Observable, take } from 'rxjs'

const takeFiveAndDouble = () => (source$: Observable<number>) =>
  source$.pipe(
    take(5),
    map((n) => n * 2)
  )

interval(1000).pipe(takeFiveAndDouble()).subscribe(console.log)

/* 取前5个值并乘2 */