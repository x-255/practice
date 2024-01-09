import { map, mergeAll, Observable, of } from 'rxjs'

const req = (name: string) =>
  new Observable<{ name: string }>((observer) => {
    const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)
    console.log(`req for ${name}`)
    setTimeout(() => {
      observer.next({ name })
      observer.complete()
    }, randomDelay)
  })

of('a', 'b', 'c', 'd', 'e', 'f')
  .pipe(
    map((name) => req(name)),
    mergeAll(3)
  )
  .subscribe(console.log)
