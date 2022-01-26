import { isContentType } from '../helpers'
import { createError } from '../helpers/error'
import { parseResponseHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data,
      headers,
      responseType,
      timeout = 0,
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.timeout = timeout

    request.open(method.toUpperCase(), url!, true)

    const handleResponse = (response: AxiosResponse) =>
      response.status >= 200 && response.status < 300
        ? resolve(response)
        : reject(
            reject(
              createError(
                `Request failed with status code ${response.status}`,
                config,
                null,
                request,
                response,
              ),
            ),
          )

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseResponseHeaders(
        request.getAllResponseHeaders(),
      )
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        request,
        config,
      }

      handleResponse(response)
    }

    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = () => {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request,
        ),
      )
    }

    setRequestHeader(headers, data, request)
    request.send(data)
  })
}

function setRequestHeader(headers: any, data: any, request: XMLHttpRequest) {
  Object.keys(headers).forEach((name) => {
    if (data === null && isContentType(name)) {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
}
