import { concat, map, take, timer } from 'rxjs'

const cur = Date.now()
const timer1 = timer(0, 100).pipe(
  take(5),
  map((v) => `[${(Date.now() - cur) / 1000}] timer1: ${v}`)
)
const timer2 = timer(200, 100).pipe(
  take(10),
  map((v) => `[${(Date.now() - cur) / 1000}] timer2: ${v}`)
)

// FIXME: timer2时间对不上
concat(timer1, timer2).subscribe(console.log)
