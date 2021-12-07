import { exec } from '../utils'

function sort([...arr]: number[]): number[] {
  const len = arr.length

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      exec(arr, j, j - 1)
    }
  }

  return arr
}
