import { FC, useContext, useRef } from "react"
import { Meter } from "@/shared/components/Meter/Meter"
import {
  CUSTOM_POINTS,
  CUSTOM_POINTS_REDUCTION,
} from "@/shared/helpers/meterPoints"
import { MeterContext } from "../contexts/MeterContext"
import { Reduction } from "@/shared/components/Meter/Reduction"
import { FlyOutModal } from "@/shared/components/Modal/FlyOutModal"
import SelectPicker from "rsuite/SelectPicker"
import { MeterLayoutItemOptions } from "@/applications/MeterBridge/commandOptions/meters"
import {
  IsIndexREduction,
  MeterLayoutItem,
  SourceLabels,
} from "@/applications/MeterBridge/hooks/useLayoutSettings.types"
import styled from "styled-components"

const ledSize = {
  width: "30px",
  height: "20px",
  textSize: "10px",
  markerPadding: "8px",
  ledSegmentSpacing: "2px",
  radius: "4px",
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .meter-row {
    display: flex;
    flex-direction: row;

    .meter-cell {
      width: 90px;
      height: 320px;
      flex-shrink: 0;
    }

    .Reduction-label {
      /* Make the reduction meters the same height as standard meters. */
      margin-top: 130px;
    }
  }
`

export const MeterScreen: FC<any> = () => {
  // Refs
  const selectContainerRef = useRef()

  // Local State
  const {
    allMeterValues,
    meterLayout,
    selectMeterValueToEdit,
    selectedMeterValue,
    selectedMeterPosition,
    setMeterAt,
  } = useContext(MeterContext)

  // Functions
  const onMeterFromSelected = (value: MeterLayoutItem) => {
    setMeterAt(selectedMeterPosition, value)
  }

  // ..
  return (
    <div>
      <FlyOutModal isOpen={true} onClose={() => undefined}>
        <p>
          <b>Meter Settings</b>
        </p>
        <p>
          <br />
          <b>Meter From</b>
        </p>
        {JSON.stringify(selectedMeterPosition)}
        <div
          ref={selectContainerRef}
          style={{
            position: "relative",
          }}
        >
          <SelectPicker
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
      <Container>
        {meterLayout.map((row, rowIndex) => {
          return (
            <div className="meter-row" key={`row-${rowIndex}`}>
              {row.map((cellItem, columnIndex) => {
                const isReduction =
                  cellItem !== "off" && IsIndexREduction[cellItem.source]
                const MeterOrReduction = !isReduction ? Meter : Reduction
                const points = !isReduction
                  ? CUSTOM_POINTS
                  : CUSTOM_POINTS_REDUCTION

                // ..
                return (
                  <div
                    className="meter-cell"
                    key={`cell-${rowIndex}-${columnIndex}`}
                    onClick={() =>
                      selectMeterValueToEdit([rowIndex, columnIndex])
                    }
                  >
                    {cellItem === "off"}
                    {cellItem !== "off" && (
                      <>
                        <MeterOrReduction
                          arg={
                            allMeterValues[cellItem.source as number][
                              cellItem.from
                            ]
                          }
                          points={points}
                          label={
                            <>
                              {SourceLabels[cellItem.source]}{" "}
                              {cellItem.from + 1}
                            </>
                          }
                          ledSize={ledSize}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </Container>
    </div>
  )
}
