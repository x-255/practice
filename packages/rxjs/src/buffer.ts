import { buffer, fromEvent, interval } from 'rxjs'

const clicks = fromEvent(document, 'click')
const intervalEvents = interval(1000)
const buffered = intervalEvents.pipe(buffer(clicks))
buffered.subscribe((x) => console.log(x))
