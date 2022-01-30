import { deepMerge, isPlainObject } from '../helpers'
import { AxiosRequestConfig } from '../types'

export function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig,
) {
  config2 = config2 || {}
  const config: AxiosRequestConfig = {}
  const strats = getStrats()

  Object.keys(config2).forEach(mergeField)

  Object.keys(config1).forEach((key) => {
    if (!config2![key]) {
      mergeField(key)
    }
  })

  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}

function getStrats() {
  const strats = Object.create(null)

  ;(<const>['url', 'params', 'data']).forEach(
    (key) => (strats[key] = fromVal2Strat),
  )
  ;(<const>['headers', 'auth']).forEach((key) => (strats[key] = deepMergeStrat))

  return strats
}

function defaultStrat(val1: any, val2: any) {
  return val2 !== undefined ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any) {
  return val2
}

function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (val2 !== undefined) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}
