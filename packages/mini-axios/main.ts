import axios, { AxiosError } from './src'

const url = (path: string) =>
  'https://www.fastmock.site/mock/c93969f677e66693cb4e1fd6b84b20a7/mock' + path

const instance1 = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/c93969f677e66693cb4e1fd6b84b20a7/mock',
  headers: {
    NLRX: 'Hello NLRX',
  },
})

const instance2 = axios.create({
  headers: {
    test: '123',
  },
})

instance1.get('/get', { params: { a: 1, b: 2 } })

instance2.post(url('/post'))
