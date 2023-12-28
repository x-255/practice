import { fromEvent } from 'rxjs'

function create() {
  const div = document.createElement('div')
  div.style.cssText =
    'width: 100px; height: 100px; background: #09c;margin-top: 20px;'
  div.classList.add('box')
  document.body.appendChild(div)
}

create()
create()
create()
create()

fromEvent(document.querySelectorAll('.box'), 'click').subscribe(console.log)
