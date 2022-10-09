export function positionsBetween(min: number, max: number, stepSize: number) {
  return (Math.abs(min) + Math.abs(max)) / stepSize
}

export function distanceBetween(min: number, max: number) {
  return Math.abs(min) + Math.abs(max)
}

export function halfWayPoint(min: number, max: number) {
  return (Math.abs(min) + Math.abs(max)) / 2 - Math.abs(min)
}
