import { subscribeFixedTick, unsubscribeFixedTick } from "./fixedTick"
import { delay } from "./time"

describe("fixedTick", () => {
  it("runs at 500ms if no frequencyMs is set", async () => {
    const tickFunc = jest.fn()
    const ref = subscribeFixedTick(tickFunc)

    // We have everything on the ref
    expect(Object.keys(ref)).toEqual(
      expect.arrayContaining([
        "interval",
        "frequencyMs",
        "onTick",
        "isRunning",
        "clear",
      ])
    )

    // We got the right values on the ref
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 500,
        onTick: tickFunc,
        isRunning: true,
      })
    )

    // It only ran twice and stopped.
    await delay(1200)
    ref.clear()
    expect(tickFunc).toHaveBeenCalledTimes(2)
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 500,
        onTick: tickFunc,
        isRunning: false,
      })
    )
  })

  it("runs at 100ms if frequencyMs is set", async () => {
    const tickFunc = jest.fn()
    const ref = subscribeFixedTick(tickFunc, 100)

    // We have everything on the ref
    expect(Object.keys(ref)).toEqual(
      expect.arrayContaining([
        "interval",
        "frequencyMs",
        "onTick",
        "isRunning",
        "clear",
      ])
    )

    // We got the right values on the ref
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 100,
        onTick: tickFunc,
        isRunning: true,
      })
    )

    // It only ran twice and stopped.
    await delay(220)
    ref.clear()
    expect(tickFunc).toHaveBeenCalledTimes(2)
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 100,
        onTick: tickFunc,
        isRunning: false,
      })
    )

    // It actually stopped and didn't run once more.
    await delay(120)
    expect(tickFunc).toHaveBeenCalledTimes(2)
  })

  it("manual clean up works", async () => {
    const tickFunc = jest.fn()
    const ref = subscribeFixedTick(tickFunc, 100)

    // We have everything on the ref
    expect(Object.keys(ref)).toEqual(
      expect.arrayContaining([
        "interval",
        "frequencyMs",
        "onTick",
        "isRunning",
        "clear",
      ])
    )

    // We got the right values on the ref
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 100,
        onTick: tickFunc,
        isRunning: true,
      })
    )

    // It only ran twice and stopped.
    await delay(220)
    unsubscribeFixedTick(ref)
    expect(tickFunc).toHaveBeenCalledTimes(2)
    expect(ref).toMatchObject(
      expect.objectContaining({
        frequencyMs: 100,
        onTick: tickFunc,
        isRunning: false,
      })
    )

    // It actually stopped and didn't run once more.
    await delay(220)
    expect(tickFunc).toHaveBeenCalledTimes(2)
  })
})
