/*
 * @Description:两数之和 类型体操
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-04-20 00:26:35
 */
type ToArr<
  N extends number,
  Arr extends number[] = []
> = Arr['length'] extends N ? Arr : ToArr<N, [...Arr, 0]>

type Add<A extends number, B extends number> = [
  ...ToArr<A>,
  ...ToArr<B>
]['length']

type Sub<A extends number, B extends number> = ToArr<A> extends [
  ...ToArr<B>,
  ...infer Diff
]
  ? Diff['length']
  : never

type Tail<T> = T extends [infer Head, ...infer Tail] ? Tail : []

/* 判断数组中有没有两个数的和等于目标数字的 */
type TwoSum<N extends number[], T extends number> = N['length'] extends 0
  ? false
  : Sub<T, N[0]> extends Tail<N>[number]
  ? true
  : TwoSum<Tail<N>, T>

type Case = [
  TwoSum<[1, 2, 3, 4], 5>,
  TwoSum<[1, 2, 3, 4], 7>,
  TwoSum<[1, 2, 3, 4], 11>
]
