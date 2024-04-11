export const log = <T>(tag: string | number) => (value: T) => {
  console.log(`${tag}====`, value);
  return value;
}

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}

export const createDragBox = () => {
  const dragBox = document.createElement('div')
  dragBox.className = 'drag-box'
  dragBox.style.width = '50px'
  dragBox.style.height = '50px'
  dragBox.style.background = randomHexColorCode()
  dragBox.style.position = 'absolute'

  document.body.appendChild(dragBox)

  return dragBox
}