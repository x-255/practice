import { MouseEventHandler, useEffect, useState } from 'react'
import { Canvas } from './components/Canvas'
import { getCanvasPosition } from './utils/formulas'
import { useAppDispatch } from './app/hooks'
import { moveObjects } from './features/gameSlice'

function App() {
  const dispatch = useAppDispatch()

  const [canvasMousePosition, setCanvasMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    setInterval(() => {
      dispatch(moveObjects(canvasMousePosition))
    }, 1000)
  }, [])

  const trackMouse: MouseEventHandler<SVGSVGElement> = (event) => {
    setCanvasMousePosition(getCanvasPosition(event))
  }

  return <Canvas trackMouse={trackMouse}></Canvas>
}

export default App
