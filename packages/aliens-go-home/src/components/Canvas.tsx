import { forwardRef, useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
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
import { StartGame } from './StartGame'
import { Title } from './Title'

const Container = styled.svg`
  border: 1px solid black;
`

export const Canvas = forwardRef<SVGSVGElement>((_, ref) => {
  const { started, flyingObjects } = useAppSelector(
    (state) => state.game.gameState
  )
  const dispatch = useAppDispatch()

  const gameHeight = 1200
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ]

  const trackMouse = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (ref && 'current' in ref && ref.current !== null) {
      const mousePosition = getCanvasPosition(e, ref.current)
      dispatch(moveObjectsByThrottle(mousePosition))
    }
  }

  return (
    <Container
      ref={ref}
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
      {started && (
        <g>
          {flyingObjects.map((flyingObject) => (
            <FlyingObject
              key={flyingObject.id}
              position={flyingObject.position}
            />
          ))}
        </g>
      )}
      <Heart position={{ x: -300, y: 35 }} />
      {!started && <StartGame></StartGame>}
      {!started && <Title></Title>}
    </Container>
  )
})
