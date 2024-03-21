import request from './request'

export interface Emp {
  id: number
  username: string
  password: string
  name: string
  gender: number
  image: string
  job: number
  deptId: number
  entrydate: string
  createTime: string
  updateTime: string
}

export interface GetEmpsQuery {
  name?: string
  gender?: number
  begin?: string
  end?: string
  page: number
  pageSize: number
}

export const getEmps = (query: GetEmpsQuery) =>
  request.get<Result<PageBean<Emp>>>('/emps', { params: query })
