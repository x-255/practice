import { createRenderer } from '../runtime-core'
import { nodeOpts } from './nodeOpts'
import { patchProp } from './patchProp'

const renderOptions = { ...nodeOpts, patchProp }

function ensureRenderer() {
  return createRenderer(renderOptions)
}

export function createApp(rootComponent) {
  const app = ensureRenderer().createApp(rootComponent)

  const { mount } = app
  app.mount = (container) => {
    container = document.querySelector(container)
    container.innerHtml = ''
    mount(container)
  }
  return app
}
