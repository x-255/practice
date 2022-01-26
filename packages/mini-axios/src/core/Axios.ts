import { AxiosRequestConfig, Method } from '../types'
import { dispatchRequest } from './dispatchRequest'

export class Axios {
  request(config: AxiosRequestConfig) {
    return dispatchRequest(config)
  }

  get = (url: string, config?: AxiosRequestConfig) =>
    this._requestMethodWithoutData('get', url, config)

  delete = (url: string, config?: AxiosRequestConfig) =>
    this._requestMethodWithoutData('delete', url, config)

  head = (url: string, config?: AxiosRequestConfig) =>
    this._requestMethodWithoutData('head', url, config)

  options = (url: string, config?: AxiosRequestConfig) =>
    this._requestMethodWithoutData('options', url, config)

  post = (url: string, data?: any, config?: AxiosRequestConfig) =>
    this._requestMethodWithData('post', url, data, config)

  put = (url: string, data?: any, config?: AxiosRequestConfig) =>
    this._requestMethodWithData('put', url, data, config)

  patch = (url: string, data?: any, config?: AxiosRequestConfig) =>
    this._requestMethodWithData('patch', url, data, config)

  private _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return dispatchRequest({
      ...config,
      method,
      url,
    })
  }

  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return dispatchRequest({
      ...config,
      method,
      url,
      data,
    })
  }
}
