import { bindCallback, map } from 'rxjs'
import * as R from 'ramda'

function get(url: string, cb: AnyFunction) {
  fetch(url)
    .then((res) => res.json())
    .then(cb)
}

const boundGet = bindCallback(get)

boundGet('https:/jsonplaceholder.typicode.com/users')
  .pipe(map(R.map(R.prop('email'))))
  .subscribe(console.log)
