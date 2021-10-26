import * as snabbdom from 'snabbdom'
import type { VNode } from 'snabbdom'
import { IVNode } from './elements'
import { access } from 'fs'

export type Methods = Record<string, AnyFuncion>
interface ComponentProps {
  template: (props: AnyObject) => IVNode
  methods: Methods
  initialState: AnyObject
}

const patch = snabbdom.init([require('snabbdom').eventListenersModule])

export const init = (selector: string, component: IVNode) => {
  const app = document.querySelector(selector)
  if (!app) return
  patch(app, component.template)
}

export const createComponent = ({ template, methods = {}, initialState = {} }: ComponentProps) => {
  let state = initialState
  let prevNode: IVNode

  const mappedMethods = (props: AnyObject) =>
    Object.keys(methods).reduce(
      (acc: AnyObject, key: string) => ({
        ...acc,
        [key]: (...args: any[]) => {
          state = methods[key](state, ...args)
          const nextNode = template({ ...props, ...state, methods: mappedMethods(props) })
          patch(prevNode.template, nextNode.template)
          prevNode = nextNode

          return state
        },
      }),
      {},
    )

  return (props: any) => (
    (prevNode = template({ ...props, ...state, methods: mappedMethods(props) })), prevNode
  )
}

export * from './elements'
export * from './event'
