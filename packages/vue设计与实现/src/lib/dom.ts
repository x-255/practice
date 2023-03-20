import { RenderOptions, createRenderer } from './renderer'
import { isBoolean, isObject, isOn, isString } from './utils'

export interface Invoker extends EventListener {
  value: Function | Function[]
}

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
  patchProps(
    el: Element & { _vei: Record<string, Invoker | undefined> },
    key,
    prevValue,
    nextValue
  ) {
    // 约定on开头的属性为事件
    if (isOn(key)) {
      const name = key.slice(2).toLowerCase()
      // 定义el._vei为一个对象，存事件名到事件处理函数的映射，vei是vue event invoker的缩写
      const invokers = el._vei || (el._vei = {})
      let invoker = invokers[key]

      if (nextValue) {
        if (!invoker) {
          // 如果没有invoker，则将一个伪造的invoker缓存到_vei[key]中
          invoker = el._vei[key] = ((e) => {
            if (Array.isArray(invoker!.value)) {
              invoker!.value.forEach((fn) => fn(e))
            } else {
              // 当伪造的invoker执行时，会执行真正的事件处理函数
              invoker!.value(e)
            }
          }) as Invoker

          invoker.value = nextValue
          el.addEventListener(name, invoker)
        } else {
          /**
           * 如果invoker存在，只需要更新value的值即可，
           * 不需要移除上一次的事件处理函数，再重新绑定；
           * 在更新事件时可以避免一次removeEventListener的调用，从而提升了性能。
           */
          invoker.value = nextValue
        }
      } else if (invoker) {
        // 新的事件绑定函数不存在，且之前绑定的invoker存在，则移除绑定。
        el.removeEventListener(name, invoker)
      }
    } else if (key === 'class') {
      /**
       * 为元素设置class有三种方式，按性能从高到低：
       * className > classList > setAttribute
       */
      el.className = nextValue ?? ''
    } else if (shouldSetProps(el, key, nextValue)) {
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

/**
 * 序列化class，
 * class可能的值有以下类型：
 * 1. 字符串：'foo bar'
 * 2. 对象： {foo: true, bar: false}
 * 3. 包含上面两种类型的数组： ['foo bar', {baz: true}]
 */
export function normalizeClass(value: unknown) {
  let res = ''

  if (isString(value)) {
    res = value
  } else if (Array.isArray(value)) {
    res = value.map(normalizeClass).join(' ')
  } else if (isObject(value)) {
    res = Object.entries(value)
      .filter(([_, v]) => !!v)
      .map(([k, _]) => k)
      .join(' ')
  }

  return res.trim()
}
