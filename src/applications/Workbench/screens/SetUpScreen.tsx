import { FC, useContext } from "react"
import { ConnectScreen } from "shared/components/ConnectScreen/ConnectScreen"
import { ScreenContainer } from "shared/components/ScreenContainer/ScreenContainer"
import styled from "styled-components"
import { MuteShareContext } from "../contexts/MuteShareContext"
import Button from "rsuite/Button"
import { colors } from "shared/styles"
// Types
type Props = {}
// Styles
const Container = styled.div`
  .sync-controls {
    display: flex;
    flex-direction: column;
    height: 430px;
    padding: 15px;
    color: ${colors.inverted.background};
    background: ${colors.inverted.background};
    border-radius: 5px;

    h1 {
      margin: unset;
      line-height: 1rem;
      font-size: 0.85rem;
      color: ${colors.inverted.text};
    }
  }
`

export const SetUpScreen: FC<Props> = () => {
  // Global State
  const {
    syncMixerAToB,
    syncMixerBToA,
    isConnected,
    canStartSync,
    canStopSync,
    startSync,
    endSync,
  } = useContext(MuteShareContext)

  // ..
  return (
    <Container>
      <ScreenContainer className="center clear-nav">
        <ConnectScreen className="white-bg" mixerKey="MixerA" />
        <ConnectScreen className="white-bg" mixerKey="MixerB" />
        <div className="sync-controls">
          <h1>Single Sync</h1>
          <Button
            id="save"
            appearance="ghost"
            disabled={!isConnected}
            onClick={syncMixerAToB}
          >
            Sync A (Master) to B
          </Button>
          <Button
            id="save"
            appearance="ghost"
            disabled={!isConnected}
            onClick={syncMixerBToA}
          >
            Sync B to A (Master)
          </Button>
          <h1>Sync Controls</h1>
          <Button
            id="sync-start"
            appearance="ghost"
            color="green"
            disabled={!canStartSync}
            onClick={startSync}
          >
            Start Sync
          </Button>
          <Button
            id="sync-end"
            appearance="ghost"
            color="orange"
            disabled={!canStopSync}
            onClick={endSync}
          >
            End Sync
          </Button>
        </div>
      </ScreenContainer>
    </Container>
  )
}
