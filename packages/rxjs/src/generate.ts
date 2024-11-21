import { add, gt, negate } from 'ramda'
import { generate } from 'rxjs'

const ob$ = generate({
  initialState: 1,
  iterate: add(1),
  condition: gt(10),
  resultSelector: negate,
})

ob$.subscribe((v) => console.log(v))

/* 
从1开始，每次加1，然后取反输出（-1 ~ -9），直到大于10停止
 */