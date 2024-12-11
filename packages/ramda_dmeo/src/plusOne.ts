import { add, map } from 'ramda'

const data = [2, 3, 4, 5, 6]
const res = map(add(1), data)
console.log(res)

/* 
每个元素加1
 */