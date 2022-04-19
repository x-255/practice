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

type Case = [Sub<7, 4>]
