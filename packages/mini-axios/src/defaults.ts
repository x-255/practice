import { CONTENT_TYPE } from './helpers'
import { AxiosRequestConfig } from './types'

export const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
}

const methodsNoData = <const>['delete', 'get', 'head', 'options']

methodsNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodsWithData = <const>['post', 'put', 'patch']

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    [CONTENT_TYPE]: 'application/x-www-form-urlencoded',
  }
})
