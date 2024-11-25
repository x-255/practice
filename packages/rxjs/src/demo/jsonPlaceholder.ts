import { concatAll, forkJoin, map, mergeMap, of, take, tap } from "rxjs"
import { ajax } from "rxjs/ajax"

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Geo {
  lat: string;
  lng: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const http = <T>(path: string) => ajax<T>(`https://jsonplaceholder.typicode.com/${path}`).pipe(map(res => res.response))

http<Post[]>('posts').pipe(
  concatAll(),
  take(5),
  tap(x => console.log(`x====`, x)),
  // mergeMap(({id, userId, title}) => forkJoin({
  //   id: of(id),
  //   title: of(title),
  //   username: http<User>(`users/${userId}`).pipe(map(u => u.username)),
  //   comment: http<Comment[]>(`comments?postId=${id}`),
  // }), 3)
).subscribe(console.log)