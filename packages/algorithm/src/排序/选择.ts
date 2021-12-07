import { exec } from '../utils'

function sort([...arr]: number[]) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        exec(arr, i, j)
      }
    }
  }

  return arr
}
