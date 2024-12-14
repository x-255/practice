import { equals, innerJoin, pipe } from "ramda"

interface User {
  id: number
  name: string
}

interface Order {
  orderId: number
  userId: number
  amount: number
}

const users: User[] = [
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" },
  { "id": 3, "name": "Charlie" }
]

const orders: Order[] = [
  { "orderId": 101, "userId": 1, "amount": 200 },
  { "orderId": 102, "userId": 2, "amount": 500 },
  { "orderId": 103, "userId": 1, "amount": 300 },
  { "orderId": 104, "userId": 3, "amount": 150 }
]

const res = pipe(
  innerJoin<Order, User>((a, b) => equals(a.userId, b.id)),
)(orders, users)

console.log(res)