import * as snabbdom from 'snabbdom'
import type { VNode } from 'snabbdom'
import { IVNode } from './elements'

type Methods = Record<string, AnyFuncion>
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

export const createComponent =
  ({ template, methods = {}, initialState = {} }: ComponentProps) =>
  (props: AnyObject) =>
    template(props)

export * from './elements'
export * from './event'
