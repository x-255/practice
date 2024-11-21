import { fromEvent, interval, map, merge, take } from 'rxjs'

const timer1 = interval(1000).pipe(
  take(10),
  map((x) => `timer1: ${x}`)
)
const timer2 = interval(2000).pipe(
  take(6),
  map((x) => `timer2: ${x}`)
)
const timer3 = interval(500).pipe(
  take(10),
  map((x) => `timer3: ${x}`)
)

const merged = merge(timer1, timer2, timer3, 2)
merged.subscribe((x) => console.log(x))
