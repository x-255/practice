/*
 * @Description:股票行情
 * @LastEditTime: 2022-02-18 15:47:14
 *
 * 让我们尝试一个更简单的问题。假设我们收集了纳斯达克股票随时间推移的所有价格。
 * 每次纳斯达克股票代码上的股票价格发生变化时，都会将一个条目添加到此集合中。
 * 假设十天前您购买了 Microsoft 的股票，现在您想打印从那时起所有的 MSFT 股价。
 * 从十天前开始过滤 MSFT 交易的集合，并使用 print() 函数打印每个价格记录（包括时间戳）。
 * 注意：这不是一个技巧问题。这就像看起来一样容易。
 */

interface PricesNASDAQ {
  name: string
  price: number
  timeStamp: Date
}
;[]

const pricesNASDAQ: PricesNASDAQ[] = [
  // ... from the NASDAQ's opening day
  { name: 'ANGI', price: 31.22, timeStamp: new Date(2011, 11, 15) },
  { name: 'MSFT', price: 32.32, timeStamp: new Date(2011, 11, 15) },
  { name: 'GOOG', price: 150.43, timeStamp: new Date(2011, 11, 15) },
  { name: 'ANGI', price: 28.44, timeStamp: new Date(2011, 11, 16) },
  { name: 'GOOG', price: 199.33, timeStamp: new Date(2011, 11, 16) },
  // ...and up to the present.
]

function fn27(pricesNASDAQ: PricesNASDAQ[], printRecord: AnyFunction) {
  let microsoftPrices: PricesNASDAQ[],
    now = new Date(),
    tenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10)

  // use filter() to filter the trades for MSFT prices recorded any time after 10 days ago
  microsoftPrices = pricesNASDAQ.filter(
    ({ timeStamp }) => timeStamp > tenDaysAgo
  ) // finish this expression

  // Print the trades to the output console
  microsoftPrices.forEach(function (priceRecord) {
    printRecord(priceRecord)
  })
}
