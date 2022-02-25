/*
 * @Description:纯函数的好处
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-25 14:17:53
 */

function memoize<T extends AnyFunction>(f: T) {
  let cache: AnyObject = {}

  return function memoized(...args: any[]) {
    const arg_str = JSON.stringify(args)
    console.log(arg_str)
    cache[arg_str] = cache[arg_str] || f.apply(f, args)

    return cache[arg_str]
  } as T
}

var squareNumber = memoize(function (x: number) {
  return x * x
})

console.log(squareNumber(4))
console.log(squareNumber(4))
console.log(squareNumber(7))
console.log(squareNumber(7))
