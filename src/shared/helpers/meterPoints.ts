// Cast Full Scale to something the X32 understands
export function fullScaleToArg(fullScale: number) {
  // https://stackoverflow.com/questions/6071977/finding-antilog-in-javascript-and-solving-polynomial-equation-of-n-degree-in-jav
  // return Math.exp(fullScale / 20)
  return Math.pow(10, fullScale / 20)
}

// 1-0 to full scale db
export function argToFullScale(linear: number) {
  /**
   * https://forum.audacityteam.org/viewtopic.php?t=26266
   * The usual formula for calculating linear-to-dB is:
   *  dB = 20log(V1/V2)
   *  dB is an expression of a ratio (V1/V2) and in the case of dBFS the ratio is with reference to a Full Scale = +/- 1
   *  So V2 = 1
   *  Which gives:
   *  dB = 20.log V
   * where "V" is the linear value and "log" is "common log" (base=10).
   */
  // return 20 * Math.log(linear/1)
  return (Math.log(linear) / Math.LN10) * 20
}

export type MeterPoint = {
  fs: number
  arg: number
}

export type MeterPoints = MeterPoint[]

export const points = [
  { fs: -Infinity, arg: 0 },
  { fs: -65, arg: 0.0005623413251903491 },
  { fs: -50, arg: 0.0031622776601683794 },
  { fs: -45, arg: 0.005623413251903491 },
  { fs: -40, arg: 0.01 },
  { fs: -35, arg: 0.01778279410038923 },
  { fs: -30, arg: 0.03162277660168379 },
  { fs: -25, arg: 0.056234132519034905 },
  { fs: -20, arg: 0.1 },
  { fs: -15, arg: 0.17782794100389226 },
  { fs: -10, arg: 0.31622776601683794 },
  { fs: -5, arg: 0.5623413251903491 },
  { fs: 0, arg: 1 },
]

export const point18 = { fs: -18, arg: 0.12589254 }

// SL3
// -65, -48, -36, -24, -12, -10, -2 peak
export const CUSTOM_FS = [
  -Infinity,
  -60,
  -54,
  -48,
  -42,
  -36,
  -30,
  -24,
  -18,
  -15,
  -12,
  -5,
  -2,
  0,
].reverse()
export const CUSTOM_POINTS: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -60,
    arg: 0.001,
  },
  {
    fs: -54,
    arg: 0.001995262314968879,
  },
  {
    fs: -48,
    arg: 0.003981071705534973,
  },
  {
    fs: -42,
    arg: 0.007943282347242814,
  },
  {
    fs: -36,
    arg: 0.015848931924611134,
  },
  {
    fs: -30,
    arg: 0.03162277660168379,
  },
  {
    fs: -24,
    arg: 0.06309573444801933,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -15,
    arg: 0.17782794100389226,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -5,
    arg: 0.5623413251903491,
  },
  {
    fs: -2,
    arg: 0.7943282347242815,
  },
  {
    fs: 0,
    arg: 1,
  },
].reverse()

export const CUSTOM_POINTS_REDUCTION: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -24,
    arg: 0.06309573444801933,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -15,
    arg: 0.17782794100389226,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -5,
    arg: 0.5623413251903491,
  },
  {
    fs: -2,
    arg: 0.7943282347242815,
  },
  {
    fs: 0,
    arg: 1,
  },
].reverse()

