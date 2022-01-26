import { Axios } from './core/Axios'
import { extend } from './helpers'

function createInstance() {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  return extend(instance, context)
}

export const axios = createInstance()
