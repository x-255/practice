import request from './request'

export interface Dept {
  id: number
  name: string
  createTime: Date
  updateTime: Date
}

export const getDepts = () => request.get<Result<Dept[]>>('/depts')

export const addDept = (data: Dept) =>
  request.post<Result<null>>('/depts', data)

export const updateDept = (data: Dept) =>
  request.put<Result<null>>('/depts', data)

export const deleteDept = (id: number) =>
  request.delete<Result<null>>(`/depts/${id}`)
