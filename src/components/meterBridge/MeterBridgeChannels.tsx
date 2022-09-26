// Libs
import { FC } from "react"
import styled from "styled-components"
// Comps
import { MBM7CL_POINTS } from "../../helpers/mixer/db"
import { ARG_2, ARG_3, ARG_4, ARG_6, ARG_8 } from "../../types/args"
import DbArgMeter from "../DbArgMeter"

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  &+ .MeterBridgeChannels {
    margin-left: 8px;
  }
  
  .meter-group {
    display: flex;
    flex-direction: row;

    border-left: 1px solid white;
    padding-left: 4px;

    .DbArgMeter {
      border-right: 1px solid white;
      padding-right: 4px;

      &+ .DbArgMeter {
        margin-left: 8px;
      }
    }
  }

  .meter-group-label {
    position: relative;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 8px;

    font-weight: 600;
    border-bottom: 1px solid white;
    
    &::before {
      content: " ";
      position: absolute;
      left: 0px;
      height: 16px;
      width: 1px;
      background: white;
      bottom: 0px;
    }

    &::after {
      content: " ";
      position: absolute;
      right: 0px;
      height: 16px;
      width: 1px;
      background: white;
      bottom: 0px;
    }
  }
`

// Defs
export type OptionalChannelLabel = string | undefined
export type ChannelLabels8 = [
  OptionalChannelLabel, OptionalChannelLabel, OptionalChannelLabel, OptionalChannelLabel,
  OptionalChannelLabel, OptionalChannelLabel, OptionalChannelLabel, OptionalChannelLabel,
]

type Props = {
  label?: string
  channelLabels?: ChannelLabels8
  channelArgs?: ARG_8 | ARG_6 | ARG_4 | ARG_3 | ARG_2
  size?: 8 | 6 | 4 | 3 | 2 | 0
}

export const MeterBridgeChannels: FC<Props> = ({
  label, channelLabels, channelArgs, size = 8
}) => {

  // ..
  return <Container className="MeterBridgeChannels">
    <div className="meter-group">
      <DbArgMeter hidden={!(size >= 1)} arg={(channelArgs?.[0] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[0]}/>
      <DbArgMeter hidden={!(size >= 2)} arg={(channelArgs?.[1] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[1]}/>
      <DbArgMeter hidden={!(size >= 3)} arg={(channelArgs?.[2] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[2]}/>
      <DbArgMeter hidden={!(size >= 4)} arg={(channelArgs?.[3] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[3]}/>
      <DbArgMeter hidden={!(size >= 5)} arg={(channelArgs?.[4] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[4]}/>
      <DbArgMeter hidden={!(size >= 6)} arg={(channelArgs?.[5] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[5]}/>
      <DbArgMeter hidden={!(size >= 7)} arg={(channelArgs?.[6] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[6]}/>
      <DbArgMeter hidden={!(size >= 8)} arg={(channelArgs?.[7] || 0) as number} points={MBM7CL_POINTS} halfHeight={true} label={channelLabels?.[7]}/>
    </div>
    <label className="meter-group-label">{label || ""}</label>
  </Container>
}

