import { bulidURL } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
