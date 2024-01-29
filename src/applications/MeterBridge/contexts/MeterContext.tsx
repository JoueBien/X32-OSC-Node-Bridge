import { useBatchSubscribe } from "@/shared/hooks/useBatchSubscribe"
import { useFixedTick } from "@/shared/hooks/useFixedTick"
import { FixedArray } from "@/types/args"
import { FC, PropsWithChildren, useMemo, createContext } from "react"
import { useAsyncSetState } from "use-async-setstate"

export type ChosenSource = {
  /** The input/bus. */
  meterSource: number
  /** The source on the input/bus. */
  meterPosition: number
}

export type Value = {
  /** Where to store what to show. */
  chosenSources: FixedArray<ChosenSource, 4>
  /** Where all the current meter values are. */
  allMeterValues: FixedArray<FixedArray<number, 4>, 1>
}

export const MeterContext = createContext<Value>({
  // We cast this as any so we don't need to set huge fallbacks when there is no provider.
  chosenSources: [] as any,
  allMeterValues: [] as any,
})

export const MeterContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allMeterValues, setAllMeterValues] = useAsyncSetState<
    FixedArray<FixedArray<number, 4>, 1>
  >([[0, 0, 0, 0]])

  const [chosenSources, _setChosenSources] = useAsyncSetState<
    FixedArray<ChosenSource, 4>
  >([
    { meterSource: 0, meterPosition: 0 },
    { meterSource: 0, meterPosition: 0 },
    { meterSource: 0, meterPosition: 0 },
    { meterSource: 0, meterPosition: 0 },
  ])

  // For each meter source we store it
  // TODO (ZR): set X32 below
  const {
    // start: start0,
    // stop: stop0,
    getMeterData: getMeterData0,
  } = useBatchSubscribe({} as any, {
    meterCommand: "/meters/6",
    args: [
      {
        type: "i",
        value: 0,
      },
    ],
    frequency: 1,
  })

  // On screen update copy over the current value in the state
  const {
    // start: startTick,
    // stop: stopTick
  } = useFixedTick(
    async () => {
      setAllMeterValues([getMeterData0()])
    },
    { interval: 25, autoStart: true }
  )

  // We only wan't to update values a fixed rate
  const value = useMemo(
    () => ({
      chosenSources,
      allMeterValues,
    }),
    [chosenSources, allMeterValues]
  )

  return <MeterContext.Provider value={value}>{children}</MeterContext.Provider>
}
