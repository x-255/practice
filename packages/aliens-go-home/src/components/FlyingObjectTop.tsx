import styled from 'styled-components'
import { pathFromBezierCurve } from '../utils/formulas'
import { FlyingObjectProps } from './FlyingObject'

const TopBox = styled.path`
  fill: #b6b6b6;
  stroke: #7d7d7d;
`

export const FlyingObjectTop = ({ position: { x, y } }: FlyingObjectProps) => {
  const baseWith = 40
  const halfBase = 20
  const height = 25
  const cubicBezierCurve = {
    initialAxis: {
      x: x - halfBase,
      y,
    },
    initialControlPoint: {
      x: 10,
      y: -height,
    },
    endingControlPoint: {
      x: 30,
      y: -height,
    },
    endingAxis: {
      x: baseWith,
      y: 0,
    },
  }

  return <TopBox d={pathFromBezierCurve(cubicBezierCurve)}></TopBox>
}
