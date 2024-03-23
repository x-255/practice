import axios from 'axios'

const request = axios.create({
  baseURL: '//localhost:8080',
  withCredentials: true,
})

export default request
