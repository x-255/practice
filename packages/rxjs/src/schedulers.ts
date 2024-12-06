import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler, from, queueScheduler,
  range,
  scheduled,
  SchedulerLike
} from 'rxjs'
import { debug } from 'rxjs-browser-debugger'

function createBox() {
  const box = document.createElement('div')
  box.className = 'box'
  box.style.width = '50px'
  box.style.height = '50px'
  box.style.backgroundColor = '#F4A460'
  box.style.position = 'absolute'
  box.style.top = '100px'
  box.style.left = '100px'
  document.body.appendChild(box)
}

function createBtns() {
  const schedulers = [
    null,
    queueScheduler,
    asyncScheduler,
    asapScheduler,
    animationFrameScheduler,
  ]
  schedulers.forEach((scheduler) => {
    const btn = document.createElement('button')
    btn.textContent = scheduler ? scheduler.constructor.name : 'null'
    btn.style.margin = '5px'
    btn.onclick = () => {
      updatePosition(scheduler as SchedulerLike)
    }
    document.body.appendChild(btn)
  })
}

const shouldDebug = () => false

const getArr = (length: number) => Array.from({ length }, (_, i) => i + 100)

function updatePosition(scheduler: SchedulerLike) {
  const box = document.querySelector('.box') as HTMLDivElement
  box.style.top = '100px'
  box.style.left = '100px'

  setTimeout(() => {
    console.log('start')
    const arr = getArr(200)
    const source$ = scheduler
      ? scheduled(arr, scheduler)
      : from(arr)

      source$.pipe(debug('1', shouldDebug)).subscribe({
      next(x) {
        box.style.top = `${x}px`
        box.style.left = `${x}px`
      },
      error(err) {
        console.error('something wrong occurred: ' + err)
      },
      complete() {
        console.log('complete')
      },
    })
    console.log('end')
  }, 300)
}

createBox()
createBtns()

/* 
使用不同的调度方式让box从100，100移动到300，300
 */