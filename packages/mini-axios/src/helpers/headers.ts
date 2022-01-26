import { CONTENT_TYPE, isPlainObject } from '.'

function normalizeHeaderName(headers: any, normalizedName: string) {
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, CONTENT_TYPE)

  if (headers && isPlainObject(data) && !headers[CONTENT_TYPE]) {
    headers[CONTENT_TYPE] = 'application/json;charset=utf-8'
  }

  return headers
}

export function parseResponseHeaders(resHeaders: string) {
  const parsed = Object.create(null)

  if (!resHeaders) {
    return parsed
  }

  resHeaders.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }

    val = val ? val.trim() : val

    parsed[key] = val
  })

  return parsed
}
