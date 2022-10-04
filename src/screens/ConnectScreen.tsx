// Libs
import { FC, useContext } from "react"
import styled from "styled-components"
import Button from "rsuite/Button"
import Input from "rsuite/Input"
// Comps
import { X32Context } from "../contexts/X32Context"
import { ConnectFormContext } from "../contexts/ConnectFormContext"
import { connectionScreenStyles } from "./connectionScreenStyles"

// Styles
const Container = styled.div`
  ${connectionScreenStyles}
`
// Defs
type Props = {}

export const ConnectScreen: FC<Props> = () => {
  // Global State
  const { connect, disconnect, connected } = useContext(X32Context)
  const { settings, canSubmit, storedIps, removeIp, addIp, setIp, errors } =
    useContext(ConnectFormContext)
  const { ip } = settings

  // Functions
  const onConnect = () => {
    connect({ mixerIp: ip, debug: true })
  }

  return (
    <Container className="ConnectScreen">
      {/* The Connection form */}
      <div className="form">
        <h1> Connection </h1>
        <div className="form-item">
          <label htmlFor="ip">X32 IP Address</label>
          <Input id="ip" value={ip} onChange={setIp} />
          <div className="error" role="alert">
            {errors?.ip || ""}
          </div>
        </div>
        <div className="form-item">
          <Button
            id="connect"
            appearance="ghost"
            color="green"
            disabled={connected === true || canSubmit !== true}
            onClick={onConnect}
          >
            Connect
          </Button>
          <Button
            id="disconnect"
            appearance="ghost"
            color="orange"
            disabled={connected !== true}
            onClick={disconnect}
          >
            Disconnect
          </Button>
          <Button
            id="save"
            appearance="ghost"
            disabled={canSubmit === false}
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
                onClick={() => setIp(ipAddress)}
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
