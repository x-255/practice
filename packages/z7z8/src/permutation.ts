function permutation(str: string) {
  const R = (set: Set<string>): string[] => {
    if (set.size === 1) {
      return [...set.values()]
    }

    return flat(
      [...set].map((char) => R(remove(char, set)).map((prem) => char + prem))
    )
  }

  return R(new Set(str))
}

function remove<T>(v: T, set: Set<T>) {
  const _set = new Set(set)
  _set.delete(v)
  return _set
}

function flat(arr: any[]): any[] {
  if (!Array.isArray(arr)) return arr
  return (<any>[]).concat(...arr.map(flat))
}

console.log(permutation('abcc'))
