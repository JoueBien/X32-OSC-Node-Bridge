// Adds a 0 to the start of numbers as that is needed in OSC addresses
export function paddedNumber(num: number) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}
