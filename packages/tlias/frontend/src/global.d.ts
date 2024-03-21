interface Result<T> {
  code: number
  data: T
  msg: string
}

interface PageBean<T> {
  rows: T[]
  total: number
}
