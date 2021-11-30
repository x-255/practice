const createArr = (n: number) => [...Array(n).keys()]

function binarySearch(arr: number[], target: number) {
  let lo = 0,
    hi = arr.length

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

console.log(binarySearch(createArr(10), 11))
