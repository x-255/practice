import { fromEvent, map, switchMap, tap } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { renderSelect } from './render'

interface User {
  id: string
  username: string
}

interface Album {
  id: string
  title: string
}

interface Photo {
  id: string
  title: string
  url: string
}

const req = <T>(path: string) =>
  ajax.getJSON<T>(`https://jsonplaceholder.typicode.com${path}`)

interface OnSelectChangeParams<R, V extends keyof R, T extends keyof R> {
  cls: string
  path: string
  queryName: string
  valKey: V
  textKey: T
  nextCls?: string
}

const onSelectChange = <R, V extends keyof R = keyof R, T extends keyof R = keyof R>({
  cls,
  path,
  queryName,
  valKey,
  textKey,
  nextCls
}: OnSelectChangeParams<R, V, T>) =>
  fromEvent(document.querySelector(cls)!, 'change').pipe(
    tap((e) => {
      if (!nextCls) return
      const next = document.querySelector(nextCls)
      next && (next.innerHTML = `<option value="">Loading...</option>`)
      img.src = ''
    }),
    map((e) => (e.target as HTMLSelectElement).value),
    switchMap((val) => req<R[]>(`/${path}?${queryName}=${val}`)),
    map((albums) => albums.map((a) => ({ value: a[valKey], text: a[textKey] })))
  )

renderSelect('users')
renderSelect('albums')
renderSelect('photos')
const img = document.createElement('img')
img.className = 'block w-64 h-64 mt-4 ml-15'
document.body.appendChild(img)

req<User[]>('/users').subscribe((users) => {
  renderSelect(
    'users',
    users.map((u) => ({ value: u.id, text: u.username }))
  )
})

onSelectChange<Album>({
  cls: '.users',
  path: '/albums',
  queryName: 'userId',
  valKey: 'id',
  textKey: 'title',
  nextCls: '.albums'
}).subscribe((albums) => {
  renderSelect('albums', albums)
})

onSelectChange<Photo>({
  cls: '.albums',
  path: '/photos',
  queryName: 'albumId',
  valKey: 'url',
  textKey: 'title',
  nextCls: '.photos'
}).subscribe((photos) => {
  renderSelect('photos', photos)
})

fromEvent(document.querySelector('.photos')!, 'change')
  .pipe(map((e) => (e.target as HTMLSelectElement).value))
  .subscribe((url) => {
    img.src = url
  })