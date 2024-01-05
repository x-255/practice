import { useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../app/hooks'
import { moveObjectsByThrottle } from '../features/gameSlice'
import { getCanvasPosition } from '../utils/formulas'
import { CannonBase } from './CannonBase'
import { CannonPipe } from './CannonPipe'
import { Ground } from './Ground'
import { Sky } from './Sky'
import { CannonBall } from './CannonBall'
import { CurrentScore } from './CurrentScore'
import { FlyingObject } from './FlyingObject'
import { Heart } from './Heart'

const Container = styled.svg`
  border: 1px solid black;
`

export function Canvas() {
  const containerRef = useRef<SVGSVGElement>(null)
  const dispatch = useAppDispatch()

  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight,
  ]

  const trackMouse = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const mousePosition = getCanvasPosition(e, containerRef.current!)
    dispatch(moveObjectsByThrottle(mousePosition))
  }

  return (
    <Container
      ref={containerRef}
      preserveAspectRatio="none"
      viewBox={viewBox.join(' ')}
      onMouseMove={trackMouse}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>

      <Sky></Sky>
      <Ground></Ground>
      <CannonPipe></CannonPipe>
      <CannonBase></CannonBase>
      <CannonBall position={{ x: 0, y: -100 }} />
      <CurrentScore></CurrentScore>
      <FlyingObject position={{ x: -150, y: -300 }} />
      <FlyingObject position={{ x: 150, y: -300 }} />
      <Heart position={{ x: -300, y: 35 }} />
    </Container>
  )
}
