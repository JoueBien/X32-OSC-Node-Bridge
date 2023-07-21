// Libs
import { FC, useContext } from "react"
import styled from "styled-components"
import Button from "rsuite/Button"
// Comps
import { MixerContext } from "@/shared/contexts/MixerContext"
import { ConnectFormContext } from "@/shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "@/electron/OSC/MixerEventListeners"

// Styles
const Container = styled.div`
  .ip-address {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    span + button,
    button + button {
      margin-left: 0.3rem;
    }
  }
`
// Defs
type Props = { mixerKeys: WindowMixerSharedKey[]; className?: string }

export const ConnectIpOptionList: FC<Props> = ({ mixerKeys, className }) => {
  // Global State
  const { connected } = useContext(MixerContext)
  const { storedIps, removeIp, setIp } = useContext(ConnectFormContext)

  // ..
  return (
    <Container className={`ConnectIpOptionList ${className || ""}`}>
      <p>
        <b>Stored Ip Addresses</b>
      </p>
      {storedIps.storedIps.map((ipAddress, index) => {
        return (
          <div className="ip-address" key={`storedIps-${index}`}>
            <span>{ipAddress}</span>
            {mixerKeys.map((mixerKey) => {
              return (
                <Button
                  key={mixerKey}
                  className="Button-grey"
                  disabled={connected[mixerKey]}
                  onClick={() => setIp(ipAddress, mixerKey)}
                >
                  {/* We replace the string here other wise it's hard to read */}
                  Set {`${mixerKey}`.replace("Mixer", "Mixer ")}
                </Button>
              )
            })}
            <Button className="Button-red" onClick={() => removeIp(ipAddress)}>
              Remove
            </Button>
          </div>
        )
      })}
    </Container>
  )
}
