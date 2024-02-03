import { FC, useContext } from "react"
import { Meter } from "@/shared/components/Meter/Meter"
import {
  CUSTOM_POINTS,
  CUSTOM_POINTS_REDUCTION,
} from "@/shared/helpers/meterPoints"
import { MeterContext } from "../contexts/MeterContext"
import { Reduction } from "@/shared/components/Meter/Reduction"

export const MeterScreen: FC<any> = () => {
  const { allMeterValues } = useContext(MeterContext)

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* 0.12589254 */}
        <Meter
          arg={allMeterValues[0][0]}
          points={CUSTOM_POINTS}
          label={
            <>
              GAIN/TRIM
              <br />
              CH1
              <br />
              123456789012
            </>
          }
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "2px",
            radius: "4px",
          }}
        />
        <Reduction
          arg={allMeterValues[0][1]}
          points={CUSTOM_POINTS}
          label={
            <>
              GATE(GR)
              <br />
              CH1
              <br />
              123456789012
            </>
          }
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "2px",
            radius: "4px",
          }}
        />
        <Reduction
          arg={allMeterValues[0][2]}
          points={CUSTOM_POINTS_REDUCTION}
          label={
            <>
              COMP(GR)
              <br />
              CH1
              <br />
              123456789012
            </>
          }
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "2px",
            radius: "4px",
          }}
        />
        <Meter
          arg={allMeterValues[0][3]}
          points={CUSTOM_POINTS}
          label={
            <>
              Post Fader
              <br />
              CH1
              <br />
              123456789012
            </>
          }
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "2px",
            radius: "4px",
          }}
        />
        <Meter
          arg={0.5}
          points={CUSTOM_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "2px",
            radius: "4px",
          }}
        />
      </div>
    </div>
  )
}
