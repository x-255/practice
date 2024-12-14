import { groupBy, length, mapObjIndexed, pipe, prop } from 'ramda'

interface Item {
  category: string
  name: string
}

const data: Item[] = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'cherry' },
  { category: 'vegetable', name: 'spinach' },
]

const res = pipe(groupBy<Item>(prop('category')), mapObjIndexed(length))(data)

console.log(res)

/* 按照 category 对数据分组，并统计每组的条目数量 */