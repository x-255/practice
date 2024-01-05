import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { PointAction, gameEpics, gameReducer } from '../features/gameSlice'

const epicMiddleware = createEpicMiddleware<PointAction>()
const rootEpic = combineEpics(gameEpics)

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
  devTools: true,
})

epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
