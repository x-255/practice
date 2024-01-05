import {
  Action,
  PayloadAction,
  createAction,
  createSlice,
} from '@reduxjs/toolkit'
import { Point, calculateAngle } from '../utils/formulas'
import { Observable, filter, map, throttleTime } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'

interface GameState {
  angle: number
}

export interface PointAction extends Action {
  payload: Point
}

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    angle: 45,
  } as GameState,
  reducers: {
    moveObjects(state, action: PayloadAction<Point>) {
      const { x, y } = action.payload
      state.angle = calculateAngle(0, 0, x, y)
    },
  },
})

export const moveObjectsByThrottle = createAction<Point>(
  'game/moveObjectsByThrottle'
)

export const { moveObjects } = gameSlice.actions

export const gameReducer = gameSlice.reducer

const moveObjectsEpic: Epic<PointAction, PointAction, void, any> = (action$) =>
  action$.pipe(
    filter(moveObjectsByThrottle.match),
    throttleTime(10),
    map(({ payload }) => moveObjects(payload))
  )

export const gameEpics = combineEpics(moveObjectsEpic)
