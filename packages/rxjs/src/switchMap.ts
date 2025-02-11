import { fromEvent, map, switchMap } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const result = document.createElement('div')
document.body.appendChild(result)

const btn = document.createElement('button')
btn.textContent = 'get data'
document.body.appendChild(btn)

fromEvent(btn, 'click')
  .pipe(switchMap(() => ajax('https://jsonplaceholder.typicode.com/posts/1')),map((res) => res.response))
  .subscribe(console.log)

/* 
每次点击取消上一次未完成的请求，发起新的请求
 */