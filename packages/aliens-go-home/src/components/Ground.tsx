import styled from 'styled-components'
import { SKY_AND_GROUND_WIDTH } from '../utils/constants'

const GroundBox = styled.rect`
  fill: #59a941;
`

const DivisionBox = styled.line`
  stroke: #458232;
  stroke-width: 3px;
`

export function Ground() {
  const groundWidth = SKY_AND_GROUND_WIDTH

  return (
    <g id="ground">
      <GroundBox
        id="ground-2"
        data-name="ground"
        x={groundWidth / -2}
        y={0}
        width={groundWidth}
        height={100}
      />
      <DivisionBox x1={groundWidth / -2} y1={0} x2={groundWidth / 2} y2={0} />
    </g>
  )
}
