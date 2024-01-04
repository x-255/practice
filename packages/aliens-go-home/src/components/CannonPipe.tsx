import styled from 'styled-components'
import { CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas'
import { useAppSelector } from '../app/hooks'

const cannonPipeStyle = `
  fill: '#999';
  stroke: '#666';
  strokeWidth: '2px';
`

const CannonPipePath = styled.path`
  ${cannonPipeStyle}
`

const CannonPipeLine = styled.line`
  ${cannonPipeStyle}
`

export function CannonPipe() {
  const { angle } = useAppSelector((state) => state.game)

  const transform = `rotate(${angle}, 0, 0)`

  const muzzleWidth = 40
  const halfMuzzle = 20
  const height = 100
  const yBasis = 70

  const cubicBezierCurve: CubicBezierCurve = {
    initialAxis: {
      x: -halfMuzzle,
      y: -yBasis,
    },
    initialControlPoint: {
      x: -40,
      y: height * 1.7,
    },
    endingControlPoint: {
      x: 80,
      y: height * 1.7,
    },
    endingAxis: {
      x: muzzleWidth,
      y: 0,
    },
  }

  return (
    <g transform={transform}>
      <CannonPipePath d={pathFromBezierCurve(cubicBezierCurve)} />
      <CannonPipeLine
        x1={-halfMuzzle}
        y1={-yBasis}
        x2={halfMuzzle}
        y2={-yBasis}
      />
    </g>
  )
}
