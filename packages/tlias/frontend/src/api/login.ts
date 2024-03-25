import request from './request'

export interface LoginData {
  username: string
  password: string
}

export const login = (data: LoginData) =>
  request.post<Result<string>>('/login', data)
