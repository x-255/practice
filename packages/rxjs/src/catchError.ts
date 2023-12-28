import { catchError, map, of, take } from "rxjs"

of(1, 2, 3).pipe(
    map(x => {
        if (x === 2) throw new Error("x is 2")

        return x
    }),
    catchError((err, caught) => {
        console.log('err====', err)
        return caught
    }),
    take(3)
).subscribe(console.log)