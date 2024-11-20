import { filter, fromEvent } from "rxjs"

fromEvent<KeyboardEvent>(document.body, 'keydown').pipe(
  filter(e => e.code === 'ArrowUp'),
  filter(e => e.code === 'ArrowDown'),
).subscribe(e => {
  console.log(e)
})