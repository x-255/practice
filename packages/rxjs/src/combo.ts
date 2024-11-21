import { bufferCount, filter, fromEvent, map } from "rxjs"

const comboKeys = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

fromEvent<KeyboardEvent>(document.body, 'keydown').pipe(
  bufferCount(comboKeys.length, 1),
  map(evs => evs.map(e => e.code)),
  filter(codes => codes.join(',') === comboKeys.join(','))
).subscribe(e => {
  console.log('oh yeah')
})

/* 
每当按顺序按下上上下下左右左右BA时，输出'oh yeah'
*/