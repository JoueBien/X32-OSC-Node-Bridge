

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

export function stepByNegative1 (previousValue: number, direction: Direction): number {
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

export function stepBy01 (previousValue: number, direction: Direction): number {
  if (direction === Step.up) {
    // return (previousValue + 0.01)
    return (previousValue * 1000 + 10) / 1000
  } else {
    return (previousValue * 1000 - 10) / 1000
  }
}


export function stepBy025 (previousValue: number, direction: Direction): number {
  if (direction === Step.up) {
    // return (previousValue + 0.01)
    return (previousValue * 1000 + 25) / 1000
  } else {
    return (previousValue * 1000 - 25) / 1000
  }
}

export function stepByDbPlusMinus24InHalfSteps (previousValue: number, direction: Direction): number {
  // 1000000000000000000/96 = +/-24 in 0.5 steps
  if (direction === Step.up) {
    return (previousValue * 1000000000000000000 + 10416666666666666) / 1000000000000000000
  } else {
    return (previousValue * 1000000000000000000 - 10416666666666666) / 1000000000000000000
  }
}

