/*
 * @Description:强大的容器
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-27 21:57:47
 */

import { add, compose, concat, match, prop, curry } from 'ramda'
import { trace } from './test'

interface Functor<T = any> {
  _value: T
  of<U>(value: U): Functor<U>
  map<U>(f: (value: T) => U): Functor<U>
}

class Container<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Container(x)
  }

  map<U>(f: (value: T) => U) {
    return Container.of(f(this._value))
  }
}

let x = Container.of('bombs').map(concat(' away')).map(prop('length'))
// console.log(x)

type Nothing = null | undefined

class Maybe<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Maybe(x)
  }

  isNothing() {
    return this._value == null
  }

  map<U>(f: (value: T) => U): T extends Nothing ? Maybe<null> : Maybe<U> {
    return Maybe.of(this.isNothing() ? null : f(this._value)) as any
  }
}

const map = curry(function (f, any_functor_at_all: Functor) {
  return any_functor_at_all.map(f)
})

const maybe = curry(function maybe<P, U, T>(
  x: P,
  f: (value: T) => U,
  m: Maybe<T>
) {
  return m.isNothing() ? x : f(m._value)
})

// console.log(Maybe.of('Malkovich Malkovich').map(match(/a/gi)))
// console.log(Maybe.of<string>(null as any).map(match(/a/gi)))
// console.log(
//   (<any>Maybe.of({ name: 'Boris' } as any).map(prop('age'))).map(add(10))
// )
// console.log(
//   Maybe.of({ name: 'Dinah', age: 14 }).map<number>(prop('age')).map(add(10))
// )

var safeHead = function (xs: any[]) {
  return Maybe.of(xs[0])
}

var streetName = compose<any[], any, any, any>(
  map(prop('street')),
  safeHead,
  prop('addresses')
)

// console.log(streetName({ addresses: [] }))
// console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }))

interface Account {
  balance: number
}

const withdraw = curry(function withdraw(amount: number, account: Account) {
  return account.balance >= amount
    ? Maybe.of({ balance: account.balance - amount } as Account)
    : Maybe.of(null)
})

const finishTransaction = (account: Account) =>
  `Your balance is $${account.balance}`

/* const getTwenty = compose<Account[], any, string>(
  map(finishTransaction),
  withdraw(20)
)

console.log(getTwenty({ balance: 200.0 }))
console.log(getTwenty({ balance: 10.0 })) */

const getTwenty = compose<Account[], any, string>(
  maybe(`You're broke!`, finishTransaction as any),
  withdraw(20)
)

// console.log(getTwenty({ balance: 200.0 }))
// console.log(getTwenty({ balance: 10.0 }))

type Id<T = any> = (...args: any[]) => T

class IO<T> {
  constructor(public unsafePerformIO: Id<T>) {}

  static of<U>(x: U) {
    return new IO(() => x)
  }

  map<U>(f: Id<U>) {
    return IO.of(compose(f, this.unsafePerformIO))
  }
}
