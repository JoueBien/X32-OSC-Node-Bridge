

export enum Step {
  "up" = "up",
  "down" = "down"
}

export type Direction = Step.up | Step.down

export function stepBy1 (previousValue: number, direction: Direction): number {
  if (direction === Step.up) {
    return previousValue + 1
  } else {
    return previousValue - 1
  }
}

export function stepBy001 (previousValue: number, direction: Direction): number {
  if (direction === Step.up) {
    // return (previousValue + 0.001)
    return (previousValue * 1000 + 1) / 1000
  } else {
    return (previousValue * 1000 - 1) / 1000
  }
}