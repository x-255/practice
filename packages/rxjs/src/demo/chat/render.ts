export const renderChatPage = () => {
  const container = document.createElement('div')
  container.className = 'w-full h-dvh bg-slate-500 flex'

  document.body.appendChild(container)
  renderChatBox(container, 'xx')
  renderChatBox(container, 'yy')
}

function renderChatBox(container: HTMLDivElement, id: string) {
  const chatBox = document.createElement('div')
  chatBox.innerHTML = `
    <div class="flex gap-2 mb-2">
      ${getButton('bg-lime-400 online', '上线')}
      ${getButton('bg-red-400 offline', '下线')}
      ${getButton('bg-sky-400 send', '发送')}
    </div>
    <div class="my-3 flex items-center color-white">
      状态：
      <span class="status">在线</span>
    </div>
  `
  chatBox.className = `${id} p-4 flex-1`
  container.appendChild(chatBox)
}

function getButton(cls: string, text: string) {
  return `<div class="h-8 px-4 border leading-8 rounded cursor-pointer hover:opacity-70 active:brightness-90 text-white ${cls}">${text}</div>`
}