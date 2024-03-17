import { StateCreator } from 'zustand'

export interface SpinSlice {
  spinning: boolean
  setSpinning: (spinning: boolean) => void
}

export const createSpinSlice: StateCreator<SpinSlice> = (set) => ({
  spinning: false,
  setSpinning: (spinning: boolean) => set({ spinning }),
})
