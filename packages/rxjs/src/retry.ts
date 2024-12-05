import { iif, of, retry, switchMap, throwError } from 'rxjs'

let succCount = 3
of(1,2,3)
  .pipe(
    switchMap((i) =>
      iif(
        () => i < succCount,
        of(i),
        throwError(() => new Error('eeeeee'))
      )
    ),
    retry({
      count: 2,
      delay: 1000
    })
  )
  .subscribe(console.log)

  setTimeout(() => {
    succCount = 4
  }, 2000)
