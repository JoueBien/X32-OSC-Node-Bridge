import { ARG_Fixed } from "@/types/args"
// An array full with steps
// This could be better
// function range (start: number, stop: number, step: number = 1) {
//   return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
// }

// const BASE_RANGE = range(0, 200)

// Cast an array of 8 bytes into 32 bytes
export function uint8ArrayToFloat32Array<Size extends number>(
  uint8array: Uint8Array
): ARG_Fixed<Size> {
  // // uint8 array with 2 floats inside, 1.0 and -1.0
  // // uint8array = new Uint8Array([63, 128, 0, 0, 128 + 63, 128, 0, 0]);
  // const numberOfFloats = (uint8array.byteLength / 4)
  // const dataView = new DataView(uint8array.buffer)
  // // This appears to be much faster
  // // const arrayOfNumbers = range(0, numberOfFloats).map(idx => dataView.getFloat32(idx * 4, true))
  // const arrayOfNumbers = [...BASE_RANGE.slice(0,numberOfFloats)].map(idx => dataView.getFloat32(idx * 4, true))
  // return arrayOfNumbers
  // const numberOfFloats = (uint8array.byteLength / 4)
  const floats = new Float32Array(
    uint8array.buffer,
    uint8array.byteOffset,
    uint8array.byteLength / 4
  )
  // Note we are dirty casting here - you should check length after this
  return Array.from(floats) as ARG_Fixed<Size>
}

// Pull the number of returned values off the front so we get correct values
export function argUint8ArrayToFloat32Array(uint8array: Uint8Array): number[] {
  // Remove the length number from the front
  return uint8ArrayToFloat32Array(uint8array.slice(4))
}

export function uint8ArrayToInt32Array(uint8array: Uint8Array): number[] {
  const ints = new Int32Array(
    uint8array.buffer,
    uint8array.byteOffset,
    uint8array.byteLength / 4
  )
  return Array.from(ints)
}

export function argUint8ArrayToInt32Array(uint8array: Uint8Array): number[] {
  return uint8ArrayToInt32Array(uint8array.slice(4))
}

export function floatToFixed3(value: number) {
  return Number(value.toFixed(3))
}

export function floatToFixed1(value: number) {
  return Number(value.toFixed(1))
}

export function argToPosNegPercentage(value: number): string {
  // 0-0.5 is negative %
  // 0.5-1 is positive %
  return `${parseInt(`${(value * 100 - 50) * 2}`, 10)}%`
}

export function argToPosNeg24(value: number): string {
  // 0-0.5 is negative %
  // 0.5-1 is positive %
  // This is almost right except for rounding errors
  let strValue = `${floatToFixed1(value * 48 - 24)}`
  strValue = strValue.includes(".") ? strValue : `${strValue}.0`

  return `${strValue}dB`
}

export function argToAmpValue(value: number): string {
  // 0-0.5 is negative %
  // 0.5-1 is positive %
  return `${floatToFixed1(value * 10)}`
}

export function argToOnOff(value: number): string {
  return value > 0.5 ? "On" : "Off"
}

export function argToLimitCompress(value: number): string {
  return value > 0.5 ? "LIMIT" : "COMP"
}

export function argToPosPercentage(value: number): string {
  // 0-1 is positive %
  return `${parseInt(`${value * 100}`, 10)}%`
}

export function argToPosPercentageNoSymbol(value: number): string {
  // 0-1 is positive %
  return `${parseInt(`${value * 100}`, 10)}`
}

export function argToNeg18Pos6(value: number): string {
  // This is almost right except for rounding errors
  let strValue = `${floatToFixed1((value - 0.75) * 24)}`
  strValue = strValue.includes(".") ? `${strValue}dB` : `${strValue}.0dB`
  return strValue
  // return `${value}`
}
