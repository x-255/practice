import styled from 'styled-components'
import { Point } from '../utils/formulas'

export interface CannonBallProps {
  position: Point
}

const Ball = styled.ellipse`
  fill: #777;
  stroke: #444;
  stroke-width: 2px;
`

export const CannonBall = ({ position: { x, y } }: CannonBallProps) => {
  return <Ball cx={x} cy={y} rx="16" ry="16"></Ball>
}
