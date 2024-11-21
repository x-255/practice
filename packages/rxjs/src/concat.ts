import { concat, map, take, timer } from 'rxjs'

const cur = Date.now()
const timer1 = timer(0, 100).pipe(
  take(5),
  map((v) => `[${(Date.now() - cur) / 1000}] timer1: ${v}`)
)
const timer2 = timer(200, 100).pipe(
  take(5),
  map((v) => `[${(Date.now() - cur) / 1000}] timer2: ${v}`)
)

concat(timer1, timer2).subscribe(console.log)

/* 
timer1从0开始，每100ms发出一个值，共发出5个值，
timer2从200ms开始，每100ms发出一个值，共发出5个值，
concat会按顺序订阅timer1和timer2，timer1发出5个值后，timer2才会开始发出值，
 */