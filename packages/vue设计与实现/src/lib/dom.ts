import { RenderOptions, createRenderer } from './renderer'

const domRenderOptions: RenderOptions<Node, Element> = {
  createElement(tag) {
    return document.createElement(tag)
  },
  setElement(el, text) {
    el.textContent = text
  },
  inster(el, parent, anchor) {
    parent.insertBefore(el, anchor ? anchor : null)
  },
}

export const renderer = createRenderer(domRenderOptions)
