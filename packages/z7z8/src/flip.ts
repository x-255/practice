function createItems(n: number) {
  return [...Array(n).keys()]
    .map((i) => `<div class="item">${i + 1}</div>`)
    .join('')
}

function render() {
  const app = document.querySelector('#app')!

  app.innerHTML = `<button id="shuffle">shuffle</button>
    <div class="box">
        ${createItems(10)}
    </div>`

  const style = document.createElement('style')
  style.innerHTML = `
    .box {
        display: grid;
        grid-template-columns: repeat(2, 100px);
        gap: 10px;
        margin-top: 10px;
      }

      .item {
        width: 100px;
        height: 25px;
        background-color: rgb(51, 146, 72);
        margin-top: 5px;
        text-align: center;
        line-height: 25px;
      }
    `
  document.head.appendChild(style)

  app.querySelector('#shuffle')!.addEventListener('click', shuffle)
}
render()

function getLocation(el: Element) {
  return el.getBoundingClientRect()
}

function flip(oldLocation: DOMRect, newLocation: DOMRect, el: Element) {
  // 将元素放到到初始位置再运用动画移动到结束位置
  el.animate(
    [
      {
        transform: `translate(${oldLocation.left - newLocation.left}px, ${
          oldLocation.top - newLocation.top
        }px)`,
      },
      { transform: 'translate(0, 0)' },
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  )
}

function shuffle() {
  const box = document.querySelector('.box')!
  const items = Array.from(box.children)

  items.sort(() => Math.random() - 0.5)
  const locatoins = items.map(getLocation) // 记录初始位置

  items.forEach((item) => box.appendChild(item))
  items.forEach((item, index) => {
    flip(locatoins[index], getLocation(item), item) // 记录结束位置
  })
}

export {}
