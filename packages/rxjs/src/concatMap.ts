import { concatMap, range } from 'rxjs'
import { ajax } from 'rxjs/ajax'

range(1, 5)
  .pipe(
    concatMap((i) => ajax(`https://jsonplaceholder.typicode.com/posts/${i}`))
  )
  .subscribe(console.log)
