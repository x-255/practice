import { domRenderOptions, normalizeClass } from './lib/dom'
import { effect, ref } from './lib/effect'
import { Comment, Text, VNode, createRenderer } from './lib/renderer'

const renderer = createRenderer(domRenderOptions)
const app = document.querySelector('#app')!

renderer.render(
  {
    type: Comment,
    children: '111',
  },
  app
)

setTimeout(() => {
  renderer.render(
    {
      type: Comment,
      children: '222',
    },
    app
  )
}, 1000)

// @ts-ignore
// window.data = data
