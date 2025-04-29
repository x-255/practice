@clsDec
class A {
  x: number = 1
  constructor(public y: number) {}

  fn() {}
}

function clsDec(value: Function, ctx: ClassDecoratorContext) {
  if (ctx.metadata) {
    ctx.metadata.m = 123
  }
}

console.log(A[Symbol.metadata])
