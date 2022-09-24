// Libs
import { FC, FormEvent, useContext, useState } from "react"
import styled from "styled-components"
// Comps
import { X32Context } from "../contexts/X32Context"

// Styles
const Container = styled.div`
`
// Defs
type Props = {}

export const ConnectForm: FC<Props> = () => {

  // Global State
  const { connect, disconnect } = useContext(X32Context)

  // Local State
  const [ip, setIp] = useState<string>("192.168.0.30")

  const onConnect = () => {
    connect({mixerIp: ip, debug: true})
  }


  return <Container className="ConnectForm">
    {/* <section> */}
    <div className="form-item">
      <label htmlFor="ip">X32 IP Address</label>
      {/* value="192.168.0.30" */}
      <input id="ip" value={ip} onChange={(e: FormEvent<HTMLInputElement>) => {
        setIp(e.currentTarget.value || "")
      }} />
    </div>
    <div className="form-item">
      <button id="connect" onClick={onConnect}>Connect</button>
      <button id="disconnect" onClick={disconnect}>Disconnect</button>
    </div>
    {/* </section> */}
  </Container>
} 