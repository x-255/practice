const goods = [
  { name: '吉他', weight: 1, cost: 1500 },
  { name: '音响', weight: 4, cost: 3000 },
  { name: '笔记本电脑', weight: 3, cost: 2000 },
  // { name: 'iphone', weight: 1, cost: 2000 },
]

/**
 * @param arr 商品列表
 * @param maxW 背包最大可承受重量
 * @returns 最大价值
 */
function getMaxCost(arr: typeof goods, maxW: number) {
  let max = 0
  const table: number[][] = []

  for (let i = 0; i < arr.length; i++) {
    const { weight, cost } = arr[i]
    for (let j = 1; j <= maxW; j++) {
      const prevRow = table[i - 1]
      const prev = prevRow?.[j] ?? 0
      const curr = cost + prevRow?.[maxW - j] ?? 0
      const _max = Math.max(prev, curr)

      if (!table[i]) {
        table[i] = [0]
      }
      table[i][j] = _max
    }

    max = Math.max(...table[table.length - 1])
  }
  console.log(`table====`, table)

  return max
}

console.log(getMaxCost(goods, 4))
