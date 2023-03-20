export function hasOwn(obj: Object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function isObject(obj: unknown): obj is AnyObject {
  return typeof obj === 'object' && obj !== null
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isOn(value: string) {
  return /^on[^a-z]/.test(value)
}
