// Libs
import { FC, useContext, useState } from "react"
import styled from "styled-components"
import Button from "rsuite/Button"
import Input from "rsuite/Input"
// Comps
import { X32Context } from "../contexts/X32Context"
import { ConnectFormContext } from "../contexts/ConnectFormContext"

// Styles
const Container = styled.div`
  .form-item {
    max-width: 400px;
  }

  .form-item + .form-item {
    margin-top: 15px;
  }

  button + button {
    margin-left: 15px;
  }
`
// Defs
type Props = {}

export const ConnectScreen: FC<Props> = () => {
  // Global State
  const { connect, disconnect, connected } = useContext(X32Context)
  const { settings, setIp } = useContext(ConnectFormContext)
  const { ip } = settings
  // Local State
  // const [ip, setIp] = useState<string>("192.168.0.30")

  const onConnect = () => {
    connect({ mixerIp: ip, debug: true })
  }

  return (
    <Container className="ConnectScreen">
      <div className="form-item">
        <label htmlFor="ip">X32 IP Address</label>
        {/* value="192.168.0.30" */}
        <Input id="ip" defaultValue={ip} onChange={setIp} />
      </div>
      <div className="form-item">
        <Button
          id="connect"
          appearance="ghost"
          disabled={connected === true}
          onClick={onConnect}
        >
          Connect
        </Button>
        <Button
          id="disconnect"
          appearance="ghost"
          disabled={connected !== true}
          onClick={disconnect}
        >
          Disconnect
        </Button>
      </div>
    </Container>
  )
}
