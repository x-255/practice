interface Action<T> {
  payload?: T
  type: string
}

class EffectModule {
  count = 1
  message = 'hello!'

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }))
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    }
  }
}

type SwitchModule<P> = {
  [K in keyof P as P[K] extends Function ? K : never]: P[K] extends (
    input: Promise<infer T>,
  ) => Promise<Action<infer U>>
    ? (input: T) => Action<U>
    : P[K] extends (action: Action<infer T>) => Action<infer U>
    ? (action: T) => Action<U>
    : never
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => SwitchModule<EffectModule>

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
})

type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}

export const connected: Connected = connect(new EffectModule())
