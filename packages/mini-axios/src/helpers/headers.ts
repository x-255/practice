import { CONTENT_TYPE, deepMerge, isPlainObject } from '.'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string) {
  Object.keys(headers).forEach((name) => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
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

export function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common',
  ]

  methodsToDelete.forEach((method) => {
    delete headers[method]
  })

  return headers
}
