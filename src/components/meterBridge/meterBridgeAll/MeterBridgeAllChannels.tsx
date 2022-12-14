// Lib
import { FC, useContext } from "react"

// Comps
import { DbArgMeterWithLabel } from "../../meters/DbArgMeter/DbArgMeterWithLabel"
import { MeterBridgeBar } from "../MeterBridgeBar"
import { X32Context } from "../../../contexts/X32Context"
import { ARG_8 } from "../../../types/args"

export const MeterBridgeAllChannels: FC = () => {
  // Global State
  const { chanelMeterArgs } = useContext(X32Context)

  // Calc
  const ch1to8 = chanelMeterArgs.slice(0, 8) as ARG_8
  const ch9to16 = chanelMeterArgs.slice(8, 16) as ARG_8
  const ch17to24 = chanelMeterArgs.slice(16, 24) as ARG_8
  const ch25to32 = chanelMeterArgs.slice(24, 32) as ARG_8

  // ..
  return (
    <MeterBridgeBar>
      <DbArgMeterWithLabel
        channelArgs={ch1to8}
        label="Channels 1-8"
        channelLabels={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <DbArgMeterWithLabel
        channelArgs={ch9to16}
        label="Channels 9-16"
        channelLabels={["9", "10", "11", "12", "13", "14", "15", "16"]}
      />
      <DbArgMeterWithLabel
        channelArgs={ch17to24}
        label="Channels 17-24"
        channelLabels={["17", "18", "19", "20", "21", "22", "23", "24"]}
      />
      <DbArgMeterWithLabel
        channelArgs={ch25to32}
        label="Channels 25-32"
        channelLabels={["25", "26", "27", "28", "29", "30", "31", "32"]}
      />
    </MeterBridgeBar>
  )
}
