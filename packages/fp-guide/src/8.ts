/*
 * @Description:强大的容器
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-28 23:47:16
 */

import { add, compose, concat, curry, invoker, match, prop } from 'ramda'
import moment from 'moment'
import { trace } from './test'

type FunctorMapCb<V, R> = (value: V) => R
type Nothing = null | undefined

interface Functor<T> {
  _value: T
  map<U>(f: FunctorMapCb<T, U>): Functor<U>
}

const map = curry(function map<U, T>(
  f: FunctorMapCb<any, U>,
  any_functor_at_all: Functor<T>
) {
  return any_functor_at_all.map(f)
})

const maybe = curry(function maybe<U, T>(
  x: U,
  f: FunctorMapCb<any, U>,
  m: Maybe<T>
) {
  return m.isNothing() ? x : f(m._value)
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

const streetName = compose<[Site], any, any, Maybe<string>>(
  map(prop('street')),
  safeHead,
  prop('addresses')
)

// let s1 = streetName({ addresses: [] })
// console.log(s1)

// let s2 = streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] })
// console.log(s2)

interface Account {
  balance: number
}

const withdraw = curry(function (amount: number, account: Account) {
  return account.balance >= amount
    ? Maybe.of({ balance: account.balance - amount })
    : Maybe.of(null)
})

const finishTransaction = (account: Account) =>
  `Your balance is $${account.balance}`

// const getTwenty = compose<[Account], any, string>(
//   map(finishTransaction),
//   withdraw(20)
// )

const getTwenty = compose<[Account], Maybe<Account>, string>(
  maybe("You're broke!", finishTransaction),
  withdraw(20)
)

// let t1 = getTwenty({ balance: 200.0 })
// console.log(t1)

// let t2 = getTwenty({ balance: 10.0 })
// console.log(t2)

class Left<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Left(x)
  }

  map<U>(f: FunctorMapCb<T, U>) {
    return this
  }
}

class Right<T> {
  constructor(public _value: T) {}

  static of<U>(x: U) {
    return new Right(x)
  }

  map<U>(f: FunctorMapCb<T, U>) {
    return Right.of(f(this._value))
  }
}

const getAge = curry(function (now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD')
  if (!birthdate.isValid()) return Left.of('Birth date could not be parsed')
  return Right.of(now.diff(birthdate, 'years'))
})

// let a1 = getAge(moment(), { birthdate: '2005-12-12' })
// console.log(a1)

// let a2 = getAge(moment(), { birthdate: 'balloons!' })
// console.log(a2)

const toFixed: (x: number) => string = invoker(0, 'toFixed')

const fortune = compose<[number], any, any, string>(
  concat('If you survive, you will be '),
  toFixed,
  add(1)
)

const zoltar = compose<[{ birthdate: string }], any, any, void>(
  map(console.log),
  map(fortune),
  getAge(moment())
)

let z1 = zoltar({ birthdate: '2005-12-12' })
console.log(`z1====`, z1)

let z2 = zoltar({ birthdate: 'balloons!' })
console.log(`z2====`, z2)
