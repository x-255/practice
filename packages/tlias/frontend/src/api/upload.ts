import request from './request'

export const upload = (file: any) =>
  request.post<Result<string>>(
    '/upload',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
