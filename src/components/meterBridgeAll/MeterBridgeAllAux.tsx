// Lib
import { FC, useContext } from "react"

// Comps
import { MeterBridgeChannels } from "../meterBridge/MeterBridgeChannels"
import { MeterBridgeBar } from "../meterBridge/MeterBridgeBar"
import { X32Context } from "../../contexts/X32Context"
import { ARG_6, ARG_8 } from "../../types/args"

export const MeterBridgeAllAux: FC = () => {
  // Global State
  const { auxArgs } = useContext(X32Context)

  // Calc
  const auxSends = auxArgs.slice(0, 6) as ARG_6
  const auxReturns = auxArgs.slice(6, 14) as ARG_8

  // ..
  return (
    <MeterBridgeBar>
      <MeterBridgeChannels
        channelArgs={auxSends}
        size={6}
        label="Aux Sends 1-6"
        channelLabels={["1", "2", "3", "4", "5", "6", undefined, undefined]}
      />
      <MeterBridgeChannels
        channelArgs={auxReturns}
        label="Aux Returns 1-8"
        channelLabels={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
    </MeterBridgeBar>
  )
}
