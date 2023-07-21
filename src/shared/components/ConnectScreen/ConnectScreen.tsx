// Libs
import { FC } from "react"
import styled from "styled-components"
// Comps
import { connectionScreenStyles } from "./connectionScreenStyles"
import { WindowMixerSharedKey } from "@/electron/OSC/MixerEventListeners"
import { ConnectButton } from "./ConnectButton"
import { ConnectIpOptionList } from "./ConnectIpOptionList"
import { StoreButton } from "./StoreButton"
import { ConnectIpInput } from "./ConnectIpInput"

// Styles
const Container = styled.div`
  ${connectionScreenStyles}
`
// Defs
type Props = { mixerKey: WindowMixerSharedKey; className?: string }

export const ConnectScreen: FC<Props> = ({ mixerKey, className }) => {
  // ..
  return (
    <Container className={`ConnectScreen ${className || ""}`}>
      {/* The Connection form */}
      <div className="form">
        <ConnectIpInput mixerKey={mixerKey}/>
        <div className="form-item">
          <ConnectButton mixerKey={mixerKey} />
          <StoreButton mixerKey={mixerKey} />
        </div>
      </div>
      {/* The recall for Ip addresses */}
      <ConnectIpOptionList mixerKeys={[mixerKey]} />
    </Container>
  )
}
