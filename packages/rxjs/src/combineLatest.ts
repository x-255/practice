import { combineLatest, map, take, timer } from 'rxjs'

const timer1 = timer(0, 1000).pipe(map((v) => `timer1: ${v}`))
const timer2 = timer(2000, 1000).pipe(map((v) => `timer2: ${v}`))

combineLatest([timer1, timer2]).pipe(take(10)).subscribe(console.log)

/* 
timer1从0开始，每秒发出一个数字
timer2从2秒开始，每秒发出一个数字
1或2任一发出值后，combineLatest会取两个Observable最新的值，组成一个数组发出
*/
