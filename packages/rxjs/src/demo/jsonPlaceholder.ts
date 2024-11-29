import { forkJoin, from, of } from 'rxjs'
import { debug } from 'rxjs-browser-debugger'
import { ajax } from 'rxjs/ajax'
import { concatMap, map, mergeMap, toArray } from 'rxjs/operators'

// 接口定义保持不变
interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
}
interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}
interface Geo {
  lat: string
  lng: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const req = <T>(path: string) =>
  ajax.getJSON<T>(`https://jsonplaceholder.typicode.com/${path}`);

const fetchPosts = () => req<Post[]>('posts').pipe(map(posts => posts.slice(0, 5)));

const fetchPostDetails = (post: Post) =>
  forkJoin({
    id: of(post.id),
    title: of(post.title),
    username: req<User>(`users/${post.userId}`).pipe(map(user => user.username)),
    comments: req<Comment[]>(`comments?postId=${post.id}`)
  });

fetchPosts().pipe(
  mergeMap(from),
  concatMap(fetchPostDetails),
  toArray(),
).subscribe(console.log);


/* 
先从posts接口获取前5篇文章
再依次获取每篇文章的作者名和评论
最后放到一个数组中输出
 */