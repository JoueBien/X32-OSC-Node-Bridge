import { FC, useContext } from "react"
import styled from "styled-components"
import { MuteShareContext } from "../contexts/MuteShareContext"
import Button from "rsuite/Button"
import { colors } from "@/shared/styles"
import { ConnectIpInput } from "@/shared/components/ConnectScreen/ConnectIpInput"
import { StoreButton } from "@/shared/components/ConnectScreen/StoreButton"
import { ConnectIpOptionList } from "@/shared/components/ConnectScreen/ConnectIpOptionList"
import { ConnectButtonMultiple } from "@/shared/components/ConnectScreen/ConnectButtonMultiple"
import {
  DialogueQuestionArgs,
  DialogueQuestionResponseArgs,
  WindowWithIpcRenderer,
} from "@/types/dialogues"
import { v4 as uuid } from "uuid"

const { ipcRenderer } = window as unknown as WindowWithIpcRenderer

// Types
type Props = NonNullable<unknown>

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

  const onConnectThenDo = async () => {
    // if user is asked to sync then do it :)
    await endSync()
    const channel = uuid()
    const args: DialogueQuestionArgs = {
      channel,
      options: {
        message: "Connected. How do you want to start Syncing mutes?",
        detail:
          "Recalling will make mutes on the console the same before Synchronizing the mutes.",
        buttons: [
          "Skip",
          "Sync",
          "Recall  A to B then Sync",
          "Map B to A then Sync",
        ],
      },
    }
    ipcRenderer.send("dialogue-question", args)
    ipcRenderer.once(
      channel,
      async (event, arg: DialogueQuestionResponseArgs) => {
        const { button } = arg
        switch (button) {
          case 1:
            await startSync()
            break
          case 2:
            await syncMixerAToB()
            await startSync()
            break
          case 3:
            await syncMixerBToA()
            await startSync()
            break
        }
      }
    )
  }

  // ..
  return (
    <Container>
      {/* Connect to Mixers */}
      <div className="connect-controls">
        <div className="connect-group">
          <ConnectIpInput
            mixerKey="MixerA"
            title={false}
            label={
              <>
                <b>Set IP Address for Mixer A</b>
              </>
            }
          />
          <div>
            {/* <ConnectButton mixerKey="MixerA" /> */}
            <StoreButton mixerKey="MixerA" />
          </div>
          <br />
          {/* </div>
        <div className="connect-group"> */}
          <ConnectIpInput
            mixerKey="MixerB"
            title={false}
            label={
              <>
                <b>Set IP Address for Mixer B</b>
              </>
            }
          />
          <div>
            <StoreButton mixerKey="MixerB" />
            {/* <ConnectButton mixerKey="MixerB" /> */}
          </div>
          <br />
          {/* </div>
        <div className="connect-group"> */}
          <p>
            <b>Start connection with Mixers</b>
          </p>
          <ConnectButtonMultiple
            mixerKeys={["MixerA", "MixerB"]}
            onSuccess={onConnectThenDo}
          />
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
            <b>Recall mutes from one console to the other.</b>
          </p>
          <Button
            className="Button-blue width-full"
            disabled={!isConnected}
            onClick={syncMixerAToB}
          >
            Recall A (Master) to B
          </Button>
          <Button
            className="Button-blue width-full"
            disabled={!isConnected}
            onClick={syncMixerBToA}
          >
            Recall B to A (Master)
          </Button>
        </div>

        <div className="connect-group">
          <p>
            <b>Sync Mutes between consoles</b>
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
