import { assoc, evolve, map, pipe, prop, __ } from 'ramda'

const statusMap = {
  a: 'active',
  b: 'block',
  c: 'content',
  d: 'data',
}

interface Item {
  id: number
  name: string
  status: keyof typeof statusMap
  statusName?: string
}

const data: Item[] = [
  {
    id: 1,
    name: 'name1',
    status: 'a',
  },
  {
    id: 2,
    name: 'name2',
    status: 'b',
  },
  {
    id: 3,
    name: 'name3',
    status: 'c',
  },
]

const addStatusName = (item: Item) =>
  assoc('statusName', prop(item.status, statusMap), item)

const res = map(addStatusName)(data)

console.log(res)
