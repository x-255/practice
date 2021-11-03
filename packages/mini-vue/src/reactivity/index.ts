const targetMap = new WeakMap()

export function reactive(target: Object) {
  const handler = {
    get(target: Object, key: string | symbol, receiver: any) {
      let value = Reflect.get(target, key, receiver)
      return value
    },
    set(target: Object, key: string | symbol, value: any, receiver: any) {
      let res = Reflect.set(target, key, value, receiver)
      return res
    },
  }
  const p = new Proxy(target, handler)
  return p
}
function track(target: Object, key: string | symbol) {}
function trigger(target: Object, key: string | symbol) {}
