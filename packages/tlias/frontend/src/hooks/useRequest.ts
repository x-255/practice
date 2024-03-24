import request from '@/api/request'
import { useBoundStore } from '@/store'
import { message } from 'antd'
import { AxiosPromise } from 'axios'
import { useEffect, useState } from 'react'

export interface Options {
  manual?: boolean
  defaultParams?: any[]
}

const useRequest = <T, A>(
  api: (...args: A[]) => AxiosPromise<Result<T>>,
  options: Options = {}
) => {
  const { manual = false, defaultParams = [] } = options

  const setSpinning = useBoundStore((s) => s.setSpinning)
  const [data, setData] = useState<T>()
  const toekn = useBoundStore((s) => s.token)

  request.interceptors.request.use((config) => {
    if (toekn) {
      config.headers.token = toekn
    }
    return config
  })

  const run = async (...args: A[]) => {
    setSpinning(true)
    try {
      const {
        data: { code, data, msg },
      } = await api(...args)

      if (code === 0) {
        message.error(msg)
        return
      }

      if (!data) {
        message.success(msg)
        return
      }

      setData(data)
      return data
    } catch (err: any) {
      if (err.message) message.error(err.message)
    } finally {
      setSpinning(false)
    }
  }

  useEffect(() => {
    if (!manual) {
      run(...defaultParams)
    }
  }, [])

  return { data, run }
}

export default useRequest
