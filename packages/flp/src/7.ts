/*
 * @Description:闭包 vs 对象
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2022-02-21 17:13:37
 */

/* function trackEvent(evt, keypresses = []) {
  return keypresses.concat(evt)
}

var keypresses = trackEvent('newEvent1')

keypresses = trackEvent('newEvent2', keypresses) */

function trackEvent(evt, keypresses = () => [] as any[]) {
  return function newKeypresses() {
    return [...keypresses(), evt]
  }
}

var keypresses = trackEvent('newEvent1')

keypresses = trackEvent('newEvent2', keypresses)

// console.log(keypresses())

function trackEvent1(
  evt,
  keypresses = {
    list: () => [] as any[],
    forEach(fn) {},
  }
) {
  return {
    list() {
      return [...keypresses.list(), evt]
    },
    forEach(fn) {
      keypresses.forEach(fn)
      fn(evt)
    },
  }
}

var keypresses1 = trackEvent1('newEvent1')

keypresses1 = trackEvent1('newEvent2', keypresses1)

const output = console.log

keypresses1.forEach(output)
