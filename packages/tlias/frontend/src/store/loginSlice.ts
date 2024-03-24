import { StateCreator } from 'zustand'

export interface LoginSlice {
  token: string
  setToken: (token: string) => void
}

export const createLoginSlice: StateCreator<LoginSlice> = (set) => ({
  token: '',
  setToken: (token: string) => set({ token }),
})
