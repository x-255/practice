import { domRenderOptions, normalizeClass } from './lib/dom'
import { VNode, createRenderer } from './lib/renderer'

const render = createRenderer(domRenderOptions)

const vnode: VNode = {
  type: 'div',
  props: {
    class: normalizeClass(['foo bar', [{ baz: true }]]),
  },
  children: [
    {
      type: 'p',
      props: {
        id: 'pp',
      },
      children: 'hello',
    },
    {
      type: 'input',
      props: {
        type: 'text',
        value: 'world',
        disabled: '',
      },
    },
  ],
}

render(vnode, document.querySelector('#app')!)

// @ts-ignore
// window.data = data
