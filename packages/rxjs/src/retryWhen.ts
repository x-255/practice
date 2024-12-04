import { iif, interval, of, switchMap, throwError } from "rxjs"
import { i } from "vite/dist/node/types.d-aGj9QkWt"

let succCount = 3
interval(1000).pipe(
  switchMap((i) => iif(() => i === 2, of(i), throwError(() => new Error('error')))),
).subscribe(console.log)