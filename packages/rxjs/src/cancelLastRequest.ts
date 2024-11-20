import {fromEvent} from 'rxjs'

const result = document.createElement('div')
document.body.appendChild(result)

const btn = document.createElement('button')
btn.textContent = 'get data'
document.body.appendChild(btn)

fromEvent(btn, 'click').subscribe(console.log)