import styled from 'styled-components'
import { SKY_AND_GROUND_WIDTH } from '../utils/constants'

const SkyBox = styled.rect`
  fill: #30abef;
`

export function Sky() {
  const skyWidth = SKY_AND_GROUND_WIDTH
  const gameHeight = 1200

  return (
    <SkyBox
      x={skyWidth / -2}
      y={100 - gameHeight}
      width={skyWidth}
      height={gameHeight}
    />
  )
}
