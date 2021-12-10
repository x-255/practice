export const onClick = (f: AnyFunction) => ({
  type: 'event',
  click: f,
})
