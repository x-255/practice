import { combineLatest, map, take, timer } from 'rxjs'

const timer1 = timer(0, 1000).pipe(map((v) => `timer1: ${v}`))
const timer2 = timer(2000, 1000).pipe(map((v) => `timer2: ${v}`))

combineLatest([timer1, timer2]).pipe(take(10)).subscribe(console.log)
