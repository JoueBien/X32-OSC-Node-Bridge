// Libs
import { FC } from "react"
import styled from "styled-components"
import MeterSegment from "./meterSegments.tsx/MeterSegment"
// Comps
import { points, point18, MeterPoints } from "../helpers/mixer/db"

// Styles
const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50px;
  border-left: 1px solid white;
  border-right: 1px solid white;

  & + .DbArgMeter {
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
  halfHeight?: boolean
  label?: string
  hidden?: boolean
}

const DbArgMeter: FC<Props> = (props) => {
  // Props
  const { arg, points, halfHeight, label, hidden } = props
  const thePoints = points || []

  // Dirty way of hiding this
  if (hidden) {
    return null
  }

  // ..
  return (
    <MeterContainer className="DbArgMeter">
      {(label) && <>
        <label>{label}</label>
      </>}
      <MeterSegment label="Clip" color="red" isOn={(arg || 0) === 1} halfHeight={halfHeight} />
      {thePoints.map((point, index) => {
        if (point.fs === -Infinity || point.fs === 0) {
          return null
        }
        const min = thePoints[index+1].arg
        const max = thePoints[index].arg
        return <MeterSegment key={point.fs} label={`${point.fs}`} arg={arg} min={min} max={max} halfHeight={halfHeight} color={point.fs <= -18 ? "green" : "#FFBF00"} />
      })}
      <MeterSegment label="∞" color="green" isOn={(arg || 0) > 0} halfHeight={halfHeight} />
    </MeterContainer>
  )
}

export default DbArgMeter
