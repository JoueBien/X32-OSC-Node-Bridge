// Libs
import { FC, useContext } from "react"
import styled from "styled-components"
import Button from "rsuite/Button"
import Input from "rsuite/Input"
// Comps
import {
  MixerContext,
} from "shared/contexts/MixerContext"
import { ConnectFormContext } from "shared/contexts/ConnectFormContext"
import { connectionScreenStyles } from "./connectionScreenStyles"
import { WindowMixerSharedKey } from "../../../../electron/OSC/MixerEventListeners"

// Styles
const Container = styled.div`
  ${connectionScreenStyles}
`
// Defs
type Props = { mixerKey: WindowMixerSharedKey }

export const ConnectScreen: FC<Props> = ({ mixerKey }) => {
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
    <Container className="ConnectScreen">
      {/* The Connection form */}
      <div className="form">
        <h1> Connect to {mixerKey} </h1>
        <div className="form-item">
          <label htmlFor="ip">X32 IP Address</label>
          <Input id="ip" value={ip} onChange={onIpFiledChanged} />
          <div className="error" role="alert">
            {errors?.[mixerKey]?.ip || ""}
          </div>
        </div>
        <div className="form-item">
          <Button
            id="connect"
            appearance="ghost"
            color="green"
            disabled={
              connected[mixerKey] === true || canSubmit[mixerKey] !== true
            }
            onClick={onConnect}
          >
            Connect
          </Button>
          <Button
            id="disconnect"
            appearance="ghost"
            color="orange"
            disabled={connected[mixerKey] !== true}
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
          <Button
            id="save"
            appearance="ghost"
            disabled={canSubmit[mixerKey] === false}
            onClick={() => addIp(ip)}
          >
            Store
          </Button>
        </div>
      </div>
      {/* The recall for Ip addresses */}
      <div className="recall">
        <h1> Stored Ip Addresses </h1>
        {storedIps.storedIps.map((ipAddress, index) => {
          return (
            <div className="ip-address" key={`storedIps-${index}`}>
              <Button
                className="recall-button"
                appearance="ghost"
                onClick={() => setIp(ipAddress, mixerKey)}
              >
                {ipAddress}
              </Button>
              <Button
                className="remove"
                appearance="ghost"
                color="orange"
                onClick={() => removeIp(ipAddress)}
              >
                Remove
              </Button>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
