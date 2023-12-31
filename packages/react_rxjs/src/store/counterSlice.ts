import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import { Observable, delay, filter, map, merge } from 'rxjs'

export interface CounterState {
  value: number
}

type CounterEpic = Epic<UnknownAction, UnknownAction, CounterState>

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  } as CounterState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
    increamentAsync() {},
    incrementByAmountAsync(state, action: PayloadAction<number>) {},
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  increamentAsync,
  incrementByAmountAsync,
} = counterSlice.actions

export const counterReducer = counterSlice.reducer

const increamentEpic = (action$: Observable<UnknownAction>) =>
  action$.pipe(
    filter(increamentAsync.match),
    delay(1000),
    map(() => increment())
  )

const incrementByAmountEpic = (actions$: Observable<PayloadAction<number>>) =>
  actions$.pipe(
    filter(incrementByAmountAsync.match),
    delay(1000),
    map((action) => incrementByAmount(action.payload))
  )

export const counterEpic = (
  action$: Observable<UnknownAction | PayloadAction<number>>
) =>
  merge(
    increamentEpic(action$),
    incrementByAmountEpic(action$ as Observable<PayloadAction<number>>)
  )
