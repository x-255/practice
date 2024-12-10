interface Option {
  value: string
  text: string
}

export function renderSelect(cls: string, options: Option[] = []) {
  let select = document.querySelector(`.${cls}`)
  if (!select) {
    select = document.createElement('select')
    select.className = `${cls} w-30 h-8 m-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`
    document.body.appendChild(select)
  }

  select.innerHTML = [{ value: '', text: '请选择' }, ...options]
    .map((o) => `<option value="${o.value}" class="appearance-none bg-white text-gray-900 p-2">${o.text}</option>`)
    .join('')
}