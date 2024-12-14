import { __, descend, filter, gte, map, pipe, prop, propSatisfies, sort } from "ramda"

const data = [
  { id: 1, name: 'Alice', score: 85 },
  { id: 2, name: 'Bob', score: 92 },
  { id: 3, name: 'Charlie', score: 78 },
  { id: 4, name: 'David', score: 62 },
]

const res = pipe(
  filter(propSatisfies(gte(__, 80), 'score')),
  sort(descend(prop('score'))),
  map(prop('name')),
)(data)

console.log(res)

/* 
1.筛选出分数大于等于 80 的用户。
2.按照分数从高到低排序。
3.提取用户的 name
 */