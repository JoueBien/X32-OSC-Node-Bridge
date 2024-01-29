import { IntervalReference } from "@/electron/OSC/core/X32.types"
import { useEffect } from "react"
import { useAsyncSetState } from "use-async-setstate"

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// A fixed update that returns it's own clean up function
export function subscribeFixedTick(
  onUpdate: () => void,
  Interval: number
): IntervalReference {
  const intervalId = setInterval(onUpdate, Interval || 500)
  return {
    interval: intervalId,
    onMessage: onUpdate,
  }
}

export function unsubscribeFixedTick(reference: IntervalReference) {
  clearInterval(reference.interval)
}
