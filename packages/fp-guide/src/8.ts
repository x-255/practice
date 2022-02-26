/*
 * @Description:强大的容器
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-26 22:24:45
 */

import { concat, prop } from 'ramda'

class Container<T> {
  constructor(private _value: T) {}

  static of<U>(x: U) {
    return new Container(x)
  }

  map<U>(f: (a: T) => U) {
    return Container.of(f(this._value))
  }
}

let x = Container.of('bombs').map(concat(' away')).map(prop('length'))
console.log(x)
