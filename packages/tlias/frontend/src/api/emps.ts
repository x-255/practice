import { Dayjs } from 'dayjs'
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
  entrydate: string | Dayjs
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

export const addEmp = (data: Emp) => request.post<Result<null>>('/emps', data)

export const updateEmp = (data: Emp) => request.put<Result<null>>('/emps', data)

export const deleteEmp = (ids: number[]) =>
  request.delete<Result<null>>(`/emps/${ids.join(',')}`)
