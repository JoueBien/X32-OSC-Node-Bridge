// Libs
import { FC, useContext } from "react"
import styled from "styled-components"
import Button from "rsuite/Button"
import Input from "rsuite/Input"
// Comps
import { MixerContext } from "shared/contexts/MixerContext"
import { ConnectFormContext } from "shared/contexts/ConnectFormContext"
import { connectionScreenStyles } from "./connectionScreenStyles"
import { WindowMixerSharedKey } from "../../../../electron/OSC/MixerEventListeners"
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
  // Global State
  const { connect, disconnect, connected } = useContext(MixerContext)
  const { settings, canSubmit, storedIps, removeIp, addIp, setIp, errors } =
    useContext(ConnectFormContext)
  const { ip } = settings[mixerKey] || { ip: "" }

  // Functions
  const onConnect = async () => {
    const res = await connect({ mixerIp: ip, debug: true }, mixerKey)
    if (res === false) {
      alert(`Failed to connect to ${mixerKey}. Could not find mixer at ${ip}`)
    }
  }
  const onDisconnect = () => {
    disconnect(mixerKey)
  }

  const onIpFiledChanged = (value: string) => {
    setIp(value, mixerKey)
  }

  // ..
  return (
    <Container className={`ConnectScreen ${className || ""}`}>
      {/* The Connection form */}
      <div className="form">
        <ConnectIpInput mixerKey={mixerKey}/>
        {/* <h1> Connect to {mixerKey} </h1>
        <div className="form-item">
          <label htmlFor="ip">X32 IP Address</label>
          <Input id="ip" value={ip} onChange={onIpFiledChanged} />
          <div className="error" role="alert">
            {errors?.[mixerKey]?.ip || ""}
          </div>
        </div> */}
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
