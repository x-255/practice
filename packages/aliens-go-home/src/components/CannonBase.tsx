import styled from 'styled-components'
import { CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas'

const cannonBaseStyle = `
  fill: #a16012;
  stroke: #75450e;
  stroke-width: 2;
`

const CannonBasePath = styled.path`
  ${cannonBaseStyle}
`

const CannonBaseLine = styled.line`
  ${cannonBaseStyle}
`

export function CannonBase() {
  const baseWith = 80
  const halfBase = 40
  const height = 60
  const negativeHeight = height * -1

  const cubicBezierCurve: CubicBezierCurve = {
    initialAxis: {
      x: -halfBase,
      y: height,
    },
    initialControlPoint: {
      x: 20,
      y: negativeHeight,
    },
    endingControlPoint: {
      x: 60,
      y: negativeHeight,
    },
    endingAxis: {
      x: baseWith,
      y: 0,
    },
  }

  return (
    <g>
      <CannonBasePath d={pathFromBezierCurve(cubicBezierCurve)} />
      <CannonBaseLine x1={-halfBase} y1={height} x2={halfBase} y2={height} />
    </g>
  )
}
