type Compose<T extends AnyFuncion[]> = ReturnType<
  (...fns: T) => T extends [...AnyFuncion[], infer L] ? L : AnyFuncion
>

export const compose = <T extends AnyFuncion[]>(...fns: readonly [...T]) =>
  fns.reduce(
    (pre, fn) =>
      (...args: any[]) =>
        pre(fn(...args)),
  ) as Compose<T>

export const createArr = (n: number) => [...Array(n).keys()]

export const shuffle = ([...arr]: number[]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[i], arr[m]] = [arr[m], arr[i]]
  }
  return arr
}

export const createChaoticArr = compose(shuffle, createArr)

export const exec = (arr: any[], i: number, j: number) => {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

export const isSorted = (arr: number[]) => {
  let is = false

  try {
    if (!arr || arr.length < 2) {
      return (is = true)
    }

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return (is = false)
      }
    }

    return (is = true)
  } finally {
    console.log(arr)
    console.log(is)
  }
}
