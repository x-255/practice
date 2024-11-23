import { fromEvent, interval, map, withLatestFrom } from 'rxjs'

const clicks = fromEvent(document, 'click')
const timer1 = interval(1500).pipe(map((x) => `interval1: ${x}`))
const timer2 = interval(1000).pipe(map((x) => `interval2: ${x}`))
const result = clicks.pipe(withLatestFrom(timer1, timer2))
result.subscribe((x) => console.log(x))

/* 
页面加载后，timer1、2开始发出值，
点击页面后 withLatestFrom 最新的 timer1、2 的值合并成一个数组发出
 */