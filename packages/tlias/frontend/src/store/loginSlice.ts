import { StateCreator } from 'zustand'

export interface LoginSlice {
  isLogin: boolean
  setLogin: (isLogin: boolean) => void
}

export const createLoginSlice: StateCreator<LoginSlice> = (set) => ({
  isLogin: false,
  setLogin: (isLogin: boolean) => set({ isLogin }),
})
