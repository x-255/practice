export {}

function throttle(fn: AnyFunction, wait = 1000) {
  let prev = 0,
    timer: number | null = null

  const later = (ctx: any, args: any[]) => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    prev = +new Date()
    fn.apply(ctx, args)
  }

  return function (this: any, ...args: any[]) {
    const now = +new Date()
    const remaining = wait - (now - prev)
    if (remaining <= 0 || remaining > wait) {
      later(this, args)
    } else if (!timer) {
      timer = window.setTimeout(() => later(this, args), remaining)
    }
  }
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

const onMove1 = throttle(onMove)
document.onmousemove = onMove1
