/*
 * @Description:两数之和 类型体操
 * @LastEditTime: 2022-04-29 11:09:14
 */
type ToArr<T extends number, A extends any[] = []> = A['length'] extends T
  ? A
  : ToArr<T, [...A, 0]>

type Sub<A extends number, B extends number> = ToArr<A> extends [
  ...ToArr<B>,
  ...infer O
]
  ? O['length']
  : never

type Tail<A extends any[]> = A extends [infer H, ...infer T] ? T : []

type TwoSum<T extends number[], U extends number> = T extends []
  ? false
  : [Sub<U, T[0]>] extends [never]
  ? false
  : Sub<U, T[0]> extends Tail<T>[number]
  ? true
  : TwoSum<Tail<T>, U>

type cases = [
  TwoSum<[3, 3], 6>, // true
  TwoSum<[3, 2, 4], 6>, // true
  TwoSum<[2, 7, 11, 15], 15>, // false
  TwoSum<[2, 7, 11, 15], 9>, // true
  TwoSum<[1, 2, 3], 0>, // false
  TwoSum<[1, 2, 3], 1>, // false
  TwoSum<[1, 2, 3], 2>, // false
  TwoSum<[1, 2, 3], 3>, // true
  TwoSum<[1, 2, 3], 4>, // true
  TwoSum<[1, 2, 3], 5>, // true
  TwoSum<[1, 2, 3], 6> // false
]
