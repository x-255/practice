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

/* 
timer1每隔1秒发出一个值，timer2每隔2秒发出一个值，timer3每隔0.5秒发出一个值，
merge操作符将这三个Observable合并成一个Observable，然后发出值。
merge操作符的第二个参数是可选的，表示同时允许两个内部 Observable 发出值，如果不传入这个参数，merge操作符会合并所有的Observable。
 */