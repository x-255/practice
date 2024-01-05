import { useRef } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../app/hooks'
import { moveObjectsByThrottle } from '../features/gameSlice'
import { getCanvasPosition } from '../utils/formulas'
import { CannonBase } from './CannonBase'
import { CannonPipe } from './CannonPipe'
import { Ground } from './Ground'
import { Sky } from './Sky'

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
      <Sky></Sky>
      <Ground></Ground>
      <CannonPipe></CannonPipe>
      <CannonBase></CannonBase>
    </Container>
  )
}
