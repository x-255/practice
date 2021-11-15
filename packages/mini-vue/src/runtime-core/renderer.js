function baseCreateRenderer(options) {
  const render = (vnode, container) => {}

  return {
    createApp: createAppApi(render),
  }
}

export function createRenderer(options) {
  return baseCreateRenderer(options)
}
