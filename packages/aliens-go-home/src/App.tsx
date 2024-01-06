import { useEffect, useRef } from 'react'
import { Canvas } from './components/Canvas'

function App() {
  const canvasRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const onResize = () => {
      const cnv = canvasRef.current
      if (cnv) {
        cnv.style.width = `${window.innerWidth}px`
        cnv.style.height = `${window.innerHeight}px`
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <Canvas ref={canvasRef}></Canvas>
}

export default App
