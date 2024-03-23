import { BaseOptionType } from 'antd/es/select'
import { filter, keys, map, pipe, tap, test } from 'ramda'
import { log, renameKey } from '.'
import dayjs, { Dayjs } from 'dayjs'
import { DATE_FORMAT } from '@/constant/date'

export const enums2options = (enums: AnyObject): BaseOptionType[] => {
  return pipe(
    keys,
    filter(test(/^\d+$/)),
    map((value) => ({
      value: +value,
      label: enums[value],
    }))
  )(enums)
}

export const list2options = <
  T extends object,
  V extends keyof T,
  L extends keyof T
>(
  valueKey: V,
  labelKey: L,
  list: T[]
) =>
  map(
    pipe(
      (item: T) => renameKey(valueKey, 'value', item),
      (item) => renameKey(labelKey as any, 'label', item)
    )
  )(list) as BaseOptionType[]

export const formatDate = (date: string | Dayjs) =>
  dayjs(date).format(DATE_FORMAT)

export const parseDate = (date: string | Dayjs) => dayjs(date, DATE_FORMAT)
