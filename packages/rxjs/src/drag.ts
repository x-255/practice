import { concatMap, fromEvent, of } from "rxjs"

const dragEl = document.createElement('div')
dragEl.style.width = '50px'
dragEl.style.height = '50px'
dragEl.style.background = '#060'
dragEl.style.position = 'absolute'

document.body.appendChild(dragEl)

const mouseDown$ = fromEvent(dragEl, 'mousedown')
const mouseMove$ = fromEvent(document, 'mousemove')
const mouseUp$ = fromEvent(document, 'mouseup')

mouseDown$
// .pipe(
//   concatMap(e => {
//     console.log(e)
//     return of(1)
//   })
// )
.subscribe(pos => {
  console.log(pos)
})