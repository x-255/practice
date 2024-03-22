import { assoc, curry, dissoc, pipe } from "ramda"

const renameKeyFn = <T extends object, K extends keyof T, N extends string>(oldKey: K, newKey: N, obj: T) => {
  const value = obj[oldKey]
  
  return assoc(newKey, value, dissoc<T, K>(oldKey, obj))
}

export const renameKey = curry(renameKeyFn)