import { ARG_Fixed } from "@/types/args"
// An array full with steps
// This could be better
// function range (start: number, stop: number, step: number = 1) {
//   return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
// }

// const BASE_RANGE = range(0, 200)

/**
 * Cast an array of 8 bytes into 32 bytes - float[]
 * Do not use directly - use `argUint8ArrayToFloat32Array` externally!
 */
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
  ) //.slice(4)
  // Note we are dirty casting here - you should check length after this
  return Array.from(floats) as ARG_Fixed<Size>
}

/** A wrapper around `uint8ArrayToFloat32Array` that remove padded bits off the front so we get correct values from the X32 */
export function argUint8ArrayToFloat32Array<Size extends number>(
  uint8array: Uint8Array
): ARG_Fixed<Size> {
  // Remove the length number from the front
  return uint8ArrayToFloat32Array<Size>(uint8array).slice(1) as ARG_Fixed<Size>
}

/**
 * Cast an array of 8 bytes into 32 bytes - int[]
 * Do not use directly - use `argUint8ArrayToInt32Array` externally!
 */
export function uint8ArrayToInt32Array(uint8array: Uint8Array): number[] {
  const ints = new Int32Array(
    uint8array.buffer,
    uint8array.byteOffset,
    uint8array.byteLength / 4
  )
  return Array.from(ints)
}

/** A wrapper around `uint8ArrayToInt32Array` that remove padded bits off the front so we get correct values from the X32 */
export function argUint8ArrayToInt32Array(uint8array: Uint8Array): number[] {
  return uint8ArrayToInt32Array(uint8array.slice(4))
}