// SL3
// -65, -48, -36, -24, -12, -10, -2 peak
export const SL3_FS = [
  -Infinity,
  -60,
  -54,
  -48,
  -42,
  -36,
  -30,
  -24,
  -18,
  -12,
  -5,
  -2,
  0,
].reverse()
export const SL3_POINTS: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -60,
    arg: 0.001,
  },
  {
    fs: -54,
    arg: 0.001995262314968879,
  },
  {
    fs: -48,
    arg: 0.003981071705534973,
  },
  {
    fs: -42,
    arg: 0.007943282347242814,
  },
  {
    fs: -36,
    arg: 0.015848931924611134,
  },
  {
    fs: -30,
    arg: 0.03162277660168379,
  },
  {
    fs: -24,
    arg: 0.06309573444801933,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -5,
    arg: 0.5623413251903491,
  },
  {
    fs: -2,
    arg: 0.7943282347242815,
  },
  {
    fs: 0,
    arg: 1,
  },
].reverse()
// Yamahar MBM7CL
// -60, -50, -30, -24, -18, -15, -12, -9, -6, -3, peak
export const MBM7CL_FS = [
  -Infinity,
  -60,
  -50,
  -30,
  -24,
  -18,
  -15,
  -12,
  -9,
  -6,
  -3,
].reverse()
export const MBM7CL_POINTS: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -60,
    arg: 0.001,
  },
  {
    fs: -50,
    arg: 0.0031622776601683794,
  },
  {
    fs: -30,
    arg: 0.03162277660168379,
  },
  {
    fs: -24,
    arg: 0.06309573444801933,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -15,
    arg: 0.17782794100389226,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -9,
    arg: 0.35481338923357547,
  },
  {
    fs: -6,
    arg: 0.5011872336272722,
  },
  {
    fs: -3,
    arg: 0.7079457843841379,
  },
].reverse()

// X32/M32 - Long
// -57, -54, -51, -48, -45, -42, -39, -36, -33 -30,
// -27, -24 -21, -18, -15, -12, -10, -8, -6, -4, -3, -2, -1
export const X32_FULL_FS = [
  -Infinity,
  -57,
  -54,
  -51,
  -48,
  -45,
  -42,
  -39,
  -36,
  -33,
  -30,
  -27,
  -24,
  -21,
  -18,
  -15,
  -12,
  -10,
  -8,
  -6,
  -4,
  -3,
  -2,
  -1,
  0,
].reverse()
export const X32_FULL_POINTS: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -57,
    arg: 0.0014125375446227542,
  },
  {
    fs: -54,
    arg: 0.001995262314968879,
  },
  {
    fs: -51,
    arg: 0.002818382931264455,
  },
  {
    fs: -48,
    arg: 0.003981071705534973,
  },
  {
    fs: -45,
    arg: 0.005623413251903491,
  },
  {
    fs: -42,
    arg: 0.007943282347242814,
  },
  {
    fs: -39,
    arg: 0.011220184543019636,
  },
  {
    fs: -36,
    arg: 0.015848931924611134,
  },
  {
    fs: -33,
    arg: 0.0223872113856834,
  },
  {
    fs: -30,
    arg: 0.03162277660168379,
  },
  {
    fs: -27,
    arg: 0.04466835921509631,
  },
  {
    fs: -24,
    arg: 0.06309573444801933,
  },
  {
    fs: -21,
    arg: 0.08912509381337455,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -15,
    arg: 0.17782794100389226,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -10,
    arg: 0.31622776601683794,
  },
  {
    fs: -8,
    arg: 0.3981071705534972,
  },
  {
    fs: -6,
    arg: 0.5011872336272722,
  },
  {
    fs: -4,
    arg: 0.6309573444801932,
  },
  {
    fs: -3,
    arg: 0.7079457843841379,
  },
  {
    fs: -2,
    arg: 0.7943282347242815,
  },
  {
    fs: -1,
    arg: 0.8912509381337456,
  },
  {
    fs: 0,
    arg: 1,
  },
].reverse()
// X32 Short
// -30, -18, -12, -9, -6, -3
export const X32_SHORT = [-Infinity, -30, -18, -12, -9, -6, -3, 0].reverse()
export const X32_SHORT_POINTS: MeterPoints = [
  {
    fs: -Infinity,
    arg: 0,
  },
  {
    fs: -30,
    arg: 0.03162277660168379,
  },
  {
    fs: -18,
    arg: 0.12589254117941673,
  },
  {
    fs: -12,
    arg: 0.251188643150958,
  },
  {
    fs: -9,
    arg: 0.35481338923357547,
  },
  {
    fs: -6,
    arg: 0.5011872336272722,
  },
  {
    fs: -3,
    arg: 0.7079457843841379,
  },
  {
    fs: 0,
    arg: 1,
  },
].reverse()
