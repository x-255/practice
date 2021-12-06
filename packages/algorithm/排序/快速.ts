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

function sort(arr: number[]): number[] {
  const len = arr.length

  if (len < 2) {
    return arr
  }
  const m = arr[0],
    left: number[] = [],
    right: number[] = []

  for (let i = 1; i < len; i++) {
    const x = arr[i]
    if (x < m) {
      left.push(x)
    } else {
      right.push(x)
    }
  }

  return [...sort(left), m, ...sort(right)]
}

console.log(sort(createChaoticArr(20)))
export {}
