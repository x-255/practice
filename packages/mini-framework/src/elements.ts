import { h, VNode, On } from 'snabbdom'

export interface IVNode {
  type: string
  template: VNode
}

interface IState {
  template: string
  on: On
}

const initialState = {
  template: '',
  on: {},
}

const createReducer =
  (args: any[]) =>
  (acc: IState, currStr: string, index: number): IState => {
    const currArg = args[index]

    if (currArg?.type === 'event')
      return {
        ...acc,
        on: {
          click: currArg.click,
        },
      }

    return {
      ...acc,
      template: acc.template + currStr + (currArg ?? ''),
    }
  }

const createElement =
  (tagName: string) =>
  (strings: TemplateStringsArray, ...args: any[]): IVNode => {
    const { template, on } = strings.reduce(createReducer(args), initialState)

    return {
      type: 'element',
      template: h(tagName, { on }, template),
    }
  }

export const div = createElement('div')
export const p = createElement('p')
export const span = createElement('span')
export const button = createElement('button')
