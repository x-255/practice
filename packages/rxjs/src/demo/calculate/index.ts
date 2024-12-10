import { fromEvent, map, merge, Observable, startWith, zip } from "rxjs"
import { renderCalculatePage } from "./render"

renderCalculatePage()

const getInputVal = () => (source$: Observable<Event>) => source$.pipe(
  map(e => (e.target as HTMLInputElement).value),
  map(Number)
)

const a$ = fromEvent(document.querySelector('.a')!, 'input').pipe(getInputVal())
const b$ = fromEvent(document.querySelector('.b')!, 'input').pipe(getInputVal())

const formulaMap = {
  plus: (a: number, b: number) => a + b,
  decrease: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
}

const type$ = fromEvent(document.querySelector('.type')!, 'change').pipe(map(e => (e.target as HTMLInputElement).value), startWith('plus'))

zip(type$, a$, b$).subscribe(([type, a, b]) => {
  const result = formulaMap[type as keyof typeof formulaMap](a, b)
  document.querySelector('.result')!.textContent = result.toString()
})