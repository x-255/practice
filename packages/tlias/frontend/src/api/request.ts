import { useBoundStore } from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: '//localhost:8080',
  withCredentials: true,
})

request.interceptors.request.use((config) => {
  const { token } = useBoundStore.getState()
  if (token) {
    config.headers.token = token
  }
  return config
})

export default request
