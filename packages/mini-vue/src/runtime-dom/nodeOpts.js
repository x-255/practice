export const nodeOpts = {
  createElement(type) {
    return document.createElement(type)
  },
  setElementText(el, text) {
    el.contentText = text
  },
  insert(child, parent, anchor = null) {
    parent.insertBefore(child, anchor)
  },
  remove(el) {
    el.remove()
  },
}
