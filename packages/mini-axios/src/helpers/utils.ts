const objectToString = Object.prototype.toString

export const isObject = (val: unknown): val is AnyObject =>
  val !== null && typeof val === 'object'

export const isPlainObject = (val: unknown): val is object =>
  objectToString.call(val) === '[object Object]'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isDate = (val: unknown): val is Date => val instanceof Date

export const isArray = Array.isArray

export const CONTENT_TYPE = 'Content-Type'

export const isContentType = (val: unknown) =>
  isString(val) && val.toUpperCase() === CONTENT_TYPE.toUpperCase()

/** 将原始对象的可枚举属性依次合并到目标对象上 */
export const extend = <T, U>(to: T, from: U) => {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]) {
  const res = Object.create(null)

  objs.forEach((obj) => {
    if (!obj) {
      return
    }

    Object.keys(obj).forEach((key) => {
      const val = obj[key]

      if (isPlainObject(val)) {
        if (isPlainObject(res[key])) {
          res[key] = deepMerge(res[key], val)
        } else {
          res[key] = deepMerge({}, val)
        }
      } else {
        res[key] = val
      }
    })
  })

  return res
}

export default function isAbsoluteURL(url: string): boolean {
  // 如果URL以“<scheme>：//”或“//”（协议相对URL）开头，则该URL被视为绝对值。
  // RFC 3986将方案名称定义为以字母开头的字符序列，
  // 后跟字母，数字，加号，句点或连字符的任意组合。
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function isURLSearchParams(val: unknown): val is URLSearchParams {
  return val instanceof URLSearchParams
}
