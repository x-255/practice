export const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'

const toString = Object.prototype.toString.call

export const isDate = (val: unknown): val is Date => val instanceof Date

export const isArray = Array.isArray
