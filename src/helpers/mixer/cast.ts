// An array full with steps
// This could be better
function range (start: number, stop: number, step: number = 1) {
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

const BASE_RANGE = range(0, 200)
  
// Cast an array of 8 bytes into 32 bytes
export function uint8ArrayToArray(uint8array: Uint8Array): number [] {
  // uint8 array with 2 floats inside, 1.0 and -1.0
  // uint8array = new Uint8Array([63, 128, 0, 0, 128 + 63, 128, 0, 0]);
  const numberOfFloats = (uint8array.byteLength / 4)
  const dataView = new DataView(uint8array.buffer)
  // This appears to be much faster
  // const arrayOfNumbers = range(0, numberOfFloats).map(idx => dataView.getFloat32(idx * 4, true))
  const arrayOfNumbers = [...BASE_RANGE.slice(0,numberOfFloats)].map(idx => dataView.getFloat32(idx * 4, true))
  return arrayOfNumbers
}

// Pull the number of returned values off the front so we get correct values
export function argUint8ArrayToArray (uint8array: Uint8Array): number[] {
  // Remove the length number from the front
  return uint8ArrayToArray(uint8array.slice(4))
}
