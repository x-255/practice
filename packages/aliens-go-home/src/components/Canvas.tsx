import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { CannonBase } from './CannonBase'
import { CannonPipe } from './CannonPipe'
import { Ground } from './Ground'
import { Sky } from './Sky'

export interface CanvasProps {
  trackMouse: MouseEventHandler<SVGSVGElement>
}

const Container = styled.svg`
  border: 1px solid black;
`

export function Canvas({ trackMouse }: CanvasProps) {
  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight,
  ]

  return (
    <Container
      id="aliens-go-home-canvas"
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
