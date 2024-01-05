import { MouseEventHandler, useEffect, useState } from 'react'
import { Canvas } from './components/Canvas'
import { getCanvasPosition } from './utils/formulas'
import { useAppDispatch } from './app/hooks'
import { moveObjects } from './features/gameSlice'

function App() {
  return <Canvas></Canvas>
}

export default App
