import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import { mergeDeepRight } from 'ramda'
const config = yaml.load(
  readFileSync(join(__dirname, '../config.yml'), 'utf8')
) as Record<string, any>
console.log(config)
const envConfig = yaml.load(
  readFileSync(join(__dirname, `../config.${process.env.NODE_ENV || 'development'}.yml`), 'utf8')
) as Record<string, any>

export default () => {
  return mergeDeepRight(config, envConfig) as Record<string, any>
}
