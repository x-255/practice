export const renderChatPage = () => {
  const container = document.createElement('div')
  container.className = 'w-full h-full flex'

  document.body.appendChild(container)
  renderChatBox(container, 'xx')
  renderChatBox(container, 'yy')
}

function renderChatBox(container: HTMLDivElement, id: string) {
  const chatBox = document.createElement('div')
  chatBox.innerHTML = `
    <div class="flex mb-2">
      <div class="w-8 h-4 border bg-lime-500">上线</div>
    </div>
  `
  chatBox.className = `${id} p-4 flex-1`
  container.appendChild(chatBox)
}
