import { Axios } from './core/Axios'
import { defaults } from './defaults'
import { extend } from './helpers'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(config: AxiosRequestConfig) {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  return extend(instance, context) as AxiosInstance
}

export const axios = createInstance(defaults)
