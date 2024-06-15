// Libs
import { FC, Fragment, ReactNode } from "react"
import styled from "styled-components"
import { LedSegment, MeterSegmentColor } from "./LedSegment" // Meter
// Comps
import { MeterPoints } from "@/shared/constraints/meterPoints"
import { LedSegmentInverted } from "./LedSegmentInverted"

// Styles
const Container = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: self-start;
  /* width: fit-content; */

  padding-left: ${(props) => props.size.paddingLeft || "4px"};
  padding-right: ${(props) => props.size.paddingRight || "4px"};

  .Reduction-label {
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
  ledColor?: (fs: number) => MeterSegmentColor
}

function fallBackColor(fs: number) {
  return fs >= -12 ? "#FFBF00" : "red"
}

export const Reduction: FC<Props> = (props) => {
  // Props
  const { arg, points, ledSize, label, hidden, ledColor } = props
  const thePoints = points || []
  const color = ledColor || fallBackColor

  // Dirty way of hiding this
  if (hidden) {
    return null
  }

  // ..
  return (
    <Container className="Reduction" size={ledSize}>
      <LedSegment label="GR" color="red" isOn={true} size={ledSize} />

      {thePoints.map((point, index) => {
        if (point.fs === -Infinity || point.fs === 0) {
          return <Fragment key={point.fs} />
        }
        // Min is the next smallest segment.
        // Remember render order starts a the peak (0).
        const min = thePoints[index + 1].arg
        const max = thePoints[index].arg
        return (
          <LedSegmentInverted
            key={point.fs}
            label={`${point.fs}`}
            arg={arg}
            min={min}
            max={max}
            size={ledSize}
            color={color(point.fs)}
          />
        )
      })}
      {label && (
        <>
          <div className="Reduction-label">{label}</div>
        </>
      )}
    </Container>
  )
}
