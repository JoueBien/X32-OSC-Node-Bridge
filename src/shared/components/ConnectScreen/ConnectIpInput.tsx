// Libs
import { FC, useContext } from "react"
import styled from "styled-components"
import Input from "rsuite/Input"
// Comps
import { MixerContext } from "shared/contexts/MixerContext"
import { ConnectFormContext } from "shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "../../../../electron/OSC/MixerEventListeners"

// Styles
const Container = styled.div`
  .form-item {
    width: 200px;
  }

  .form-item + .form-item {
    margin-top: 15px;
  }

  button + button {
    margin-left: 15px;
  }

  .error {
    height: 1em;
    color: red;
  }
`
// Defs
type Props = {
  mixerKey: WindowMixerSharedKey
  title?: React.ReactElement | string | false
  label?: React.ReactElement | string
  className?: string
}

export const ConnectIpInput: FC<Props> = ({ mixerKey, className, label, title }) => {
  // Global State
  const { connected } = useContext(MixerContext)
  const { settings, setIp, errors } = useContext(ConnectFormContext)
  const { ip } = settings[mixerKey] || { ip: "" }

  // Functions
  const onIpFiledChanged = (value: string) => {
    setIp(value, mixerKey)
  }

  // ..
  return (
    <Container className={`ConnectIpInput ${className || ""}`}>
      {typeof title !== "boolean" && (
        <>
          <p>
            <b>
              {title !== undefined && title}
              {title === undefined && <>Connect to {mixerKey}</>}
            </b>
          </p>
        </>
      )}
      <div className="form-item">
        <label htmlFor="ip">
          {label === undefined && <>X32 IP Address</>}
          {label !== undefined && <>{label}</>}
        </label>
        
        <Input
          id="ip"
          value={ip}
          onChange={onIpFiledChanged}
          disabled={connected[mixerKey]}
        />
        <div className="error" role="alert">
          {errors?.[mixerKey]?.ip || ""}
        </div>
      </div>
    </Container>
  )
}
