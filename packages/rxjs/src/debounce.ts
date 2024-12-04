import { debounce, interval, timer } from "rxjs"
import { debug } from "rxjs-browser-debugger"

const durationSelector = (i: number) => timer(i * 1000).pipe(debug("timer"))

interval(3000).pipe(
  debug("interval"),
  debounce(durationSelector),
  debug("debounce")
).subscribe(console.log)

/* 
interval发出0，订阅timer(0 * 1000)，0秒内没有发出新值，debounce发出0，并退订结束timer；
interval发出1，订阅timer(1 * 1000)，等待1秒，1秒内没有发出新值，debounce发出1，并退订结束timer；
interval发出2，订阅timer(2 * 1000)，等待2秒，2秒内没有发出新值，debounce发出2，并退订结束timer；
interval发出3，订阅timer(3 * 1000)，等待3秒，3秒内又有新值发出，取消旧的timer(3 * 1000)，订阅新的timer(3 * 1000)；
由于后面每次interval都会在3秒是发出新值，所以debounce永远不会再发出新值。
 */