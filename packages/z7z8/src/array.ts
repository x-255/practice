type ArrayCallback<T, U = unknown> = (value: T, index: number, array: T[]) => U

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  /*  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }, */
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

function insertSort(arr: any[], cb: SortCallback) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && cb(arr[j - 1], arr[j]) > 0; j--) {
      exec(arr, j, j - 1)
    }
  }
}

// todo
function quickSort(arr: any[], cb: SortCallback) {}

function partition(arr: any, cb: SortCallback) {}

function sort<T>(arr: T[], cb: SortCallback<T>): T[] {
  if (arr.length <= 10) {
    insertSort(arr, cb)
  }
  return arr
}

const ordered = sort(inventors, (a, b) => {
  console.log(`a2====`, a)
  console.log(`b2====`, b)
  return a.year - b.year
})
console.log(inventors)
