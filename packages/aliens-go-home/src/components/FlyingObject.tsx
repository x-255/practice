import { Point } from '../utils/formulas'
import { FlyingObjectBase } from './FlyingObjectBase'
import { FlyingObjectTop } from './FlyingObjectTop'

export interface FlyingObjectProps {
  position: Point
}

export const FlyingObject = ({ position }: FlyingObjectProps) => {
  return (
    <g>
      <FlyingObjectBase position={position} />
      <FlyingObjectTop position={position} />
    </g>
  )
}
