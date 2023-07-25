// Libs
import { FC } from "react"
import styled from "styled-components"
import { LedSegment } from "./LedSegment" // Meter
// Comps
import { MeterPoints } from "@/shared/helpers/meterPoints"

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50px;
  border-left: 1px solid white;
  border-right: 1px solid white;

  & + .Meter {
    border-left: 1px solid transparent;
  }

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
type Props = {
  arg?: number
  points?: MeterPoints
  label?: string
  hidden?: boolean
  ledSize?: {
    width?: string
    height?: string
    textLineHeight?: string
  }
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
    <Container className="Meter">
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
            size={ledSize}
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
