import axios, { AxiosError } from './src'

const url = (path: string) =>
  'https://www.fastmock.site/mock/c93969f677e66693cb4e1fd6b84b20a7/mock' + path

/* axios.interceptors.request.use((config) => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use((config) => {
  console.log(`config====`, config)
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use((res) => {
  res.data.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use((res) => {
  res.data.data += '2'
  return res
})
axios.interceptors.response.use((res) => {
  res.data.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor) */

axios
  .post(url('/post'), {
    headers: { test: 'test' },
  })
  .then((res) => {
    console.log(res.data)
  })
