import { MouseEvent, MouseEventHandler } from 'react'

export interface Point {
  x: number
  y: number
}

export interface CubicBezierCurve {
  initialAxis: Point
  initialControlPoint: Point
  endingControlPoint: Point
  endingAxis: Point
}

export const pathFromBezierCurve = ({
  initialAxis,
  initialControlPoint,
  endingControlPoint,
  endingAxis,
}: CubicBezierCurve) => {
  return `
    M${initialAxis.x} ${initialAxis.y}
    c ${initialControlPoint.x} ${initialControlPoint.y}
    ${endingControlPoint.x} ${endingControlPoint.y}
    ${endingAxis.x} ${endingAxis.y}
  `
}

export const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI

export const calculateAngle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  if (x2 >= 0 && y2 >= 0) {
    return 90
  } else if (x2 < 0 && y2 >= 0) {
    return -90
  }

  const dividend = x2 - x1
  const divisor = y2 - y1
  const quotient = dividend / divisor
  return radiansToDegrees(Math.atan(quotient)) * -1
}

export const getCanvasPosition = (
  e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>
) => {
  const svg = document.querySelector('#aliens-go-home-canvas') as SVGSVGElement
  const point = svg.createSVGPoint()

  point.x = e.clientX
  point.y = e.clientY
  const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse())
  return { x, y }
}
