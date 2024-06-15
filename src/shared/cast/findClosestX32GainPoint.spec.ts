import { findClosestX32GainPoint } from "./findClosestX32GainPoint"

describe("findClosestX32GainPoint.ts", () => {
  it("finds an exact value of -5.50", () => {
    const res = findClosestX32GainPoint(-5.5)
    expect(res.float).toBe(-5.5)
  })

  it("finds an exact value of 39.5", () => {
    const res = findClosestX32GainPoint(39.5)
    expect(res.float).toBe(39.5)
  })

  it("finds an exact value of 55", () => {
    const res = findClosestX32GainPoint(55)
    expect(res.float).toBe(55)
  })

  it("finds an closest value of for 55.123456", () => {
    const res = findClosestX32GainPoint(55.123456)
    expect(res.float).toBe(55)
  })

  it("finds the first value", () => {
    const res = findClosestX32GainPoint(0)
    expect(res.float).toBe(0)
  })

  it("finds the last value", () => {
    const res = findClosestX32GainPoint(60)
    expect(res.float).toBe(60)
  })
})
