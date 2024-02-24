import { FC, useContext, useRef } from "react"

import { MeterContext } from "../contexts/MeterContext"
import { FlyOutModal } from "@/shared/components/Modal/FlyOutModal"
import SelectPicker from "rsuite/SelectPicker"
import { MeterLayoutItemOptions } from "@/applications/MeterBridge/commandOptions/meters"
import { MeterLayoutItem } from "@/applications/MeterBridge/hooks/useLayoutSettings.types"

export const MeterSettingsFlyOutModal: FC<any> = () => {
  // Refs
  const selectContainerRef = useRef()

  // Local State
  const {
    selectedMeterValue,
    selectedMeterPosition,
    setMeterAt,
    selectMeterValueToEdit,
  } = useContext(MeterContext)

  const editFlyOutIsOpen = selectedMeterPosition !== "off"

  // Functions
  const onMeterFromSelected = (value: MeterLayoutItem) => {
    setMeterAt(selectedMeterPosition, value)
  }

  // ..
  return (
    <FlyOutModal
      isOpen={editFlyOutIsOpen}
      closeOnEscape
      onClose={() => selectMeterValueToEdit("off")}
    >
      <p>
        <b>Meter Source</b>
        <br />
        <br />
        {selectedMeterPosition !== "off" && (
          <>
            <label htmlFor="meter-source-control">
              Editing: Row {selectedMeterPosition[0] + 1}, Column{" "}
              {selectedMeterPosition[1] + 1}
            </label>
            <br />
            <br />
          </>
        )}
      </p>

      <div
        ref={selectContainerRef}
        style={{
          position: "relative",
        }}
      >
        <SelectPicker
          id="meter-source-control"
          className="SelectPicker"
          groupBy="role"
          container={() => selectContainerRef.current}
          data={MeterLayoutItemOptions}
          value={selectedMeterValue}
          onSelect={onMeterFromSelected}
          style={{
            // This has to be a fixed size because the re-size observer is broken
            width: "360px",
          }}
        />
      </div>
    </FlyOutModal>
  )
}
