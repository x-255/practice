import { VNode, createRenderer } from './lib/renderer'

// 一个用来打印渲染操作流程的自定义渲染器
const render = createRenderer({
  createElement(tag) {
    console.log(`创建元素 ${tag}`)
    return { tag }
  },
  setElement(el, text) {
    console.log(`设置 ${JSON.stringify(el)} 的文本内容: ${text}`)
    el.textContent = text
  },
  inster(el, parent, anchor) {
    console.log(`将 ${JSON.stringify(el)} 添加到 ${JSON.stringify(parent)} 下`)
    parent.children = el
  },
})

const vnode: VNode = {
  type: 'h1',
  children: 'hello',
}
const root = { type: 'root' }

render(vnode, root)

// @ts-ignore
// window.data = data
