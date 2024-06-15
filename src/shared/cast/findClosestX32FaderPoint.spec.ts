import { findClosestX32FaderPoint } from "./findClosestX32FaderPoint"

describe("findClosestX32FaderPoint.ts", () => {
  it("finds an exact value of  0.5494", () => {
    const res = findClosestX32FaderPoint(0.5494)
    expect(res.float).toBe(0.5494)
  })

  it("finds an exact value of 0.0254", () => {
    const res = findClosestX32FaderPoint(0.0254)
    expect(res.float).toBe(0.0254)
  })

  it("finds an exact value of  0.9629", () => {
    const res = findClosestX32FaderPoint(0.9629)
    expect(res.float).toBe(0.9629)
  })

  it("finds an closest value of for 0.12345", () => {
    const res = findClosestX32FaderPoint(0.12345)
    expect(res.float).toBe(0.1232)
  })

  it("finds the first value", () => {
    const res = findClosestX32FaderPoint(0)
    expect(res.float).toBe(0)
  })

  it("finds the last value", () => {
    const res = findClosestX32FaderPoint(1)
    expect(res.float).toBe(1)
  })
})
