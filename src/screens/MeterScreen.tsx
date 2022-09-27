// Lib
import { FC } from "react"
import styled from "styled-components"
// Comps
import { MeterBridgeAllChannels } from "../components/MeterBridgeAllChannels"
import { MeterBridgeAllBus } from "../components/MeterBridgeAllBus"

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

  // ..
  return <Container>
    <MeterBridgeAllChannels />
    <MeterBridgeAllBus />
  </Container>
  
}