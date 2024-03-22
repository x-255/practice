import { BaseOptionType } from 'antd/es/select'
import { map, pipe } from 'ramda'
import { renameKey } from '.'

export const enums2options = (enums: object): BaseOptionType[] => {
  return Object.entries(enums).map(([value, label]) => ({
    value,
    label,
  }))
}



export const list2options = <T extends object, K extends keyof T, V extends keyof T>(valueProp: V,labelProp: K,  list: T[]) => map(pipe(
  renameKey(valueProp, 'value'),
  renameKey(labelProp, 'label'),
))(list)