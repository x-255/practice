import { fromEvent, interval, sample } from "rxjs"

const click$ = fromEvent(document, 'click');

interval(1000).pipe(
  sample(click$)
).subscribe(console.log);

/* 
当点击页面时，输出当前最新的数字，
如果2次点击之间的时间小于1秒，则不会输出数字
 */