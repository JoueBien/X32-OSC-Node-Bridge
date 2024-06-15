import { floatToFixed1 } from "./floatToFixed"

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
