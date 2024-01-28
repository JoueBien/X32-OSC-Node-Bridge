import { FC } from "react"
import { Meter } from "@/shared/components/Meter/Meter"
import { CUSTOM_POINTS } from "@/shared/helpers/meterPoints"

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
