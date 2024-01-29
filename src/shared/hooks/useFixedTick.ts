import { useAsyncSetState } from "use-async-setstate"
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
  const { interval, autoStart } = options

  // Local State
  const [running, setRunning] = useAsyncSetState<boolean>(autoStart || false)
  // Set state if auto started
  const [tick, setTick] = useAsyncSetState<IntervalReference>({})

  // Functions
  const start = () => setRunning(true)
  const stop = () => setRunning(false)

  // Effects
  // On Mount start ticks
  // On UnMount clean up
  useEffect(() => {
    setTick(autoStart ? subscribeFixedTick(onUpdate, interval) : {})
    // Clean up on tare down.
    return () => {
      unsubscribeFixedTick(tick)
    }
  }, [])

  // On params or running change
  useEffect(() => {
    if (running) {
      // Cancel & start
      unsubscribeFixedTick(tick)
      setTick(subscribeFixedTick(onUpdate, interval))
    } else {
      unsubscribeFixedTick(tick)
    }
  }, [onUpdate, interval, running])

  return {
    start,
    stop,
  }
}
