import styled, { keyframes } from 'styled-components'
import { Point } from '../utils/formulas'
import { FlyingObjectBase } from './FlyingObjectBase'
import { FlyingObjectTop } from './FlyingObjectTop'
import { gameHeight } from '../utils/constants'

export interface FlyingObjectProps {
  position: Point
}

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`

export const FlyingObject = ({ position }: FlyingObjectProps) => {
  return (
    <Move>
      <FlyingObjectBase position={position} />
      <FlyingObjectTop position={position} />
    </Move>
  )
}
