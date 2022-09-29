// Lib
import { FC } from "react"
import styled from "styled-components"
// Comps
import { MeterBridgeAllChannels } from "../components/meterBridgeAll/MeterBridgeAllChannels"
import { MeterBridgeAllBus } from "../components/meterBridgeAll/MeterBridgeAllBus"
import { MeterBridgeAllFx } from "../components/meterBridgeAll/MeterBridgeAllFx"
import { MeterBridgeAllAux } from "../components/meterBridgeAll/MeterBridgeAllAux"

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

export const MeterScreen: FC = () => {
  // ..
  return (
    <Container>
      <MeterBridgeAllChannels />
      <MeterBridgeAllBus />
      <MeterBridgeAllFx />
      <MeterBridgeAllAux />
    </Container>
  )
}
