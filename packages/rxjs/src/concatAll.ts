import { from, range } from 'rxjs'
import { concatAll, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

// 假设 rxjs 的版本是 6 或更高

// 补全 urlObservable，这里假设 urlObservable 是一个 Observable，它发出一个 URL 字符串
const urlObservable = range(1, 5)

// 补全 http.get 方法，这里使用 rxjs.ajax.get
const http = {
    get: (id: number) =>
        ajax.get(
            `https://jsonplaceholder.typicode.com/todos/${id}`
        ),
}

// 创建文件的 Observable，它会通过 map 操作符将 URL 映射为 HTTP 请求
const fileObservable = urlObservable.pipe(
    map((url) => http.get(url)),
    concatAll()
)

// 现在，fileObservable 可以订阅，以触发 HTTP 请求并获取文件数据
fileObservable.subscribe({
    next: (res) => {
        console.log('File data:', res.response) // 假设文件数据在响应对象的 response 属性中
    },
    error: (error) => {
        console.error('Error:', error)
    },
})
