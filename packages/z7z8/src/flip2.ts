import img55 from './assets/55.jpg'

function createImgs(n: number, container: Element) {
  for (let i = 0; i < n; i++) {
    const img = document.createElement('img')
    img.src = img55
    container.append(img)

    img.onclick = () => modal(img)
  }
}

function render() {
  const app = document.querySelector('#app') as HTMLElement

  app.style.cssText = `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 1fr;
    gap: 10px;
    padding: 10px;
    background: #eee;
  `

  createImgs(10, app)
}

render()

function modal(rawEl: HTMLElement) {
  const newEl = rawEl.cloneNode() as HTMLElement
  const modal = document.createElement('div')

  modal.append(newEl)
  document.body.append(modal)

  newEl.style.width = '500px'
  newEl.style.height = '500px'

  modal.style.cssText = `
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.5);
  `

  rawEl.style.opacity = '0'
  flip(rawEl, newEl)

  modal.onclick = () => {
    flip(newEl, rawEl)
    modal.remove()
    rawEl.style.opacity = ''
  }
}

function flip(oldEl: Element, newEl: Element) {
  const oldLoc = oldEl.getBoundingClientRect()
  const newLoc = newEl.getBoundingClientRect()

  newEl.animate(
    [
      {
        transformOrigin: '0 0',
        transform: `translate(${oldLoc.left - newLoc.left}px, ${
          oldLoc.top - newLoc.top
        }px) scale(${oldLoc.width / newLoc.width}, ${
          oldLoc.height / newLoc.height
        })`,
      },
      {
        transform: `translate(0, 0) scale(1, 1)`,
      },
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  )
}

export {}
