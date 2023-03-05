export function hasOwn(obj: Object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj !== null
}
