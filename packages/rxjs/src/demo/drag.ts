import { concatMap, fromEvent, map, takeUntil } from 'rxjs'

const dragEl = document.createElement('div')
dragEl.style.width = '100px'
dragEl.style.height = '100px'
dragEl.style.background = '#060'
dragEl.style.position = 'absolute'

document.body.appendChild(dragEl)

const mouseDown$ = fromEvent<MouseEvent>(dragEl, 'mousedown')
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')

mouseDown$
  .pipe(
    concatMap((e) =>
      mouseMove$.pipe(
        map((me) => ({
          top: me.clientY - e.offsetY,
          left: me.clientX - e.offsetX,
        })),
        takeUntil(mouseUp$)
      )
    )
  )
  .subscribe((pos) => {
    dragEl.style.top = pos.top + 'px'
    dragEl.style.left = pos.left + 'px'
  })
