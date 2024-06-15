import { FC, useContext } from "react"
import { Meter } from "@/shared/components/Meter/Meter"
import {
  CUSTOM_POINTS,
  CUSTOM_POINTS_REDUCTION,
} from "@/shared/constraints/meterPoints"
import { MeterContext } from "../contexts/MeterContext"
import { Reduction } from "@/shared/components/Meter/Reduction"
import {
  IsIndexREduction,
  SourceLabels,
} from "@/applications/MeterBridge/hooks/useLayoutSettings.types"
import styled from "styled-components"
import { meterScreenStyles } from "./meterScreen.styles"

const ledSize = {
  width: "30px",
  height: "20px",
  textSize: "10px",
  markerPadding: "8px",
  ledSegmentSpacing: "2px",
  radius: "4px",
}

const Container = styled.div`
  ${meterScreenStyles}
`

export const MeterScreen: FC<any> = () => {
  // Local State
  const {
    allMeterValues,
    meterLayout,
    selectMeterValueToEdit,
    selectedMeterPosition,
  } = useContext(MeterContext)

  // ..
  return (
    // <div>
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
              const selectedClass =
                selectedMeterPosition !== "off" &&
                selectedMeterPosition[0] === rowIndex &&
                selectedMeterPosition[1] === columnIndex
                  ? "meter-cell-selected"
                  : ""
              // ..
              return (
                <div
                  className={`meter-cell ${selectedClass}`}
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
                            {/* TODO: We should calculate this once in out parent context. */}
                            {SourceLabels[cellItem.source]} {cellItem.from + 1}
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
    // </div>
  )
}
