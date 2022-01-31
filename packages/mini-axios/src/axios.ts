import { Axios } from './core/Axios'
import { mergeConfig } from './core/mergeConfig'
import { defaults } from './defaults'
import { extend } from './helpers'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'

function getAxios(config: AxiosRequestConfig) {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  return extend(instance, context) as AxiosStatic
}

export const axios = getAxios(defaults)

axios.create = (config: AxiosRequestConfig) =>
  getAxios(mergeConfig(defaults, config))
