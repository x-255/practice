import { create } from 'zustand'
import { LoginSlice, createLoginSlice } from './loginSlice'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { partial, pick } from 'ramda'
import { SpinSlice, createSpinSlice } from './spinSlice'

const useBoundStore = create<LoginSlice & SpinSlice>()(
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

export const useLoginStore = partial<LoginSlice>(useBoundStore, [
  pick(['isLogin', 'setLogin']),
])

export const useSpinStore = partial<SpinSlice>(useBoundStore, [
  pick(['spinning', 'setSpinning']),
])
