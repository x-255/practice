import {
  Action,
  PayloadAction,
  createAction,
  createSlice,
} from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import { Observable, filter, map, throttleTime } from 'rxjs'
import {
  createInterval,
  flyingObjectsStarterPositions,
  flyingObjectsStarterYAxis,
  maxFlyingObjects,
} from '../utils/constants'
import { Point, calculateAngle } from '../utils/formulas'

interface FlyingObject {
  position: Point
  createdAt: number
  id: number
}
interface GameState {
  started: boolean
  kills: number
  lives: number
  flyingObjects: FlyingObject[]
  lastObjectCreatedAt: number
}
interface State {
  angle: number
  gameState: GameState
}

const initialGameState: GameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  lastObjectCreatedAt: new Date().getTime(),
}

export interface PointAction extends Action {
  payload: Point
}

const createFlyingObjects = (state: State) => {
  if (!state.gameState.started) return state // game not running

  const now = new Date().getTime()
  const { lastObjectCreatedAt, flyingObjects } = state.gameState
  const createNewObject =
    now - lastObjectCreatedAt > createInterval &&
    flyingObjects.length < maxFlyingObjects

  if (!createNewObject) return state // no need to create objects now

  const id = new Date().getTime()
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects)
  const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition]
  const newFlyingObject: FlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis,
    },
    createdAt: new Date().getTime(),
    id,
  }

  state.gameState.lastObjectCreatedAt = new Date().getTime()
  state.gameState.flyingObjects.push(newFlyingObject)
}

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    angle: 45,
    gameState: initialGameState,
  } as State,
  reducers: {
    moveObjects(state, action: PayloadAction<Point>) {
      const { x = 0, y = 0 } = action.payload
      state.angle = calculateAngle(0, 0, x, y)
      createFlyingObjects(state)

      const now = new Date().getTime()
      state.gameState.flyingObjects = state.gameState.flyingObjects.filter(
        (obj) => now - obj.createdAt < 4000
      )
    },
    startGame(state) {
      state.gameState = {
        ...initialGameState,
        started: true,
      }
    },
  },
})

export const moveObjectsByThrottle = createAction<Point>(
  'game/moveObjectsByThrottle'
)

export const moveAndCreateObjects = createAction<Point>(
  'game/moveAndCreateObjects'
)

export const { moveObjects, startGame } = gameSlice.actions

export const gameReducer = gameSlice.reducer

const moveObjectsEpic = (action$: Observable<PointAction>) =>
  action$.pipe(
    filter(moveObjectsByThrottle.match),
    throttleTime(10),
    map(({ payload }) => moveObjects(payload))
  )

export const gameEpics = combineEpics(moveObjectsEpic)
