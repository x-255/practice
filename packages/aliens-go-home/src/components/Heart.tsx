import styled from 'styled-components'
import { Point, pathFromBezierCurve } from '../utils/formulas'

export interface HeartProps {
  position: Point
}

const getHeartSide = () => styled.path`
  fill: #da0d15;
  stroke: #a51708;
  stroke-width: 2px;
`
const LeftSide = getHeartSide()
const RightSide = getHeartSide()

export const Heart = ({ position: { x, y } }: HeartProps) => {
  const leftSide = {
    initialAxis: {
      x,
      y,
    },
    initialControlPoint: {
      x: -20,
      y: -20,
    },
    endingControlPoint: {
      x: -40,
      y: 10,
    },
    endingAxis: {
      x: 0,
      y: 40,
    },
  }

  const rightSide = {
    initialAxis: {
      x,
      y,
    },
    initialControlPoint: {
      x: 20,
      y: -20,
    },
    endingControlPoint: {
      x: 40,
      y: 10,
    },
    endingAxis: {
      x: 0,
      y: 40,
    },
  }

  return (
    <g filter="url(#shadow)">
      <LeftSide d={pathFromBezierCurve(leftSide)} />
      <RightSide d={pathFromBezierCurve(rightSide)} />
    </g>
  )
}
