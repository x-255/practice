import { isString } from '.'
import { isPlainObject } from './utils'

export function transformRequest(data: any) {
  return isPlainObject(data) ? JSON.stringify(data) : data
}

export function transformResponse(data: any) {
  if (isString(data)) {
    try {
      data = JSON.parse(data)
    } catch (err) {}
  }

  return data
}
