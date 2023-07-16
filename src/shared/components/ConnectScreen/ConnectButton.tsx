// Libs
import { FC, useContext } from "react"
import Button from "rsuite/Button"
// Comps
import { MixerContext } from "shared/contexts/MixerContext"
import { ConnectFormContext } from "shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "../../../../electron/OSC/MixerEventListeners"
import { useAsyncSetState } from "use-async-setstate"

// Defs
type Props = { mixerKey: WindowMixerSharedKey; className?: string }

export const ConnectButton: FC<Props> = ({ mixerKey, className }) => {
  // Global State
  const { connect, disconnect, connected } = useContext(MixerContext)
  const { settings } = useContext(ConnectFormContext)
  const { ip } = settings[mixerKey] || { ip: "" }

  // Local State
  const [isLoading, setIsLoading] = useAsyncSetState<boolean>(false)

  // Functions
  const onConnectToggle = async () => {
    if (isLoading === false) {
      await setIsLoading(true)
      if (connected[mixerKey] === false) {
        disconnect(mixerKey)
        const res = await connect({ mixerIp: ip, debug: true }, mixerKey)
        if (res === false) {
          alert(
            `Failed to connect to ${mixerKey}. Could not find mixer at ${ip}`
          )
        }
      } else {
        disconnect(mixerKey)
      }
      await setIsLoading(false)
    }
  }

  // ..
  return (
    <Button
      className={`ConnectButton Button-green ${className || ""}`}
      disabled={isLoading}
      onClick={onConnectToggle}
    >
      {connected[mixerKey] ? "Disconnect" : "Connect"}
      <div
        className={`led ${isLoading && "yellow"} ${
          connected[mixerKey] && "green"
        }`}
      />
    </Button>
  )
}
