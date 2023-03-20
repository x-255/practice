import { domRenderOptions, normalizeClass } from './lib/dom'
import { VNode, createRenderer } from './lib/renderer'

const renderer = createRenderer(domRenderOptions)

const vnode: VNode = {
  type: 'div',
  children: [
    {
      type: 'div',
      props: {
        onClick() {
          console.log(111)
        },
      },
      children: '1111',
    },
    {
      type: 'div',
      props: {
        onClick: [
          (e: Event) => {
            console.log(e.target, 222)
          },
          () => {
            console.log(333)
          },
        ],
      },
      children: '2233',
    },
  ],
}

renderer.render(vnode, document.querySelector('#app')!)

// @ts-ignore
// window.data = data
