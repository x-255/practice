const createArr = (n: number) => [...Array(n).keys()]

// 循环版
function binarySearch(arr: number[], target: number) {
  let lo = 0,
    hi = arr.length - 1

  while (lo <= hi) {
    const m = lo + ((hi - lo) >> 1)
    const x = arr[m]
    if (x > target) {
      hi = m - 1
    } else if (x < target) {
      lo = m + 1
    } else {
      return m
    }
  }

  return -1
}

// 递归版
function binarySearch2(arr: number[], target: number, lo = 0, hi = arr.length - 1): number {
  if (lo > hi) {
    return -1
  }
  const m = lo + ((hi - lo) >> 1)
  const x = arr[m]

  if (x > target) {
    return binarySearch2(arr, target, lo, m - 1)
  } else if (x < target) {
    return binarySearch2(arr, target, m + 1, hi)
  } else {
    return m
  }
}

export {}
