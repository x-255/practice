interface Function {
  bind2(this: Function, thisArg: any, ...argArray: any[]): any
}

Function.prototype.bind2 = function (ctx, ...args) {
  const FNoop = class {}
  const _this = this

  const fBound = function (this: any, ...bindArgs: any[]) {
    return _this.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs))
  }

  FNoop.prototype = this.prototype
  fBound.prototype = new FNoop()
  return fBound
}

var value = 2

var foo = {
  value: 1,
}

function bar(this: any, name: string, age: string) {
  this.habit = 'shopping'
  console.log(`this.value====`, this.value)
  console.log(`name====`, name)
  console.log(`age====`, age)
}

bar.prototype.friend = 'kevin'

var bindFoo = bar.bind2(foo, 'daisy')

var obj = new bindFoo('18')
console.log(`obj.habit====`, obj.habit)
console.log(`obj.friend====`, obj.friend)
