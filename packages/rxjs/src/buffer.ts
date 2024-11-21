import { buffer, fromEvent, interval } from 'rxjs'

const clicks = fromEvent(document, 'click')
const intervalEvents = interval(1000)
const buffered = intervalEvents.pipe(buffer(clicks))
buffered.subscribe((x) => console.log(x))

/* 
每秒发出一个数字，直到点击事件触发，将之前发出的值收集到一个数组中输出；
等待下次点击时再输出这段事件的值
 */