type AnyObject = Record<PropertyKey, any>

type AnyFunction = (...args: any[]) => any

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.gif' {
  const value: string
  export default value
}
