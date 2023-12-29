import {
  Dispatch,
  applyMiddleware,
  combineReducers,
  createStore,
  legacy_createStore,
} from 'redux'
import { countEpic, countReducer } from './count'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable' // Add this line

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppAction = AppDispatch extends Dispatch<infer A> ? A : never

const rootReducer = combineReducers({
  count: countReducer,
})

const rootEpic = combineEpics(countEpic)

const epicMiddleware = createEpicMiddleware()

// @ts-ignore
const store = legacy_createStore(rootReducer, applyMiddleware(epicMiddleware))

// @ts-ignore
epicMiddleware.run(rootEpic)

export default store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
