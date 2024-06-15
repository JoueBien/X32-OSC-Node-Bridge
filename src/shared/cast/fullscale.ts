/** Cast Full Scale db to something the X32 understands */
export function fullScaleToArg(fullScale: number) {
  // https://stackoverflow.com/questions/6071977/finding-antilog-in-javascript-and-solving-polynomial-equation-of-n-degree-in-jav
  // return Math.exp(fullScale / 20)
  return Math.pow(10, fullScale / 20)
}

/** 1-0 to full scale db */
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
