import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Point, calculateAngle } from '../utils/formulas'

interface GameState {
  angle: number
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

export const { moveObjects } = gameSlice.actions

export const gameReducer = gameSlice.reducer
