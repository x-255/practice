const compose =
  (...fns: Function[]) =>
  (...args: any[]) =>
    fns.reduceRight((prevRes, fn) => [fn.apply(null, prevRes)], args)[0]

const createArr = (n: number) => [...Array(n).keys()]

const shuffle = ([...arr]: number[]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[i], arr[m]] = [arr[m], arr[i]]
  }
  return arr
}

const createChaoticArr: (x: number) => number[] = compose(shuffle, createArr)

const exec = (arr: any[], i: number, j: number) => {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

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

export {}
