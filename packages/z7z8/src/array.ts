type ArrayCallback<T, U = unknown> = (value: T, index: number, array: T[]) => U

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
]

/* ============================================================ */

function filter<T>(arr: T[], cb: ArrayCallback<T>): T[] {
  const res: T[] = []

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    if (!!cb(value, i, arr)) {
      res.push(value)
    }
  }

  return res
}

const fifteen = inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600)
// console.log(fifteen)

/* ============================================================ */

function map<T, U>(arr: T[], cb: ArrayCallback<T, U>) {
  const res: U[] = []

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    res.push(cb(value, i, arr))
  }

  return res
}

const fullNames = map(inventors, (inventor) => inventor.first + ' ' + inventor.last)
// console.log(fullNames)

/* ============================================================ */

type SortCallback<T = any> = (a: T, b: T) => number

function exec(arr: any[], i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function sort<T>([...arr]: T[], cb: SortCallback<T>): T[] {
  if (arr.length <= 10) {
    insertSort()
  } else {
    quickSort()
  }

  return arr

  function insertSort(s = 0, e = arr.length) {
    for (let i = s + 1; i < e; i++) {
      for (let j = i; j > 0 && isGt(j - 1, j); j--) {
        exec(arr, j, j - 1)
      }
    }
  }

  function quickSort(s = 0, e = arr.length - 1) {
    if (e < s) {
      return
    }

    if (e - s <= 10) {
      return insertSort(s, e + 1)
    }

    let j = partition(s, e)
    quickSort(s, j - 1)
    quickSort(j + 1, e)
  }

  function isGt(i: number, j: number) {
    return cb(arr[i], arr[j]) > 0
  }

  function partition(s: number, e: number): number {
    let i = s,
      j = e + 1

    while (true) {
      while (isGt(s, ++i)) {
        if (i === e) {
          break
        }
      }

      while (isGt(--j, s)) {
        if (j === s) {
          break
        }
      }

      if (i >= j) {
        break
      }

      exec(arr, i, j)
    }

    exec(arr, s, j)

    return j
  }
}

const ordered = sort(inventors, (a, b) => {
  return a.year - b.year
})
// console.log(ordered)

/* ============================================================ */
type ReduceCb<T, U> = (prevValue: U, currValue: T, index: number, array: T[]) => U
function reduce<T>(arr: T[], cb: ReduceCb<T, T>): T
function reduce<T, U>(arr: T[], cb: ReduceCb<T, U>, initialValue: U): U
function reduce<T, U>(arr: T[], cb: ReduceCb<T, U>, initialValue?: U): U {
  const hasInitialValue = initialValue !== undefined

  let res: any = hasInitialValue ? initialValue : arr[0]

  for (let i = hasInitialValue ? 1 : 0; i < arr.length; i++) {
    res = cb(res, arr[i], i, arr)
  }

  return res
}

const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
]
const redu = reduce(
  data,
  (obj, item) => {
    if (!obj[item]) {
      obj[item] = 0
    }
    obj[item]++
    return obj
  },
  {} as any,
)
console.log(redu)

export {}