import { Action } from 'redux'
import { Epic, ofType } from 'redux-observable'
import { Observable, delay, map } from 'rxjs'
import { AppAction } from '.'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC'
export const DECREMENT_ASYNC = 'DECREMENT_ASYNC'

export const increment = (payload: number) => ({ type: INCREMENT, payload })
export const decrement = (payload: number) => ({ type: DECREMENT, payload })
export const incrementAsync = (payload: number) => ({
  type: INCREMENT_ASYNC,
  payload,
})
export const decrementAsync = (payload: number) => ({
  type: DECREMENT_ASYNC,
  payload,
})

export const countReducer = (
  state = 0,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload
    case DECREMENT:
      return state - action.payload
    default:
      return state
  }
}

export const countEpic: Epic<AppAction> = (action$) =>
  action$.pipe(
    ofType(INCREMENT_ASYNC),
    delay(1000),
    // @ts-ignore
    map((action) => increment(action.payload))
  )
