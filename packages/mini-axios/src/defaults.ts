import { CONTENT_TYPE, transformRequest, transformResponse } from './helpers'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types'

export const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
  transformRequest: [
    (data: any, headers: any) => {
      processHeaders(headers, data)
      return transformRequest(data)
    },
  ],
  transformResponse: [(data: any) => transformResponse(data)],
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
