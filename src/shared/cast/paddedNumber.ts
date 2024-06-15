/** Adds a 0 to the start of number smaller than 10
 * as that is needed in OSC addresses on the X32.
 *
 * @example paddedNumber(9) // === "09"
 * @example paddedNumber(22) // === "22"
 */
export function paddedNumber(num: number): string {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}
