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
  gameHeight,
  maxFlyingObjects,
} from '../utils/constants'
import {
  Point,
  calculateAngle,
  calculateNextPosition,
  checkCollision,
} from '../utils/formulas'

interface FlyingObject {
  position: Point
  createdAt: number
  id: number
}

interface CannonBall {
  id: number
  angle: number
  position: Point
}

interface GameState {
  started: boolean
  kills: number
  lives: number
  lastObjectCreatedAt: number
  flyingObjects: FlyingObject[]
  cannonBalls: CannonBall[]
}

const initialGameState: GameState = {
  started: false,
  kills: 0,
  lives: 3,
  flyingObjects: [],
  cannonBalls: [],
  lastObjectCreatedAt: new Date().getTime(),
}

interface State {
  angle: number
  gameState: GameState
}

export interface PointAction extends Action {
  payload: Point
}

export interface ObjectsDestroyed {
  cannonBallId: number
  flyingDiscId: number
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

const moveCannonBalls = (cannonBalls: CannonBall[]) =>
  cannonBalls
    .filter(({ position: { x, y } }) => y > -800 && x > -500 && x < 500)
    .map((cannonBall) => {
      const { x, y } = cannonBall.position
      const { angle } = cannonBall
      return {
        ...cannonBall,
        position: calculateNextPosition(x, y, angle, 5),
      }
    })

const checkCollisions = (
  cannonBalls: CannonBall[],
  flyingDiscs: FlyingObject[]
) => {
  const objectsDestroyed: ObjectsDestroyed[] = []
  flyingDiscs.forEach((flyingDisc) => {
    const currentLifeTime = new Date().getTime() - flyingDisc.createdAt
    const calculatedPosition = {
      x: flyingDisc.position.x,
      y: flyingDisc.position.y + (currentLifeTime / 4000) * gameHeight,
    }
    const rectA = {
      x1: calculatedPosition.x - 40,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + 40,
      y2: calculatedPosition.y + 10,
    }
    cannonBalls.forEach((cannonBall) => {
      const rectB = {
        x1: cannonBall.position.x - 8,
        y1: cannonBall.position.y - 8,
        x2: cannonBall.position.x + 8,
        y2: cannonBall.position.y + 8,
      }
      if (checkCollision(rectA, rectB)) {
        objectsDestroyed.push({
          cannonBallId: cannonBall.id,
          flyingDiscId: flyingDisc.id,
        })
      }
    })
  })
  return objectsDestroyed
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

      const { gameState } = state
      const now = new Date().getTime()
      const flyingObjects = gameState.flyingObjects.filter(
        (obj) => now - obj.createdAt < 4000
      )

      const cannonBalls = moveCannonBalls(gameState.cannonBalls)

      const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects)
      const cannonBallsDestroyed = objectsDestroyed.map(
        (object) => object.cannonBallId
      )
      const flyingDiscsDestroyed = objectsDestroyed.map(
        (object) => object.flyingDiscId
      )

      gameState.cannonBalls = cannonBalls.filter(
        (cannonBall) => !cannonBallsDestroyed.includes(cannonBall.id)
      )
      gameState.flyingObjects = flyingObjects.filter(
        (flyingDisc) => !flyingDiscsDestroyed.includes(flyingDisc.id)
      )
    },
    startGame(state) {
      state.gameState = {
        ...initialGameState,
        started: true,
      }
    },
    shoot(
      { gameState: { started, cannonBalls } },
      action: PayloadAction<Point>
    ) {
      if (!started || cannonBalls.length === 2) return

      const { x, y } = action.payload
      const angle = calculateAngle(0, 0, x, y)
      const id = new Date().getTime()
      const cannonBall: CannonBall = {
        id,
        angle,
        position: { x: 0, y: 0 },
      }

      cannonBalls.push(cannonBall)
    },
  },
})

export const moveObjectsByThrottle = createAction<Point>(
  'game/moveObjectsByThrottle'
)

export const moveAndCreateObjects = createAction<Point>(
  'game/moveAndCreateObjects'
)

export const { moveObjects, startGame, shoot } = gameSlice.actions

export const gameReducer = gameSlice.reducer

const moveObjectsEpic = (action$: Observable<PointAction>) =>
  action$.pipe(
    filter(moveObjectsByThrottle.match),
    throttleTime(10),
    map(({ payload }) => moveObjects(payload))
  )

export const gameEpics = combineEpics(moveObjectsEpic)
