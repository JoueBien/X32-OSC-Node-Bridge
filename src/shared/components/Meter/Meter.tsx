// Libs
import { FC } from "react"
import styled from "styled-components"
import { LedSegment } from "./LedSegment" // Meter
// Comps
import { MeterPoints } from "@/shared/helpers/meterPoints"

// Styles
const Container = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: self-start;
  width: fit-content;

  padding-left: ${(props) => props.size.paddingLeft || "4px"};
  padding-right: ${(props) => props.size.paddingRight || "4px"};
  label {
    text-align: center;
    width: 100%;
    display: block;
    padding-bottom: 9px;
    font-weight: 600;
    font-size: 13px;
  }
`

// Defs
type Size = {
  width?: string
  height?: string
  textSize?: string
  markerPadding?: string
  paddingLeft?: string
  paddingRight?: string
  ledSegmentSpacing?: string
}
type Props = {
  arg?: number
  points?: MeterPoints
  label?: string
  hidden?: boolean
  ledSize?: Size
}

export const Meter: FC<Props> = (props) => {
  // Props
  const { arg, points, ledSize, label, hidden } = props
  const thePoints = points || []

  // Dirty way of hiding this
  if (hidden) {
    return null
  }

  // ..
  return (
    <Container className="Meter" size={ledSize}>
      {label && (
        <>
          <label>{label}</label>
        </>
      )}
      <LedSegment
        label="Clip"
        color="red"
        isOn={(arg || 0) === 1}
        size={ledSize}
      />
      {thePoints.map((point, index) => {
        if (point.fs === -Infinity || point.fs === 0) {
          return null
        }
        const min = thePoints[index + 1].arg
        const max = thePoints[index].arg
        return (
          <LedSegment
            key={point.fs}
            label={`${point.fs}`}
            arg={arg}
            min={min}
            max={max}
            size={{
              width: ledSize?.width,
              height: ledSize?.height,
              textSize: ledSize?.textSize,
              markerPadding: ledSize?.markerPadding,
              ledSegmentSpacing: ledSize?.ledSegmentSpacing,
            }}
            color={point.fs <= -18 ? "green" : "#FFBF00"}
          />
        )
      })}
      <LedSegment
        label="∞"
        color="green"
        size={ledSize}
        isOn={(arg || 0) > 0}
      />
    </Container>
  )
}
