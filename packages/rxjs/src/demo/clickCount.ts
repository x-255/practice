/*
 * @Author: finn.xu ouhuangff@163.com
 * @Date: 2024-04-16 15:41:44
 * @LastEditTime: 2024-04-16 17:07:25
 * @Description: 点击后统计3秒内点击次数
 */
import { length } from 'ramda'
import { bufferWhen, fromEvent, map, repeat, take, timer } from 'rxjs'

const click$ = fromEvent(document, 'click')

click$
  .pipe(
    bufferWhen(() => timer(3000)),
    map(length),
    take(1),
    // 3秒后,click$完成，重新开始计数
    repeat()
  )
  .subscribe((count) => {
    console.log(`click count: ${count}`)
  })
