// Lib
import { FC, useContext } from "react"

// Comps
import { DbArgMeterWithLabel } from "../../meters/DbArgMeter/DbArgMeterWithLabel"
import { MeterBridgeBar } from "../MeterBridgeBar"
import { X32Context } from "../../../contexts/X32Context"
import { ARG_4 } from "../../../types/args"

export const MeterBridgeAllFx: FC = () => {
  // Global State
  const { fxArgs } = useContext(X32Context)

  // Calc
  const fx1 = fxArgs.slice(0, 4) as ARG_4
  const fx2 = fxArgs.slice(4, 8) as ARG_4
  const fx3 = fxArgs.slice(8, 12) as ARG_4
  const fx4 = fxArgs.slice(12, 16) as ARG_4
  const fx5 = fxArgs.slice(16, 20) as ARG_4
  const fx6 = fxArgs.slice(20, 24) as ARG_4
  const fx7 = fxArgs.slice(24, 28) as ARG_4
  const fx8 = fxArgs.slice(28, 32) as ARG_4

  // ..
  return (
    <MeterBridgeBar>
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx1}
        size={4}
        label="Fx In/out 1"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx2}
        size={4}
        label="Fx In/out 2"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx3}
        size={4}
        label="Fx In/out 3"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx4}
        size={4}
        label="Fx In/out 4"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx5}
        size={4}
        label="Fx In/out 5"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx6}
        size={4}
        label="Fx In/out 6"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx7}
        size={4}
        label="Fx In/out 7"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
      <DbArgMeterWithLabel
        className="quarter"
        channelArgs={fx8}
        size={4}
        label="Fx In/out 8"
        channelLabels={[
          "In L",
          "In R",
          "Out L",
          "Out R",
          undefined,
          undefined,
          undefined,
          undefined,
        ]}
      />
    </MeterBridgeBar>
  )
}
