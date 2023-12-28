import { defer, fromEvent, iif, of } from 'rxjs'

fromEvent(document, 'click').subscribe((e) => {
  defer(() =>
    iif(() => (e as MouseEvent).clientX > 100, of('> 100'), of('< 100'))
  ).subscribe(console.log)
})
