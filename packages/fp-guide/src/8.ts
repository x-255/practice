/*
 * @Description:强大的容器
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-28 14:04:58
 */

import { add, compose, concat, curry, match, prop } from 'ramda'

interface Functor {
  map(value: any): any
}

type FunctorMapCb<V, R> = (value: V) => R

const map = curry(function map(f: AnyFunction, any_functor_at_all: Functor) {
  return any_functor_at_all.map(f)
})

class Identity<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Identity(x)
  }

  map<U>(f: FunctorMapCb<T, U>) {
    return Identity.of(f(this._value))
  }
}

// let c1 = Identity.of(2).map(function (two) {
//   return two + 2
// })
// console.log(c1)

// let c2 = Identity.of('flamethrowers').map(function (s) {
//   return s.toUpperCase()
// })
// console.log(c2)

// let c3 = Identity.of('bombs').map(concat(' away')).map(prop('length'))
// console.log(c3)

type Nothing = null | undefined

class Maybe<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Maybe(x)
  }

  isNothing() {
    return this._value == null
  }

  map<V = T, U = any>(
    f: FunctorMapCb<V, U>
  ): T extends Nothing ? Maybe<null> : Maybe<U> {
    return Maybe.of(
      this.isNothing() ? null : f(this._value as unknown as V)
    ) as any
  }
}

// let m1 = Maybe.of('Malkovich Malkovich').map(match(/a/gi))
// console.log(m1)

// let m2 = Maybe.of(null).map(match(/a/gi))
// console.log(m2)

// let m3 = Maybe.of({ name: 'Boris' }).map<any>(prop('age')).map(add(10))
// console.log(m3)

// let m4 = Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10))
// console.log(m4)

interface Address {
  street: string
  number: number
}

interface Site {
  addresses: Address[]
}

const safeHead = <T>(xs: T[]) => Maybe.of(xs[0])

const streetName = compose<[Site], Address[], Maybe<Address>, Maybe<string>>(
  map(prop('street')),
  safeHead,
  prop('addresses')
)

let s1 = streetName({ addresses: [] })
console.log(s1)
let s2 = streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] })
console.log(s2)
