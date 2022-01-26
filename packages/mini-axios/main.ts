import axios, { AxiosError } from './src'

const url = (path: string) =>
  'https://www.fastmock.site/mock/c93969f677e66693cb4e1fd6b84b20a7/mock' + path

axios
  .get(url('/get'), {
    headers: {
      'response-status': 500,
    },
  })
  .catch((err) => {
    console.log('err===')
    console.dir(err)
  })

axios
  .get(url('/get'), {
    params: {
      a: 111,
      b: 'bbb',
      c: [1, 2],
    },
  })
  .then((gr) => {
    console.log(`gr====`, gr)
  })

axios
  .post(
    url('/post'),
    {
      a: 1,
      b: [3, 4],
    },
    {
      method: 'post',
    },
  )
  .then((pr) => {
    console.log(`pr====`, pr)
  })
