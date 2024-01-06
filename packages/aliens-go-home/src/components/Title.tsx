import styled from 'styled-components'
import { pathFromBezierCurve } from '../utils/formulas'

const Text = styled.text`
  font-family: 'Joti One', cursive;
  font-size: 120px;
  fill: #cbca62;
`

export const Title = () => {
  const aliensLineCurve = {
    initialAxis: {
      x: -190,
      y: -950,
    },
    initialControlPoint: {
      x: 95,
      y: -50,
    },
    endingControlPoint: {
      x: 285,
      y: -50,
    },
    endingAxis: {
      x: 380,
      y: 0,
    },
  }

  const goHomeLineCurve = {
    ...aliensLineCurve,
    initialAxis: {
      x: -250,
      y: -780,
    },
    initialControlPoint: {
      x: 125,
      y: -90,
    },
    endingControlPoint: {
      x: 375,
      y: -90,
    },
    endingAxis: {
      x: 500,
      y: 0,
    },
  }

  return (
    <g filter="url(#shadow)">
      <defs>
        <path id="AliensPath" d={pathFromBezierCurve(aliensLineCurve)} />
        <path id="GoHomePath" d={pathFromBezierCurve(goHomeLineCurve)} />
      </defs>

      <Text>
        <textPath xlinkHref="#AliensPath">Aliens,</textPath>
      </Text>
      <Text>
        <textPath xlinkHref="#GoHomePath">Go Home!</textPath>
      </Text>
    </g>
  )
}
