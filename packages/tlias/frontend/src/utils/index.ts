import { assoc, curry, dissoc, tap } from 'ramda'

export const log =
  <T>(key: string | number) =>
  (val: T) => {
    console.log(`${key}====`, val)
    return val
  }

export const renameKey = <
  T extends object,
  O extends keyof T,
  N extends string
>(
  oldKey: O,
  newKey: N,
  obj: T
): Omit<T, O> & Record<N, T> => {
  const value = obj[oldKey]

  return assoc(newKey, value, dissoc(oldKey, obj)) as any
}

export const modify = <T extends object, K extends keyof T, R>(
  key: K,
  transfer: (v: T[K]) => R,
  obj: T
) => {
  return {
    ...obj,
    [key]: transfer(obj[key]),
  } as T & Record<K, R>
}
