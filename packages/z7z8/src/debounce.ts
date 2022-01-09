interface Debounced {
  (...args: any[]): any
  cancel(): void
}

function debounce(fn: AnyFunction, wait = 1000, immediate = false) {
  let timer: number | undefined

  function debounced(this: any, ...args: any[]) {
    const run = fn.bind(this, args)

    if (!timer && immediate) {
      run()
    }

    clearTimeout(timer)
    timer = window.setTimeout(run, wait)
  }

  ;(debounced as Debounced).cancel = () => {
    clearTimeout(timer)
    timer = undefined
  }

  return debounced as Debounced
}

const text = document.createElement('div')
const ts = text.style
ts.position = 'fixed'
ts.top = '10px'
ts.right = '10px'
document.body.append(text)

let count = 0
function onMove(e: MouseEvent) {
  console.log(e)
  count++
  text.textContent = String(count)
}

const onMove1 = debounce(onMove, 10000, true)
setTimeout(() => {
  onMove1.cancel()
}, 2000)
document.onmousemove = onMove1
