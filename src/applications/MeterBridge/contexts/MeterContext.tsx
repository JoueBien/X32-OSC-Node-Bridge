import { MixerContext } from "@/shared/contexts/MixerContext"
import { filledArray } from "@/shared/utils/filledArray"
import {
  useBatchSubscribeMeter1,
  useBatchSubscribeMeter2,
} from "@/shared/hooks/useBatchSubscribe"
import { useFixedTick } from "@/shared/hooks/useFixedTick"
import { FixedArray } from "@/types/args"
import {
  FC,
  PropsWithChildren,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react"
import { useAsyncSetState } from "use-async-setstate"
import { useLayoutSettings } from "../hooks/useLayoutSettings"
import {
  MeterLayout,
  MeterLayoutItem,
  SelectedMeterPosition,
} from "../hooks/useLayoutSettings.types"

type AllMeterValues = [
  // Meter 1
  FixedArray<number, 32>,
  FixedArray<number, 32>,
  FixedArray<number, 32>,
  // Meter 2
  FixedArray<number, 16>,
  FixedArray<number, 6>,
  FixedArray<number, 3>,
  FixedArray<number, 16>,
  FixedArray<number, 6>,
  FixedArray<number, 2>,
]

export type Value = {
  /** Where all the current meter values are. */
  allMeterValues: AllMeterValues

  /** What meters to render on screen. */
  meterLayout: MeterLayout
  selectedMeterValue: MeterLayoutItem
  selectMeterValueToEdit: (position: SelectedMeterPosition) => void
  selectedMeterPosition: SelectedMeterPosition
  setMeterAt: (
    position: SelectedMeterPosition,
    item: MeterLayoutItem
  ) => void | boolean
}

export const MeterContext = createContext<Value>({
  // We cast this as any so we don't need to set huge fallbacks when there is no provider.
  allMeterValues: [] as any,
  meterLayout: [] as any,
  selectedMeterValue: "off",
  selectMeterValueToEdit: () => {},
  selectedMeterPosition: "off",
  setMeterAt: () => {},
})

export const MeterContextProvider: FC<PropsWithChildren> = ({ children }) => {
  // Shared State
  const { connected, mixers } = useContext(MixerContext)
  const { Mixer } = mixers

  const [allMeterValues, setAllMeterValues] = useAsyncSetState<AllMeterValues>([
    // Meter 1
    filledArray<32, number>(32, 0),
    filledArray<32, number>(32, 0),
    filledArray<32, number>(32, 0),
    // Meter 2
    filledArray<16, number>(16, 0),
    filledArray<6, number>(6, 0),
    filledArray<3, number>(3, 0),
    filledArray<16, number>(16, 0),
    filledArray<6, number>(6, 0),
    filledArray<2, number>(2, 0),
  ])

  const {
    meterLayout,
    setMeterAt,
    selectedMeterValue,
    selectMeterValueToEdit,
    selectedMeterPosition,
  } = useLayoutSettings()

  // For each meter source we store it
  const {
    start: start1,
    stop: stop1,
    getMeterData: getMeterData1,
  } = useBatchSubscribeMeter1({
    mixer: Mixer,
    frequency: 1,
  })

  const {
    start: start2,
    stop: stop2,
    getMeterData: getMeterData2,
  } = useBatchSubscribeMeter2({
    mixer: Mixer,
    frequency: 1,
  })

  // On screen update copy over the current value in the state
  const { start: startTick, stop: stopTick } = useFixedTick(
    async () => {
      const meter1Data = getMeterData1()
      const meter2Data = getMeterData2()

      const newValues: AllMeterValues = [
        // Meter 1
        meter1Data.slice(0, 0 + 32) as FixedArray<number, 32>,
        meter1Data.slice(32, 32 + 32) as FixedArray<number, 32>,
        meter1Data.slice(32 + 32, 32 + 32 + 32) as FixedArray<number, 32>,
        // Meter 2
        meter2Data.slice(0, 0 + 16) as FixedArray<number, 16>,
        meter2Data.slice(16, 16 + 6) as FixedArray<number, 6>,
        meter2Data.slice(16 + 6, 16 + 6 + 3) as FixedArray<number, 3>,
        meter2Data.slice(16 + 6 + 3, 16 + 6 + 3 + 16) as FixedArray<number, 16>,
        meter2Data.slice(16 + 6 + 3 + 16, 16 + 6 + 3 + 16 + 6) as FixedArray<
          number,
          6
        >,
        meter2Data.slice(
          16 + 6 + 3 + 16 + 6,
          16 + 6 + 3 + 16 + 6 + 2
        ) as FixedArray<number, 2>,
      ]
      setAllMeterValues(newValues)
    },
    { interval: 25, autoStart: false }
  )

  useEffect(() => {
    if (connected) {
      start1()
      start2()
      // start1()
      startTick()
    } else {
      stop1()
      stop2()
      // stop1()
      stopTick()
    }
  }, [connected])

  // We only wan't to update values a fixed rate
  const values = useMemo(
    () => ({
      allMeterValues,
      meterLayout,
      selectedMeterValue,
      selectMeterValueToEdit,
      selectedMeterPosition,
      setMeterAt,
    }),
    [
      allMeterValues,
      meterLayout,
      selectedMeterValue,
      selectMeterValueToEdit,
      selectedMeterPosition,
      setMeterAt,
    ]
  )

  return (
    <MeterContext.Provider value={values}>{children}</MeterContext.Provider>
  )
}
