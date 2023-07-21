// Libs
import { FC, useContext } from "react"
import Button from "rsuite/Button"
// Comps
import { ConnectFormContext } from "@/shared/contexts/ConnectFormContext"
import { WindowMixerSharedKey } from "@/electron/OSC/MixerEventListeners"

// Defs
type Props = { mixerKey: WindowMixerSharedKey; className?: string }

export const StoreButton: FC<Props> = ({ mixerKey, className }) => {
  // Global State
  const { settings, canSubmit, addIp } = useContext(ConnectFormContext)
  const { ip } = settings[mixerKey] || { ip: "" }

  // ..
  return (
    <Button
      className={`StoreButton Button-grey ${className || ""}`}
      disabled={canSubmit[mixerKey] === false}
      onClick={() => addIp(ip)}
    >
      Store
    </Button>
  )
}
