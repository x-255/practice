function patchClass(el, value) {
  el.className = value ? value : ''
}

function patchStyle(el, prev, next) {
  if (!next) {
    el.removeAttribute('style')
  } else {
    const style = el.style
    for (let key in next) {
      style[key] = next[key]
    }
    if (prev) {
      for (let key in prev) {
        if (!prev[key]) {
          prev[key] = ''
        }
      }
    }
  }
}

function patchAttr(el, key, value) {
  if (!value) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, value)
  }
}

export function patchProp(el, key, prevValue, nextValue) {
  switch (key) {
    case 'class':
      patchClass(el, nextValue)
      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break
    default:
      patchAttr(el, key, nextValue)
  }
}
