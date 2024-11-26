import { forkJoin, from, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap, take, toArray } from 'rxjs/operators'

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

// HTTP 工具函数
const fetchData = <T>(endpoint: string) =>
  ajax.getJSON<T>(`https://jsonplaceholder.typicode.com/${endpoint}`);

// 获取帖子数据（简化至前5个）
const fetchPosts = () => fetchData<Post[]>('posts').pipe(map(posts => posts.slice(0, 5)));

// 获取与帖子相关的详细信息
const fetchPostDetails = (post: Post) =>
  forkJoin({
    id: of(post.id),
    title: of(post.title),
    username: fetchData<User>(`users/${post.userId}`).pipe(map(user => user.username)),
    comments: fetchData<Comment[]>(`comments?postId=${post.id}`)
  });

fetchPosts().pipe(
  mergeMap(posts => from(posts)), // 将数组转为流
  mergeMap(fetchPostDetails, 3), // 并发控制（最多3个并发请求）
  toArray(),
).subscribe(console.log);
