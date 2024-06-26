// Libs
import { FC, useContext } from "react"
import Button from "rsuite/Button"
// Comps
import { MixerContext } from "@/shared/contexts/MixerContext"
import { ConnectFormContext } from "@/shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "@/electron/OSC/MixerEventListeners"
import { useAsyncSetState } from "use-async-setstate"
import { delay } from "@/shared/utils/time"

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
  // Note we are doing bad for loops here
  // This is so the raspberry pi sets the state in the right order
  const onConnectToggle = async () => {
    // Reject if we are loading
    if (isLoading === false) {
      await setIsLoading(true)
      // Connect if any are dis-connected
      if (isAllConnected === false) {
        await delay(100)
        for (const mixerKeyIndex in mixerKeys) {
          const mixerKey = mixerKeys[mixerKeyIndex]
          await disconnect(mixerKey)
        }

        await delay(100)
        const results = []
        for (const mixerKeyIndex in mixerKeys) {
          const mixerKey = mixerKeys[mixerKeyIndex]
          const res = await connect(
            { mixerIp: settings[mixerKey]?.ip || "", debug: true },
            mixerKey
          )
          results.push(res)
        }
        await delay(100)
        // If we had a fail then disconnect and alert
        if (results.includes(false)) {
          for (const mixerKeyIndex in mixerKeys) {
            const mixerKey = mixerKeys[mixerKeyIndex]
            await disconnect(mixerKey)
          }
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
        await delay(100)
        for (const mixerKeyIndex in mixerKeys) {
          const mixerKey = mixerKeys[mixerKeyIndex]
          await disconnect(mixerKey)
        }
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
