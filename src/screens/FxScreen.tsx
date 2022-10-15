// Lib
import { FC, useContext } from "react"
import styled from "styled-components"
// Comps
import { MeterBridgeAllChannels } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllChannels"
import { MeterBridgeAllBus } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllBus"
import { MeterBridgeAllFx } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllFx"
import { MeterBridgeAllAux } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllAux"
import { FxUnit } from "../components/fxRack/FxUnit"
import { X32Context } from "../contexts/X32Context"
import { ARG_4 } from "../types/args"
import { FX_LABELS_1_4, FX_LABELS_5_8 } from "../types/fxTypes"

// Styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  /* padding: 15px; */

  .FxUnit {
    border: 1px solid black;
    width: calc(1920px / 2);
    height: calc(1920px / 7.2);
  }
`

export const FxScreen: FC = () => {
  const { fxTypeArgs, fxArgs, fxArgs1 } = useContext(X32Context)

  const channelArgs1 = fxArgs.slice(0,4) as ARG_4
  const channelArgs2 = fxArgs.slice(4,8) as ARG_4
  const channelArgs3 = fxArgs.slice(8,12) as ARG_4
  const channelArgs4 = fxArgs.slice(12,16) as ARG_4
  const channelArgs5 = fxArgs.slice(16,20) as ARG_4
  const channelArgs6 = fxArgs.slice(20,24) as ARG_4
  const channelArgs7 = fxArgs.slice(24,28) as ARG_4
  const channelArgs8 = fxArgs.slice(28,32) as ARG_4

  // ..
  return (
    <Container>
      {/* {JSON.stringify(fxTypeArgs)} */}
      <FxUnit fxUnit={1} fxTypeArg={fxTypeArgs[0]} fxArgs={fxArgs1} availableFx={FX_LABELS_1_4} channelArgs={channelArgs1} />
      <FxUnit fxUnit={2} fxTypeArg={fxTypeArgs[1]} availableFx={FX_LABELS_1_4} channelArgs={channelArgs2} />
      <FxUnit fxUnit={3} fxTypeArg={fxTypeArgs[2]} availableFx={FX_LABELS_1_4} channelArgs={channelArgs3} />
      <FxUnit fxUnit={4} fxTypeArg={fxTypeArgs[3]} availableFx={FX_LABELS_1_4} channelArgs={channelArgs4} />

      <FxUnit fxUnit={5} fxTypeArg={fxTypeArgs[4]} availableFx={FX_LABELS_5_8} channelArgs={channelArgs5} />
      <FxUnit fxUnit={6} fxTypeArg={fxTypeArgs[5]} availableFx={FX_LABELS_5_8} channelArgs={channelArgs6} />
      <FxUnit fxUnit={7} fxTypeArg={fxTypeArgs[6]} availableFx={FX_LABELS_5_8} channelArgs={channelArgs7} />
      <FxUnit fxUnit={8} fxTypeArg={fxTypeArgs[7]} availableFx={FX_LABELS_5_8} channelArgs={channelArgs8} />
    </Container>
  )
}
