import styled from 'styled-components'
import { FlyingObjectProps } from './FlyingObject'

const BaseBox = styled.ellipse`
  fill: #979797;
  stroke: #5c5c5c;
`

export const FlyingObjectBase = ({ position: { x, y } }: FlyingObjectProps) => {
  return <BaseBox cx={x} cy={y} rx="40" ry="10"></BaseBox>
}
