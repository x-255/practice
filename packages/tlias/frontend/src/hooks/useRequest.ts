import { NOT_LOGIN } from '@/constant/api'
import { useBoundStore } from '@/store'
import { message } from 'antd'
import { AxiosPromise } from 'axios'
import { pick } from 'ramda'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Options {
  manual?: boolean
  defaultParams?: any[]
}

const useRequest = <T, A>(
  api: (...args: A[]) => AxiosPromise<Result<T>>,
  options: Options = {}
) => {
  const { manual = false, defaultParams = [] } = options

  const [data, setData] = useState<T>()
  const navigate = useNavigate()
  const { setToken, setSpinning } = useBoundStore(
    pick(['setToken', 'setSpinning'])
  )

  const run = async (...args: A[]) => {
    setSpinning(true)
    try {
      const {
        data: { code, data, msg },
      } = await api(...args)

      if (msg === NOT_LOGIN) {
        setToken('')
        navigate('/login')
        message.error('用户未登录或登陆已过期，请重新登陆')
        return
      }

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
