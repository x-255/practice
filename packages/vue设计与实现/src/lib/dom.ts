import { RenderOptions, createRenderer } from './renderer'
import { isBoolean } from './utils'

export const domRenderOptions: RenderOptions<Node, Element> = {
  createElement(tag) {
    return document.createElement(tag)
  },
  setElement(el, text) {
    el.textContent = text
  },
  inster(el, parent, anchor) {
    parent.insertBefore(el, anchor ? anchor : null)
  },
  patchProps(el, key, prevValue, nextValue) {
    if (shouldSetProps(el, key, nextValue)) {
      /**
       * 如果直接在html上添加attr但不设置值，浏览器会默认将它的prop设为true，这一切都是浏览器处理好的，
       * 但在vnode中，需要手动处理；
       * 如果是布尔类型，切值是空字符串时，浏览器会将它矫正为布尔类型的false，相当于el[key] = false.
       * 这违背了用户本意，用户是希望禁用按钮，而el[key] = false是不禁用。
       */
      if (isBoolean(el[key]) && nextValue === '') {
        // 如果是布尔类型，并且是空字符串，则将值矫正为true
        ;(el as any)[key] = true
      } else {
        ;(el as any)[key] = nextValue
      }
    } else {
      // 如果没有对应的 DOM Properties，则用setAttribute设置属性
      el.setAttribute(key, nextValue)
    }
  },
}

/**
 * 判断是否应该作为 DOM Properties 设置
 */
function shouldSetProps(
  el: Element,
  key: string,
  value: any
): key is keyof Element {
  if (el.tagName === 'INPUT' && key === 'form') return false

  return key in el
}
