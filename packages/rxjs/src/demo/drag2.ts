import {
  animationFrameScheduler,
  concatMap,
  from,
  fromEvent,
  map,
  mergeMap,
  observeOn,
  takeUntil,
  timer,
  zip,
} from 'rxjs'
import { createDragBox } from '../utils'

const first = <T, K>(tuple: [T, K]) => tuple[0]

const boxs = Array(100).fill(0).map(createDragBox)
const firstBox = boxs[0]
firstBox.style.zIndex = '9'

const mouseDown$ = fromEvent<MouseEvent>(firstBox, 'mousedown')
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup')
const delay$ = zip(from(boxs), timer(0, 50)).pipe(map(first))

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
    mergeMap((pos) =>
      delay$.pipe(
        map((box) => ({
          box,
          ...pos,
        }))
      )
    ),
    observeOn(animationFrameScheduler)
  )
  .subscribe(({ box, x, y }) => {
    box.style.left = `${x}px`
    box.style.top = `${y}px`
  })
