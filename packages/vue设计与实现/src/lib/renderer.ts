import { isString } from './utils'

interface RendererNode {
  [k: string]: any
}

interface RendererElement extends RendererNode {}

export interface RenderOptions<N = RendererNode, E = RendererElement> {
  // 创建元素
  createElement(tag: string): E
  // 设置元素的文本节点
  setElement(el: E, text: string): void
  // 在给定的parent下添加指定元素
  inster(el: N, parent: E, anchor?: N | null): void
}

type VNodeType = string

export interface VNode {
  type: VNodeType
  children: string | VNode | Array<string | VNode>
}

// 不直接依赖于浏览器特有的API，只要传入不同的配置项，就能够完成非浏览器环境下的渲染工作
export function createRenderer(options: RenderOptions) {
  const { createElement, setElement, inster } = options

  function mountedElement(vnode: VNode, container: RendererElement) {
    const el = createElement(vnode.type)

    if (isString(vnode.children)) {
      setElement(el, vnode.children)
    }

    inster(el, container)
  }

  /**
   * @param n1 旧vnode
   * @param n2 新vnode
   */
  function patch(n1: VNode | null, n2: VNode, container: RendererElement) {
    if (!n1) {
      // n1不存在，意味着挂载，直接调用mountedElement完成
      mountedElement(n2, container)
    } else {
      // n1存在，意味着打补丁
    }
  }

  function render(vnode: VNode, container: RendererElement) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      /**
       * 旧vnode存在，新vnode不存在，说明时卸载（unmount）操作，
       * 只需要将container内的DOM清空即可
       */
      if (container._vnode) {
        container.innerHTML = ''
      }
    }

    container._vnode = vnode
  }

  return render
}
