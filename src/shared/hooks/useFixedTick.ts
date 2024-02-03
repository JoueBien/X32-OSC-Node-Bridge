import { useAsyncSetState, useGetState } from "use-async-setstate"
import { subscribeFixedTick, unsubscribeFixedTick } from "../helpers/time"
import { useEffect } from "react"
import { IntervalReference } from "@/electron/OSC/core/X32.types"

// A function that runs on a fixed update.
// Usually to copy values across so we don't update the screen too often.across
export function useFixedTick(
  onUpdate: () => void,
  options: {
    interval: number
    autoStart?: boolean
  }
) {
  const { autoStart, interval } = options

  // Local State
  const [running, setRunning] = useAsyncSetState<boolean>(autoStart || false)
  // Set state if auto started
  const [tick, setTick] = useAsyncSetState<IntervalReference>({})
  const getTick = useGetState(tick)

  // Functions
  /** You must call start after you set onUpdate/options otherwise the tick will not update */
  const start = () => setRunning(true)
  /** You must call sop before you set onUpdate/options otherwise the tick will not update */
  const stop = () => setRunning(false)

  // Effects
  // On params or running change
  useEffect(() => {
    unsubscribeFixedTick(getTick())
    if (running) {
      setTick(subscribeFixedTick(onUpdate, interval))
    }
  }, [running])

  return {
    /** You must call start after you set onUpdate/options otherwise the tick will not update */
    start,
    /** You must call sop before you set onUpdate/options otherwise the tick will not update */
    stop,
  }
}
