import { isArray, isDate, isObject } from './utils'

/**
 * 转码URL中?后的字符串，去掉特殊符号
 * 但保留 @ : $ , [ ]
 * 以及空格转成+
 * */
const encode = (val: string) =>
  encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')

export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.entries(params).forEach(([key, val]) => {
    if (val == null) {
      return
    }

    let values: string[]

    if (isArray(val)) {
      values = val
      key += '[]'
    } else {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }

      values = [val as string]
    }

    values.forEach((val) => {
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

console.log(
  bulidURL('/get?foo=bar', {
    bar: 'baz',
  }),
)
