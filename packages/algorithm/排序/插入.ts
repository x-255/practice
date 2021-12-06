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

function sort([...arr]: number[]): number[] {
  const len = arr.length

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      exec(arr, j, j - 1)
    }
  }

  return arr
}

export {}
