import styled from 'styled-components'

const Text = styled.text`
  font-family: "Joti One", cursive;
  font-size: 80px;
  fill: #d6d33e;
`

export const CurrentScore = () => {
  return (
    <g filter="url(#shadow)">
      <Text x="300" y="80">
        99
      </Text>
    </g>
  )
}
