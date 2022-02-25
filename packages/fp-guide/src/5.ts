/*
 * @Description:代码组合（compose） 练习
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-25 23:47:45
 */

import {
  add,
  compose,
  head,
  last,
  prop,
  reduce,
  map,
  replace,
  toLower,
  join,
  filter,
  __,
  sortBy,
  concat,
} from 'ramda'
import accounting from 'accounting'
import { expect } from './test'

interface Car {
  name: string
  horsepower: number
  dollar_value: number
  in_stock: boolean
}

const CARS: Car[] = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
]

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数

// var isLastInStock = function(cars) {
//   var last_car = _.last(cars);
//   return _.prop('in_stock', last_car);
// };

const isLastInStock = compose<Car[][], Car, boolean>(prop('in_stock'), last)
expect(isLastInStock, false, CARS)

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
const nameOfFirstCar = compose<Car[][], Car, string>(prop('name'), head)
expect(nameOfFirstCar, 'Ferrari FF', CARS)

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
function _average(xs: number[]) {
  return reduce(add, 0, xs) / xs.length
} // <- 无须改动

const averageDollarValue = compose(_average, map(prop('dollar_value')))
expect(averageDollarValue, 790700, CARS)

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

const _underscore = replace(/\W+/g, '_') //<-- 无须改动，并在 sanitizeNames 中使用它

const sanitizeNames = map(
  compose<Car[], string, string, string>(_underscore, toLower, prop('name'))
)
expect(
  sanitizeNames,
  [
    'ferrari_ff',
    'spyker_c12_zagato',
    'jaguar_xkr_s',
    'audi_r8',
    'aston_martin_one_77',
    'pagani_huayra',
  ],
  CARS
)

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices

// var availablePrices = function(cars) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x){
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };

const availablePrices = compose<Car[][], Car[], string[], string>(
  join(', '),
  map(
    compose<Car[], number, string>(accounting.formatMoney, prop('dollar_value'))
  ),
  filter<Car>(prop('in_stock'))
)
expect(availablePrices, '$700,000.00, $1,850,000.00', CARS)

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

// var fastestCar = function(cars) {
//   var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
//   var fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };

const fastestCar = compose<Car[][], Car[], Car, string, string>(
  concat(__, ' is the fastest'),
  prop('name'),
  last,
  sortBy(prop('horsepower'))
)
expect(fastestCar, 'Aston Martin One-77 is the fastest', CARS)
