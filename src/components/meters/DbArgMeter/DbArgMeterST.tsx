// Libs
import { FC } from "react"
import styled from "styled-components"
import MeterSegment from "./MeterSegment"
// Comps
import { MeterPoints } from "../../../helpers/mixer/db"

// Styles
const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 75px;
  border-left: 1px solid white;
  border-right: 1px solid white;

  & + .DbArgMeter {
    border-left: 1px solid transparent;
  }


  .group {
    display: flex;

    & + .group {
      margin-top: 5px;
    }

    .MeterSegment {
      margin-top: unset;
    }

    .MeterSegment:first-child {
      width: 20px;
    }
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
  arg1?: number
  arg2?: number
  points?: MeterPoints
  halfHeight?: boolean
  label?: string
  hidden?: boolean
}

const DbArgMeterST: FC<Props> = (props) => {
  // Props
  const { arg1, arg2, points, halfHeight, label, hidden } = props
  const thePoints = points || []

  // Dirty way of hiding this
  if (hidden) {
    return null
  }

  // ..
  return (
    <MeterContainer className="DbArgMeter DbArgMeterST">
      {label && (
        <>
          <label>{label}</label>
        </>
      )}
      <div className="group">
        <MeterSegment
          color="red"
          isOn={(arg1 || 0) === 1}
          halfHeight={halfHeight}
        />
        <MeterSegment
          color="red"
          isOn={(arg2 || 0) === 1}
          halfHeight={halfHeight}
          label={"Clip"}
        />
        </div>
      {thePoints.map((point, index) => {
        if (point.fs === -Infinity || point.fs === 0) {
          return null
        }
        const min = thePoints[index + 1].arg
        const max = thePoints[index].arg
        return (
          <div className="group" key={point.fs}>
            <MeterSegment
              arg={arg1}
              min={min}
              max={max}
              halfHeight={halfHeight}
              color={point.fs <= -18 ? "green" : "#FFBF00"}
            />
            <MeterSegment
              label={`${point.fs}`}
              arg={arg2}
              min={min}
              max={max}
              halfHeight={halfHeight}
              color={point.fs <= -18 ? "green" : "#FFBF00"}
            />
          </div>
        )
      })}
      <div className="group">
        <MeterSegment
          color="green"
          isOn={(arg1 || 0) > 0}
          halfHeight={halfHeight}
        />
        <MeterSegment
          label="∞"
          color="green"
          isOn={(arg2 || 0) > 0}
          halfHeight={halfHeight}
        />
      </div>
    </MeterContainer>
  )
}

export default DbArgMeterST
