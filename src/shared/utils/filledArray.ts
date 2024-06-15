import { FixedArray } from "@/types/args"

export type ArrayFiller<Fill> = (index: number) => Fill

export function filledArray<Length extends number, Fill>(
  length: number,
  fill: Fill | ArrayFiller<Fill>
): FixedArray<Fill, Length> {
  // Fill an array with a function
  if (fill instanceof Function) {
    return new Array(length)
      .fill(0)
      .map((_empty, index) => fill(index)) as FixedArray<Fill, Length>
  }
  // Other wise dump in a value
  return new Array(length).fill(fill) as FixedArray<Fill, Length>
}
