import styled from 'styled-components'
import { GAME_WIDTH } from '../utils/constants'
import { useAppDispatch } from '../app/hooks'
import { startGame } from '../features/gameSlice'

const StartBtn = styled.rect`
  fill: transparent;
  cursor: pointer;
`

const StartText = styled.text`
  font-family: 'Joti One', cursive;
  font-size: 60px;
  fill: #e3e3e3;
  cursor: pointer;
`

export const StartGame = () => {
  const dispatch = useAppDispatch()

  const handleStartGame = () => {
    dispatch(startGame())
  }

  const button = {
    x: GAME_WIDTH / -2, // half width
    y: -280, // minus means up (above 0)
    width: GAME_WIDTH,
    height: 200,
    rx: 10, // border radius
    ry: 10, // border radius
    style: {
      fill: 'transparent',
      cursor: 'pointer',
    },
    onClick: handleStartGame,
  }

  const text = {
    textAnchor: 'middle', // center
    x: 0, // center relative to X axis
    y: -150, // 150 up
    style: {
      fontFamily: '"Joti One", cursive',
      fontSize: 60,
      fill: '#e3e3e3',
      cursor: 'pointer',
    },
    onClick: handleStartGame,
  }

  return (
    <g filter="url(#shadow)">
      <StartBtn {...button}></StartBtn>
      <StartText {...text}>Tap To Start!</StartText>
    </g>
  )
}
