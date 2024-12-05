import { observeOn, queueScheduler, range, SchedulerLike } from "rxjs"

function createBox() {
  const box = document.createElement('div')
  box.className = 'box'
  box.style.width = '50px'
  box.style.height = '50px'
  box.style.backgroundColor = '#F4A460'
  box.style.position = 'absolute'
  document.body.appendChild(box)
}

function createBtns() {
  const schedulers = [null, queueScheduler]
}

function updatePosition(scheduler: SchedulerLike) {
  const box = document.querySelector('.box') as HTMLDivElement
  box.style.top = '100px'
  box.style.left = '100px'

  range(100, 300).pipe(observeOn(scheduler)).subscribe((x) => {
    box.style.top = `${x}px`
    box.style.left = `${x}px`
  })
}
createBox()