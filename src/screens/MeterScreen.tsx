// Lib
import { FC, useContext } from "react"
import styled from "styled-components"
// Comps
import { MeterBridgeChannels } from "../components/meterBridge/MeterBridgeChannels"
import { MeterBridgeBar } from "../components/meterBridge/MeterBridgeBar"
import { X32Context } from "../contexts/X32Context"
import { ARG_2, ARG_6, ARG_8 } from "../types/args"

// Styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .MeterBridgeBar + .MeterBridgeBar {
    margin-top: 32px;
  }
`

export const MeterScreen: FC = () => {
  // Global State
  const { chanelMeterArgs, bussMeterArgs, masterMeterArgs, masterCenterMeterArg } = useContext(X32Context)

  // Calc
  const ch1to8 = chanelMeterArgs.slice(0,8) as ARG_8
  const ch9to16 = chanelMeterArgs.slice(8,16) as ARG_8
  const ch17to24 = chanelMeterArgs.slice(16,24) as ARG_8
  const ch25to32 = chanelMeterArgs.slice(24,32) as ARG_8

  const buss1to8 = bussMeterArgs.slice(0,8) as ARG_8
  const buss9to16 = bussMeterArgs.slice(8,16) as ARG_8
  const matrix1to6 = masterMeterArgs.slice(0,6) as ARG_6
  // console.log(masterMeterArgs)
  const masterLRM = [
    ...masterMeterArgs.slice(6, 8),
    masterCenterMeterArg,
  ] as ARG_2

  // ..
  return <Container>
  <MeterBridgeBar>
    <MeterBridgeChannels channelArgs={ch1to8} label="Channels 1-8" channelLabels={["1", "2", "3", "4", "5", "6", "7","8"]} />
    <MeterBridgeChannels channelArgs={ch9to16} label="Channels 9-16" channelLabels={["9", "10", "11", "12", "13", "14", "15","16"]} />
    <MeterBridgeChannels channelArgs={ch17to24} label="Channels 17-24" channelLabels={["17", "18", "19", "20", "21", "22", "23","24"]} />
    <MeterBridgeChannels channelArgs={ch25to32} label="Channels 25-32" channelLabels={["25", "26", "27", "28", "29", "30", "31","32"]} />
  </MeterBridgeBar>
  <MeterBridgeBar>
    <MeterBridgeChannels channelArgs={buss1to8} label="Buss 1-8" channelLabels={["1", "2", "3", "4", "5", "6", "7","8"]} />
    <MeterBridgeChannels channelArgs={buss9to16} label="Buss 9-16" channelLabels={["9", "10", "11", "12", "13", "14", "15","16"]} />
    <div style={{width: "100%"}}/>
    <MeterBridgeChannels channelArgs={matrix1to6} size={6} label="Matrix 1-6" channelLabels={["MX1", "MX2", "MX3", "MX4", "MX5", "MX6", undefined, undefined]} />
    <MeterBridgeChannels channelArgs={masterLRM} size={3} label="Master" channelLabels={["Left", "Right", "Center", undefined, undefined, undefined, undefined, undefined]} />
    <div style={{width: "90px"}}/>
  </MeterBridgeBar>
  </Container>
  
}