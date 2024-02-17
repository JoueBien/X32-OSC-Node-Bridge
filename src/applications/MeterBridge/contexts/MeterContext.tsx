import { MixerContext } from "@/shared/contexts/MixerContext"
import { filledArray } from "@/shared/helpers/filledArray"
import { useBatchSubscribeMeter1 } from "@/shared/hooks/useBatchSubscribe"
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
  FixedArray<number, 32>,
  FixedArray<number, 32>,
  FixedArray<number, 32>,
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
    filledArray<32, number>(32, 0),
    filledArray<32, number>(32, 0),
    filledArray<32, number>(32, 0),
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

  // On screen update copy over the current value in the state
  const { start: startTick, stop: stopTick } = useFixedTick(
    async () => {
      const meter1Data = getMeterData1()
      const newValues: AllMeterValues = [
        meter1Data.slice(0, 0 + 32) as FixedArray<number, 32>,
        meter1Data.slice(32, 32 + 32) as FixedArray<number, 32>,
        meter1Data.slice(32 + 32, 32 + 32 + 32) as FixedArray<number, 32>,
      ]
      setAllMeterValues(newValues)
    },
    { interval: 25, autoStart: false }
  )

  useEffect(() => {
    if (connected) {
      start1()
      // start1()
      startTick()
    } else {
      stop1()
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
