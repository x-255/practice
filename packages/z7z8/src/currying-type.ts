declare function Currying<F>(fn: F): Curried<F>
type Curried<F> = F extends (...args: infer A) => infer R
  ? A extends [infer H, ...infer I]
    ? (arg: H) => Curried<(...args: I) => R>
    : R
  : never

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
)
