import { useAsyncSetState } from "use-async-setstate"
import {
  MeterLayout,
  MeterLayoutItem,
  SelectedMeterPosition,
  Source,
} from "./../useLayoutSettings.types"
import { FixedArray } from "@/types/args"
import { filledArray } from "@/shared/utils/filledArray"

function generateDefaultLayoutColumns(): FixedArray<MeterLayoutItem, 96> {
  return filledArray<96, MeterLayoutItem>(96, () => ({
    source: Source.ChannelGain,
    from: 0,
  }))
}

function generateDefaultLayout(): MeterLayout {
  return filledArray<8, FixedArray<MeterLayoutItem, 96>>(8, () =>
    generateDefaultLayoutColumns()
  )
}

export function useMeterSourceMap() {
  // Local State
  const [editingMeterSource, setEditingMeterSource] =
    useAsyncSetState<SelectedMeterPosition>("off")

  const [meterSourceMap, setMeterSourceMap] = useAsyncSetState<MeterLayout>(
    generateDefaultLayout()
  )

  // Calc
  const editingMeterSourceValue =
    editingMeterSource !== "off"
      ? meterSourceMap[editingMeterSource[0]][editingMeterSource[1]]
      : "off"

  // Functions
  const setMeterAt = (
    position: SelectedMeterPosition,
    item: MeterLayoutItem
  ) => {
    if (position === "off") {
      return false
    }
    const [row, column] = position
    const newArray = [...meterSourceMap] as MeterLayout
    newArray[row][column] = item
    setMeterSourceMap(newArray)
  }

  const selectMeterValueToEdit = (position: SelectedMeterPosition) => {
    if (JSON.stringify(position) === JSON.stringify(editingMeterSource)) {
      setEditingMeterSource("off")
    } else {
      setEditingMeterSource(position)
    }
  }

  const resetEditingMeterSource = () => {
    setEditingMeterSource("off")
  }

  const resetMeterSourceMap = () => {
    setMeterSourceMap(generateDefaultLayout())
  }

  return {
    meterSourceMap,
    setMeterAt,
    selectMeterValueToEdit,
    editingMeterSourceValue,
    editingMeterSource,
    resetEditingMeterSource,
    resetMeterSourceMap,
  }
}

export type UseMeterSourceMap = ReturnType<typeof useMeterSourceMap>
