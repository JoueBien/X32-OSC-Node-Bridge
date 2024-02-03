// Libs
import { FC, Fragment, ReactNode } from "react"
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
  /* width: fit-content; */

  padding-left: ${(props) => props.size.paddingLeft || "4px"};
  padding-right: ${(props) => props.size.paddingRight || "4px"};

  .Meter-label {
    /* text-align: center; */
    width: 100%;
    display: block;
    padding-top: 9px;
    font-weight: 600;
    font-size: ${(props) => props.size.textSize || "20px"};
    letter-spacing: 0.05rem;
    text-transform: uppercase;
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
  radius?: string
}

type Props = {
  arg?: number
  points?: MeterPoints
  label?: string | ReactNode
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
      <LedSegment
        label="Clip"
        color="red"
        isOn={(arg || 0) === 1}
        size={ledSize}
      />
      {thePoints.map((point, index) => {
        if (point.fs === -Infinity || point.fs === 0) {
          return <Fragment key={point.fs} />
        }
        // Min is the next smallest segment.
        // Remember render order starts a the peak (0).
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
      {label && (
        <>
          <div className="Meter-label">{label}</div>
        </>
      )}
    </Container>
  )
}
