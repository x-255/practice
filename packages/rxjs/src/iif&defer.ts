import { defer, fromEvent, iif, of } from 'rxjs'

fromEvent(document, 'click').subscribe((e) => {
  defer(() =>
    iif(() => (e as MouseEvent).clientX < document.body.clientWidth / 2, of('左半边'), of('右半边'))
  ).subscribe(console.log)
})

/* 
点击页面, 判断点击位置在屏幕左半边还是右半边，创建对应的 Observable
 */