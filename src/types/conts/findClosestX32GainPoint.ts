import { x32GainPoints } from "./x32GainPoints"

/** Given a float between 0 & 1 find the closest fader value. Note there is no input validation. */
export function findClosestX32GainPoint(
  /** The number you want to find the closest to in smallestSubIndex array. */ input: number
) {
  return _findClosestX32GainPoint({
    input,
    startIndex: 0,
    endIndex: 145 - 1,
    depth: 0,
  })
}

function _findClosestX32GainPoint(params: {
  /** The number you want to find the closest to in smallestSubIndex array. */
  input: number
  /** The start index to search - smallest is 0. */
  startIndex: number
  /** The start index to search - largest is 1024. */
  endIndex: number
  /** The recursion cycle to stop at if too much recursion. */
  depth: number
}) {
  const { depth, input, startIndex, endIndex } = params

  // Depth Stop
  if (depth > 10) {
    throw new Error(
      `@findClosestX32GainPoint. Unable to find ${input}, too much recursion.`
    )
  }

  const midIndex = Math.trunc((startIndex + endIndex) / 2)
  const difference = endIndex - startIndex

  // In the case we have fewer than 4 options we want to find the closest
  if (difference <= 4) {
    const subSet = x32GainPoints
      .slice(startIndex, endIndex + 1)
      .map((point) => {
        return {
          diff: Math.abs(input - point.float),
          index: point.index,
        }
      })
      .sort((a, b) => {
        if (a.diff < b.diff) {
          return -1
        }
        if (a.diff > b.diff) {
          return 1
        }
        return 0
      })

    return x32GainPoints[subSet[0].index]
  }

  // If an exact match we want to return it
  if (input === x32GainPoints[midIndex].float) {
    return x32GainPoints[midIndex]
  }

  // In the case it's larger or smaller we want to go lef/right
  if (input > x32GainPoints[midIndex].float) {
    return _findClosestX32GainPoint({
      input,
      startIndex: midIndex,
      endIndex,
      depth: depth + 1,
    })
  } else {
    return _findClosestX32GainPoint({
      input,
      startIndex,
      endIndex: midIndex,
      depth: depth + 1,
    })
  }
}
