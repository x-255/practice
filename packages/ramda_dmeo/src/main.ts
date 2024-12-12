import { groupBy, prop } from "ramda"

const data = [
  { "category": "fruit", "name": "apple" },
  { "category": "fruit", "name": "banana" },
  { "category": "vegetable", "name": "carrot" },
  { "category": "fruit", "name": "cherry" },
  { "category": "vegetable", "name": "spinach" }
]

console.log(groupBy(prop('category'), data))