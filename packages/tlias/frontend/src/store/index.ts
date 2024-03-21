import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LoginSlice, createLoginSlice } from './loginSlice'
import { SpinSlice, createSpinSlice } from './spinSlice'

export const useBoundStore = create<LoginSlice & SpinSlice>()(
  persist(
    immer(
      devtools((...a) => ({
        ...createLoginSlice(...a),
        ...createSpinSlice(...a),
      }))
    ),
    {
      name: 'tlias_store',
    }
  )
)
