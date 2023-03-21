import { domRenderOptions, normalizeClass } from './lib/dom'
import { effect, ref } from './lib/effect'
import { VNode, createRenderer } from './lib/renderer'

const bol = ref(false)

const renderer = createRenderer(domRenderOptions)

/**
 * 点击P，P元素的事件处理函数执行
 * ⬇️
 * 副作用函数重新执行
 * ⬇️
 * 渲染器为div元素绑定事件
 * ⬇️
 * div元素的事件处理函数执行
 *
 *
 * 按理说点击P，应该不会触发div的事件处理函数，但他还是执行了，
 * 但由上述过程可以看出是因为更新操作发生在事件冒泡之前，
 * 即为div绑定事件处理函数发生在冒泡之前
 */
effect(() => {
  const vnode: VNode = {
    type: 'div',
    props: bol.value
      ? {
          onClick() {
            console.log('ppppp')
          },
        }
      : {},
    children: [
      {
        type: 'p',
        props: {
          onClick() {
            console.log(111)
            bol.value = true
          },
        },
        children: 'ssss',
      },
    ],
  }

  renderer.render(vnode, document.querySelector('#app')!)
})

// @ts-ignore
// window.data = data
