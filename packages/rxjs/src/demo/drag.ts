import { compose, evolve, max, min } from 'ramda'
import { concatMap, fromEvent, map, takeUntil } from 'rxjs'
import { createDragBox } from '../utils'



const dragEl = createDragBox()

const mouseDown$ = fromEvent<MouseEvent>(dragEl, 'mousedown')
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')

const bound = (maxValue: number, minValue: number = 0) =>
  compose(max(minValue), min(maxValue))

mouseDown$
  .pipe(
    concatMap((ev) =>
      mouseMove$.pipe(
        map((e) => ({
          x: e.clientX - ev.offsetX,
          y: e.clientY - ev.offsetY,
        })),
        takeUntil(mouseUp$)
      )
    ),
    map(
      evolve({
        x: bound(window.innerWidth - dragEl.offsetWidth),
        y: bound(window.innerHeight - dragEl.offsetHeight),
      })
    )
  )
  .subscribe((pos) => {
    dragEl.style.left = pos.x + 'px'
    dragEl.style.top = pos.y + 'px'
  })
