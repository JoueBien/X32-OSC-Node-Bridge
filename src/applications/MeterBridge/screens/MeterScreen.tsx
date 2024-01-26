import { FC } from "react"
import { Meter } from "@/shared/components/Meter/Meter"
import {
  MBM7CL_POINTS,
  SL3_POINTS,
  X32_FULL_POINTS,
  X32_SHORT_POINTS,
  CUSTOM_POINTS,
} from "@/shared/helpers/meterPoints"

export const MeterScreen: FC<any> = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* 0.12589254 */}
        <Meter
          arg={0.13}
          points={CUSTOM_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "1px",
            radius: "4px",
          }}
        />
        <Meter
          arg={0.5}
          points={MBM7CL_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "1px",
            radius: "1px",
          }}
        />
        <Meter
          arg={0.5}
          points={SL3_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "1px",
            radius: "1px",
          }}
        />
        <Meter
          arg={0.5}
          points={X32_FULL_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "1px",
            radius: "1px",
          }}
        />
        <Meter
          arg={0.5}
          points={X32_SHORT_POINTS}
          label="123456789012"
          ledSize={{
            width: "30px",
            height: "20px",
            textSize: "10px",
            markerPadding: "8px",
            ledSegmentSpacing: "1px",
            radius: "1px",
          }}
        />
      </div>
    </div>
  )
}
