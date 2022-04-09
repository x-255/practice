// 快速排序
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr
  }
  const pivot = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 打乱数组
function shuffle(arr: number[]): number[] {
  return arr.sort(() => Math.random() - 0.5)
}
