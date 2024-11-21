import { from, range } from 'rxjs'
import { concatAll, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const urlObservable = range(1, 5)

const http = {
  get: (id: number) =>
    ajax.get(`https://jsonplaceholder.typicode.com/todos/${id}`),
}

const fileObservable = urlObservable.pipe(
  map((url) => http.get(url)),
  concatAll()
)

fileObservable.subscribe({
  next: (res) => {
    console.log('File data:', res.response)
  },
  error: (error) => {
    console.error('Error:', error)
  },
})

/* 
按顺序请求1到5的数据，然后输出
 */
