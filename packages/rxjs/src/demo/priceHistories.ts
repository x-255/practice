/*
 * @Author: finn.xu ouhuangff@163.com
 * @Date: 2024-04-08 16:39:13
 * @LastEditTime: 2024-04-08 16:52:41
 * @Description: 
 * 假設有一個資料流會發送每日收盤時股價，平均股價約 100 元上下
 * 第一天股價一定是 100 元，可忽略它，從第二天開始呈現以下資訊
 *    當股價比前一天高，顯示「股價上漲了！」
 *    當股價比前一天低，顯示「股價下跌了！」
 *    每天提示從歷史以來股價小於 100 元的天數
 */

import { from, map, pairwise, scan } from 'rxjs'

const priceHistories = [100, 98, 96, 102, 99, 105, 105]

document.querySelector('#app')!.innerHTML = priceHistories.toString()

from(priceHistories)
  .pipe(
    pairwise(),
    map(([pre, cur], index) => ({
      day: index + 2,
      value: cur,
      type: cur > pre ? '上涨' : cur < pre ? '下跌' : '持平',
      lower100: cur < 100 ? 1 : 0,
    })),
    scan((acc, cur) => ({
      ...cur,
      lower100: cur.lower100 + acc.lower100,
    }))
  )
  .subscribe((data) => {
    console.log(`第${data.day}天`)
    console.log(`今日股价: ${data.value}`)
    console.log(`今日股价${data.type}`)
    console.log(`历史股价小于100的有${data.lower100}天`)
  })
