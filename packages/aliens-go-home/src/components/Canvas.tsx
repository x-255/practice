import styled from 'styled-components'
import { Sky } from './Sky'
import { Ground } from './Ground'
import { CannonBase } from './CannonBase'
import { CannonPipe } from './CannonPipe'

const Container = styled.svg`
  border: 1px solid black;
`

export function Canvas() {
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
    >
      <Sky></Sky>
      <Ground></Ground>
      <CannonPipe rotation={45}></CannonPipe>
      <CannonBase></CannonBase>
    </Container>
  )
}
