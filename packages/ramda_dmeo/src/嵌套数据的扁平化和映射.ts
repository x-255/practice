import { flatten, map, pipe, prop, uniq } from "ramda"

interface User {
  id: number
  name: string
  hobbies: string[]
}

interface Data {
  users: User[]
}

const data: Data = {
  users: [
    { id: 1, name: 'Alice', hobbies: ['reading', 'hiking'] },
    { id: 2, name: 'Bob', hobbies: ['swimming', 'gaming'] },
    { id: 3, name: 'Charlie', hobbies: ['gaming', 'hiking'] },
  ],
}

const res = pipe(
  prop<'users', User[]>('users'),
  map(prop('hobbies')),
  flatten,
  uniq,
)(data)

console.log(res)

/* 提取所有用户的爱好，并去重 */