interface Function {
  call2(this: Function, thisArg: any, ...argArray: any[]): any
}

const fnName = Symbol('call fn')

Function.prototype.call2 = function (ctx, ...args) {
  ctx = ctx || window
  ctx[fnName] = this
  const res = ctx[fnName](...args)
  delete ctx[fnName]

  return res
}

var foo1 = {
  value: 1,
}

function bar1(this: any, name: string, age: number) {
  console.log(name)
  console.log(age)
  console.log(this.value)
  return { name, age, value: this.value }
}

console.log(bar1.call2(foo1, 'name', 10))
