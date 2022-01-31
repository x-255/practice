import { bulidURL } from '../helpers'
import { combineURLs } from '../helpers/combineURLs'
import { flattenHeaders } from '../helpers/headers'
import isAbsoluteURL from '../helpers/utils'
import { AxiosRequestConfig, AxiosResponse } from '../types'
import { transform } from './transform'
import xhr from './xhr'

export function dispatchRequest(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then((res) => transformResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
  const { data, headers, method, transformRequest } = config
  config.url = transformUrl(config)
  config.data = transform(data, headers, transformRequest)
  config.headers = flattenHeaders(headers, method!)
}

function transformUrl(config: AxiosRequestConfig) {
  let { url, params, baseURL, paramsSerializer } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURLs(baseURL, url)
  }
  return bulidURL(url!, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse) {
  const {
    data,
    headers,
    config: { transformResponse },
  } = res
  res.data = transform(data, headers, transformResponse)
  return res
}
