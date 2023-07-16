import { FC, useContext } from "react"
import styled from "styled-components"
import { MuteShareContext } from "../contexts/MuteShareContext"
import Button from "rsuite/Button"
import { colors } from "shared/styles"
import { ConnectIpInput } from "shared/components/ConnectScreen/ConnectIpInput"
import { ConnectButton } from "shared/components/ConnectScreen/ConnectButton"
import { StoreButton } from "shared/components/ConnectScreen/StoreButton"
import { ConnectIpOptionList } from "shared/components/ConnectScreen/ConnectIpOptionList"
// Types
type Props = {}
// Styles
const Container = styled.div`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: flex-start;

  padding: 0.6rem;
  padding-top: 0px;

  .connect-controls {
    & + .connect-controls {
      margin-left: 0.3rem;
    }
  }

  .connect-group {
    padding: 0.3rem;
    border-radius: 0.3rem;
    border: 1px solid ${colors.inverted.background};

    & + .connect-group {
      margin-top: 0.3rem;
    }

    p {
      margin-bottom: 0.3rem;
    }

    button + button {
      margin-left: 0.3rem;
    }

    button.width-full {
      margin-left: 0px;
      margin-top: 0.3rem;
    }
  }
`

export const SetUpScreen: FC<Props> = () => {
  // Global State
  const {
    syncMixerAToB,
    syncMixerBToA,
    syncIsRunning,
    isConnected,
    canStartSync,
    canStopSync,
    startSync,
    endSync,
  } = useContext(MuteShareContext)

  // Functions
  const onSync = async () => {
    if (canStartSync) {
      startSync()
    } else if (canStopSync) {
      endSync()
    }
  }

  // ..
  return (
    <Container>
      {/* Connect to Mixers */}
      <div className="connect-controls">
        <div className="connect-group">
          <ConnectIpInput mixerKey="MixerA" />
          <div>
            <ConnectButton mixerKey="MixerA" />
            <StoreButton mixerKey="MixerA" />
          </div>
        </div>
        <div className="connect-group">
          <ConnectIpInput mixerKey="MixerB" />
          <div>
            <ConnectButton mixerKey="MixerB" />
            <StoreButton mixerKey="MixerB" />
          </div>
        </div>
      </div>
      {/* Recall and IP that is stored */}
      <div className="connect-controls">
        <div className="connect-group">
          <ConnectIpOptionList mixerKeys={["MixerA", "MixerB"]} />
        </div>
      </div>
      {/* Sync Management */}
      <div className="connect-controls">
        <div className="connect-group">
          <p>
            <b>Single Sync</b>
          </p>
          <Button
            className="Button-blue width-full"
            disabled={!isConnected}
            onClick={syncMixerAToB}
          >
            Sync A (Master) to B
          </Button>
          <Button
            className="Button-blue width-full"
            disabled={!isConnected}
            onClick={syncMixerBToA}
          >
            Sync B to A (Master)
          </Button>
        </div>

        <div className="connect-group">
          <p>
            <b>Sync Controls</b>
          </p>
          <Button
            className="Button-green"
            disabled={canStartSync === false && canStopSync === false}
            onClick={onSync}
          >
            Sync{" "}
            <div
              className={`led ${syncIsRunning && "green"} ${
                canStartSync && "yellow"
              }`}
            />
          </Button>
        </div>
      </div>
    </Container>
  )
}
