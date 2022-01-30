import { isString } from '../helpers'
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn,
} from '../types'
import { dispatchRequest } from './dispatchRequest'
import { InterceptorManager } from './InterceptorManager'
import { mergeConfig } from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export class Axios {
  public interceptors: Interceptors
  public defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }

    this.defaults = initConfig
  }

  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (isString(url)) {
      config = config || {}
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [{ resolved: dispatchRequest }]

    const { request, response } = this.interceptors

    request.forEach((interceptor) => {
      chain.unshift(interceptor)
    })

    response.forEach((interceptor) => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get = <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this._requestMethodWithoutData('get', url, config)

  delete = <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> => this._requestMethodWithoutData('delete', url, config)

  head = <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this._requestMethodWithoutData('head', url, config)

  options = <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> => this._requestMethodWithoutData('options', url, config)

  post = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> => this._requestMethodWithData('post', url, data, config)

  put = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> => this._requestMethodWithData('put', url, data, config)

  patch = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> => this._requestMethodWithData('patch', url, data, config)

  private _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return this.request({
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
    return this.request({
      ...config,
      method,
      url,
      data,
    })
  }
}
