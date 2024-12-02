import { auditTime, fromEvent } from 'rxjs'

fromEvent(document, 'click')
  .pipe(auditTime(2000))
  .subscribe(console.log)

/* 
点击过后隔2秒输出最新的点击事件
*/