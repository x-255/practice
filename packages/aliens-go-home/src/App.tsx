import { useEffect, useState } from 'react'
import { Canvas } from './components/Canvas'

function App() {
  const [canvasMousePosition, setCanvasMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {}, [])

  return <Canvas></Canvas>
}

export default App
