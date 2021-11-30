const goods = [
  { name: '吉他', weight: 1, cost: 1500 },
  { name: '音响', weight: 4, cost: 3000 },
  { name: '笔记本电脑', weight: 3, cost: 2000 },
  { name: 'iphone', weight: 1, cost: 2000 },
]

/**
 * @param arr 商品列表
 * @param maxW 背包最大可承受重量
 * @returns 最大价值
 */
function getMaxCost(arr: typeof goods, maxW: number) {
  const len = arr.length
  const cell: number[][] = []

  for (let i = 0; i < len; i++) {
    const { weight: w, cost: c } = arr[i]
    const row = cell[i - 1]
    if (!cell[i]) {
      cell[i] = []
    }
    for (let j = 0; j < maxW; j++) {
      const pw = j + 1
      let max
      if (w > pw) {
        max = i === 0 ? 0 : row[j]
      } else if (w === pw) {
        max = i === 0 ? c : Math.max(c, row[j])
      } else {
        max = i === 0 ? c : Math.max(c + row[j - w] ?? 0, row[j])
      }
      cell[i][j] = max
      if (i === len - 1 && pw === maxW) {
        return max
      }
    }
  }
}

console.log(getMaxCost(goods, 4))
