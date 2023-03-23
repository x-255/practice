import { domRenderOptions, normalizeClass } from './lib/dom'
import { effect, ref } from './lib/effect'
import { Comment, Fragment, Text, VNode, createRenderer } from './lib/renderer'

const renderer = createRenderer(domRenderOptions)
const app = document.querySelector('#app')!

renderer.render(
  {
    type: 'ul',
    children: [
      {
        type: Fragment,
        children: [
          { type: 'li', children: '1' },
          { type: 'li', children: '2' },
          { type: 'li', children: '3' },
          { type: 'li', children: '4' },
        ],
      },
    ],
  },
  app
)

setTimeout(() => {
  renderer.render(
    {
      type: 'ul',
      children: [
        {
          type: Fragment,
          children: [
            { type: 'li', children: '5' },
            { type: 'li', children: '4' },
            { type: 'li', children: '3' },
          ],
        },
      ],
    },
    app
  )
}, 800)

// @ts-ignore
// window.data = data
