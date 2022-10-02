// Lib
import { FC, useContext } from "react"
// Comps
import { DbArgMeterWithLabel } from "../../meters/DbArgMeter/DbArgMeterWithLabel"
import { MeterBridgeBar } from "../MeterBridgeBar"
import { X32Context } from "../../../contexts/X32Context"
import { ARG_3, ARG_6, ARG_8 } from "../../../types/args"

export const MeterBridgeAllBus: FC = () => {
  // Global State
  const { bussMeterArgs } = useContext(X32Context)

  // Calc
  const buss1to8 = bussMeterArgs.slice(0, 8) as ARG_8
  const buss9to16 = bussMeterArgs.slice(8, 16) as ARG_8
  const matrix1to6 = bussMeterArgs.slice(16, 22) as ARG_6
  const masterLRM = bussMeterArgs.slice(22, 25) as ARG_3

  // ..
  return (
    <MeterBridgeBar>
      <DbArgMeterWithLabel
        channelArgs={buss1to8}
        label="Buss 1-8"
        channelLabels={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <DbArgMeterWithLabel
        channelArgs={buss9to16}
        label="Buss 9-16"
        channelLabels={["9", "10", "11", "12", "13", "14", "15", "16"]}
      />
      <div style={{ width: "100%" }} />
      <DbArgMeterWithLabel
        channelArgs={matrix1to6}
        size={6}
        label="Matrix 1-6"
        channelLabels={[
          "MX1",
          "MX2",
          "MX3",
          "MX4",
          "MX5",
          "MX6",
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        channelArgs={masterLRM}
        size={3}
        label="Master"
        channelLabels={[
          "Left",
          "Right",
          "Center",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
    </MeterBridgeBar>
  )
}
