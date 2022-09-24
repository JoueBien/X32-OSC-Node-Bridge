// Libs
import { FC } from "react"
import styled from "styled-components"
import MeterSegment from "./MeterSegment"
// Comps
import { points, point18, MeterPoints } from "../helpers/mixer/db"

// Styles
const MeterContainer = styled.div`
  label {
    text-align: center;
    width: 100%;
    display: block;
    padding-bottom: 9px;
    font-weight: 600;
  }
`

// Defs
type Props = {
  arg?: number
  points?: MeterPoints
  halfHeight?: boolean
  label?: string
}

const DbArgMeter: FC<Props> = (props) => {
  // Props
  const { arg, points, halfHeight, label } = props
  const thePoints = points || []

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
