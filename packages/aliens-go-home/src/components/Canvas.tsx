import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  moveObjects,
  moveObjectsByThrottle,
  shoot,
} from '../features/gameSlice'
import { getCanvasPosition } from '../utils/formulas'
import { CannonBall } from './CannonBall'
import { CannonBase } from './CannonBase'
import { CannonPipe } from './CannonPipe'
import { CurrentScore } from './CurrentScore'
import { FlyingObject } from './FlyingObject'
import { Ground } from './Ground'
import { Heart } from './Heart'
import { Sky } from './Sky'
import { StartGame } from './StartGame'
import { Title } from './Title'

const Container = styled.svg`
  border: 1px solid black;
`

export const Canvas = forwardRef<SVGSVGElement>((_, ref) => {
  const { started, flyingObjects, cannonBalls } = useAppSelector(
    (state) => state.game.gameState
  )
  const dispatch = useAppDispatch()

  const [canvasMousePosition, setCanvasMousePosition] = useState({
    x: 0,
    y: 0,
  })

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
      setCanvasMousePosition(mousePosition)
      dispatch(moveObjects(mousePosition))
    }
  }

  const handleShoot = () => {
    dispatch(shoot(canvasMousePosition))
  }

  return (
    <Container
      ref={ref}
      preserveAspectRatio="none"
      viewBox={viewBox.join(' ')}
      onMouseMove={trackMouse}
      onClick={handleShoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>

      <Sky></Sky>
      <Ground></Ground>
      {cannonBalls.map((cannonBall) => (
        <CannonBall key={cannonBall.id} position={cannonBall.position} />
      ))}
      <CannonPipe></CannonPipe>
      <CannonBase></CannonBase>
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
