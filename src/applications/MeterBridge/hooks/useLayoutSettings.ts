import { useAsyncSetState } from "use-async-setstate"
import {
  MeterLayout,
  MeterLayoutItem,
  SelectedMeterPosition,
  Source,
} from "./useLayoutSettings.types"

export function useLayoutSettings() {
  const [selectedMeterPosition, setSelectedPosition] =
    useAsyncSetState<SelectedMeterPosition>([0, 0])

  const [meterLayout, setMeterLayout] = useAsyncSetState<MeterLayout>([
    [
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGate, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
    ],
    [
      { source: Source.ChannelGain, from: 2 },
      { source: Source.ChannelGain, from: 3 },
      { source: Source.ChannelGain, from: 2 },
      // { source: Source.ChannelGain, from: 3 },
      "off",
      { source: Source.ChannelGain, from: 2 },
      { source: Source.ChannelGain, from: 3 },
      { source: Source.ChannelGain, from: 2 },
      "off",
    ],
    [
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
      { source: Source.ChannelGain, from: 0 },
      { source: Source.ChannelComp, from: 0 },
    ],
  ])

  const selectedMeterValue =
    selectedMeterPosition !== "off"
      ? meterLayout[selectedMeterPosition[0]][selectedMeterPosition[1]]
      : "off"

  const setMeterAt = (
    position: SelectedMeterPosition,
    item: MeterLayoutItem
  ) => {
    if (position === "off") {
      return false
    }
    const [row, column] = position
    const newArray = [...meterLayout] as MeterLayout
    newArray[row][column] = item
    setMeterLayout(newArray)
  }

  const selectMeterValueToEdit = (position: SelectedMeterPosition) => {
    setSelectedPosition(position)
  }

  return {
    meterLayout,
    setMeterAt,
    selectedMeterValue,
    selectMeterValueToEdit,
    selectedMeterPosition,
  }
}
