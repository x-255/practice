import { fromEvent, timestamp } from 'rxjs'

const clickWithTimestamp = fromEvent(document, 'click').pipe(timestamp())

// Emits data of type { value: PointerEvent, timestamp: number }
clickWithTimestamp.subscribe((data) => {
  console.log(data)
})
