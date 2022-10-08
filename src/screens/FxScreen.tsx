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
  const { fxTypeArgs, fxArgs, } = useContext(X32Context)

  const fx1Args = fxArgs.slice(0,4) as ARG_4
  const fx2Args = fxArgs.slice(4,8) as ARG_4
  const fx3Args = fxArgs.slice(8,12) as ARG_4
  const fx4Args = fxArgs.slice(12,16) as ARG_4
  const fx5Args = fxArgs.slice(16,20) as ARG_4
  const fx6Args = fxArgs.slice(20,24) as ARG_4
  const fx7Args = fxArgs.slice(24,28) as ARG_4
  const fx8Args = fxArgs.slice(28,32) as ARG_4

  // ..
  return (
    <Container>
      {/* {JSON.stringify(fxTypeArgs)} */}
      <FxUnit fxUnit={1} fxTypeArg={fxTypeArgs[0]} availableFx={FX_LABELS_1_4} channelArgs={fx1Args} />
      <FxUnit fxUnit={2} fxTypeArg={fxTypeArgs[1]} availableFx={FX_LABELS_1_4} channelArgs={fx2Args} />
      <FxUnit fxUnit={3} fxTypeArg={fxTypeArgs[2]} availableFx={FX_LABELS_1_4} channelArgs={fx3Args} />
      <FxUnit fxUnit={4} fxTypeArg={fxTypeArgs[3]} availableFx={FX_LABELS_1_4} channelArgs={fx4Args} />

      <FxUnit fxUnit={5} fxTypeArg={fxTypeArgs[4]} availableFx={FX_LABELS_5_8} channelArgs={fx5Args} />
      <FxUnit fxUnit={6} fxTypeArg={fxTypeArgs[5]} availableFx={FX_LABELS_5_8} channelArgs={fx6Args} />
      <FxUnit fxUnit={7} fxTypeArg={fxTypeArgs[6]} availableFx={FX_LABELS_5_8} channelArgs={fx7Args} />
      <FxUnit fxUnit={8} fxTypeArg={fxTypeArgs[7]} availableFx={FX_LABELS_5_8} channelArgs={fx8Args} />
    </Container>
  )
}
