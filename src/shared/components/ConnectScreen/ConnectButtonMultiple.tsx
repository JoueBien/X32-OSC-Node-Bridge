// Libs
import { FC, useContext } from "react"
import Button from "rsuite/Button"
// Comps
import { MixerContext } from "shared/contexts/MixerContext"
import { ConnectFormContext } from "shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "../../../../electron/OSC/MixerEventListeners"
import { useAsyncSetState } from "use-async-setstate"

// Defs
type Props = {
  mixerKeys: WindowMixerSharedKey[]
  className?: string
  onSuccess?: () => Promise<void>
}

export const ConnectButtonMultiple: FC<Props> = ({
  mixerKeys,
  className,
  onSuccess,
}) => {
  // Global State
  const { connect, disconnect, connected } = useContext(MixerContext)
  const { settings } = useContext(ConnectFormContext)

  const isAllConnected = !mixerKeys
    .map((mixerKey) => connected[mixerKey])
    .includes(false)

  // Local State
  const [isLoading, setIsLoading] = useAsyncSetState<boolean>(false)

  // Functions
  const onConnectToggle = async () => {
    // Reject if we are loading
    if (isLoading === false) {
      await setIsLoading(true)
      // Connect if any are dis-connected
      if (isAllConnected === false) {
        await Promise.all(
          mixerKeys.map((mixerKey) => Promise.resolve(disconnect(mixerKey)))
        )
        const results = await Promise.all(
          mixerKeys.map((mixerKey) =>
            connect(
              { mixerIp: settings[mixerKey]?.ip || "", debug: true },
              mixerKey
            )
          )
        )
        // If we had a fail then disconnect and alert
        if (results.includes(false)) {
          await Promise.all(
            mixerKeys.map((mixerKey) => Promise.resolve(disconnect(mixerKey)))
          )
          const forAlerts = results
            .map((res, index) => (res === false ? mixerKeys[index] : undefined))
            .filter((item) => (item !== undefined ? true : false)) as string[]
          alert(`Failed to connect to ${forAlerts.join(", ")}.`)
        } else {
          // If we did not fail then run event from parent
          await (onSuccess || (async () => {}))()
        }
      } else {
        // If already connected disconnect
        await Promise.all(
          mixerKeys.map((mixerKey) => Promise.resolve(disconnect(mixerKey)))
        )
      }
      await setIsLoading(false)
    }
  }

  // ..
  return (
    <Button
      className={`ConnectButtonMultiple Button-green ${className || ""}`}
      disabled={isLoading}
      onClick={onConnectToggle}
    >
      {isAllConnected ? "Disconnect" : "Connect"}
      <div
        className={`led ${isLoading && "yellow"} ${isAllConnected && "green"}`}
      />
    </Button>
  )
}
