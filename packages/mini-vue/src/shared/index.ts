export const isObject = (value: unknown): value is AnyObject =>
  value !== null && typeof value === 'object'

export const isFunction = (value: unknown): value is AnyFunction => typeof value === 'function'
