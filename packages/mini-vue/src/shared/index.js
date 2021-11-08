export const isObject = (val) => val !== null && typeof val === 'object'

export const isSymbol = (val) => typeof val === 'symbol'

export const isArray = Array.isArray

export const isInt = (val) => `${parseInt(val)}` === val

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (obj, key) => hasOwnProperty.call(obj, key)
