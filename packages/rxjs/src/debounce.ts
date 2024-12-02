import { interval, debounce, fromEvent } from "rxjs"
import { debug } from "rxjs-browser-debugger"

const click$ = fromEvent(document, "click")

interval(1000)