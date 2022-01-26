import { bulidURL, transformRequest, transformResponse } from '../helpers'
import { processHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

export function dispatchRequest(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then((res) => transformResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return bulidURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig) {
  const { data = null } = config
  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)

  return res
}
