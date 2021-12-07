import { exec } from '../utils'

function sort(arr: number[], lo = 0, hi = arr.length - 1) {
  if (hi <= lo) {
    return
  }

  const j = partition(arr, lo, hi)
  sort(arr, lo, j - 1)
  sort(arr, j + 1, hi)
}

function partition(arr: number[], lo: number, hi: number) {
  const v = arr[lo]
  let i = lo,
    j = hi + 1

  while (true) {
    while (arr[++i] < v) {
      if (i === hi) {
        break
      }
    }

    while (v < arr[--j]) {
      if (j === lo) {
        break
      }
    }

    if (i >= j) {
      break
    }

    exec(arr, i, j)
  }

  exec(arr, lo, j)

  return j
}
