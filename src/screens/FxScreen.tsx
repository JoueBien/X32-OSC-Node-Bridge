// Lib
import { FC } from "react"
import styled from "styled-components"
// Comps
import { MeterBridgeAllChannels } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllChannels"
import { MeterBridgeAllBus } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllBus"
import { MeterBridgeAllFx } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllFx"
import { MeterBridgeAllAux } from "../components/meterBridge/meterBridgeAll/MeterBridgeAllAux"

// Styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;

  .MeterBridgeBar + .MeterBridgeBar {
    margin-top: 24px;
  }
`

export const FxScreen: FC = () => {
  // ..
  return (
    <Container>
      Empty
      {/* <MeterBridgeAllChannels />
      <MeterBridgeAllBus />
      <MeterBridgeAllFx />
      <MeterBridgeAllAux /> */}
    </Container>
  )
}
