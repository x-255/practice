export function renderCalculatePage() {
  const container = document.createElement('div')
  container.className = `h-dvh flex items-center justify-center gap-2`
  renderInput('a', container)
  renderSelect(container)
  renderInput('b', container)
  rendeRequalSign(container)
  renderResult(container)
  document.body.appendChild(container)
}

function renderInput(cls: string, container: HTMLElement) {
  const inp = document.createElement('input')
  inp.className = `${cls} h-8 border border-solid border-gray-400 rounded-md px-2 py-1 outline-none focus:border-gray-800`
  inp.type = 'number'
  container.appendChild(inp)
}

function renderSelect(container: HTMLElement) {
  const select = document.createElement('select')
  select.className = `type h-8 border border-solid border-gray-400 rounded-md px-2 py-1 outline-none focus:border-gray-800`
  select.innerHTML = `
    <option value="plus">+</option>
    <option value="decrease">-</option>
    <option value="multiply">*</option>
    <option value="divide">/</option>
  `
  
  
  
  
  container.appendChild(select)
}

function rendeRequalSign(container: HTMLElement) {
  const equal = document.createElement('div')
  equal.className = `color-gray-400`
  equal.innerText = '='
  container.appendChild(equal)
}

function renderResult(container: HTMLElement) {
  const result = document.createElement('div')
  result.className = `result min-w-8 h-8 border border-solid border-gray-400 rounded-md px-2 py-1`
  container.appendChild(result)
}