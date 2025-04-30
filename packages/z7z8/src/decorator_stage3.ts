@clsDec
class A {
  x: number = 1
  constructor(public y: number) {}

  fn() {}
}

// 确保声明类型正确
function clsDec(value: any, ctx: ClassDecoratorContext) {
  ctx.metadata!.mm = 123;
  console.log(`ctx====`, ctx)
  return value;
}

const data = A[Symbol.metadata]
console.log(`data====`, data)
