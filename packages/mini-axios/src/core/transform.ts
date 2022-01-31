import { isArray } from '../helpers'
import { AxiosTransformer } from '../types'

export function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[],
) {
  if (!fns) {
    return data
  }

  if (!isArray(fns)) {
    fns = [fns]
  }

  fns.forEach((fn) => {
    data = fn(data, headers)
  })

  return data
}
