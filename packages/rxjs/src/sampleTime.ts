import { fromEvent, sampleTime, scan } from 'rxjs'
import { debug } from 'rxjs-browser-debugger'

const click$ = fromEvent(document, 'click')

click$
  .pipe(
    scan((count) => count + 1, 0),
    debug('click'),
    sampleTime(2000),
    debug('sampleTime')
  )
  .subscribe(console.log)

/* 
每隔2秒，输出所有的点击次数
click$:  ----c----c--c------c---c---->
scan:    ----1----2--3------4---5---->
sampleTime(2000): ----1--------3------4---->
在 0 秒到 2 秒之间发生了一次点击，2 秒时取样输出 1。
在 2 秒到 4 秒之间发生了两次点击，4 秒时取样输出 3（累加值）。
在 4 秒到 6 秒之间没有点击事件，6 秒时没有输出。
在 6 秒到 8 秒之间发生了一次点击，8 秒时取样输出 4。
在 8 秒到 10 秒之间发生了一次点击，10 秒时取样输出 5。
 */