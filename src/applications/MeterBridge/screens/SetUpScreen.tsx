import { FC } from "react"
import styled from "styled-components"
import { colors } from "@/shared/styles"
import { ConnectIpInput } from "@/shared/components/ConnectScreen/ConnectIpInput"
import { StoreButton } from "@/shared/components/ConnectScreen/StoreButton"
import { ConnectIpOptionList } from "@/shared/components/ConnectScreen/ConnectIpOptionList"
import { ConnectButton } from "@/shared/components/ConnectScreen/ConnectButton"
import { FlyOutModal } from "@/shared/components/Modal/FlyOutModal"
import { screenContainerStyles } from "@/shared/styles/screenContainerStyles"

// Types
type Props = {
  isOpen: boolean
  onClose: () => void
}

// Styles
const Container = styled.div`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: flex-start;

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

export const SetUpScreen: FC<Props> = ({ isOpen, onClose }) => {
  // ..
  return (
    <FlyOutModal
      isOpen={isOpen}
      openWidth="calc(420px + 2.1rem)"
      closeOnEscape
      onClose={onClose}
    >
      <Container>
        {/* Connect to Mixer */}
        <div className="connect-controls">
          <div className="connect-group">
            <ConnectIpInput
              mixerKey="Mixer"
              title={false}
              label={
                <>
                  <b>Set IP Address for Mixer</b>
                </>
              }
            />
            <div>
              {/* <ConnectButton mixerKey="MixerA" /> */}
              <StoreButton mixerKey="Mixer" />
            </div>
            <br />
            <p>
              <b>Start connection with Mixers</b>
            </p>
            <ConnectButton mixerKey="Mixer" />
          </div>
        </div>
        {/* Recall and IP that is stored */}
        <div className="connect-controls">
          <div className="connect-group">
            <ConnectIpOptionList mixerKeys={["Mixer"]} />
          </div>
        </div>
      </Container>
    </FlyOutModal>
  )
}
