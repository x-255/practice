import { Tuple, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { counterEpic, counterReducer } from './counterSlice'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const rootEpic = combineEpics(counterEpic)
const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: () => new Tuple(epicMiddleware),
})

epicMiddleware.run(rootEpic as any)

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
