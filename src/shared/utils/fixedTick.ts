export type OnTickFunc = (() => void) | (() => Promise<void>)

export type FixedTickReference = {
  interval: NodeJS.Timer
  onTick: OnTickFunc
  frequencyMs: number
  clear: () => void
  isRunning: boolean
}

/** A fixed update that returns it's own clean up function.
 *
 * @example const tickRef = subscribeFixedTick(() => console.log("ran"), 100);
 * tickRef.clear();
 *
 */
export function subscribeFixedTick(
  onTick: OnTickFunc,
  frequencyMs?: number
): FixedTickReference {
  const intervalId = setInterval(onTick, frequencyMs || 500)

  const ref = {
    interval: intervalId,
    frequencyMs: frequencyMs || 500,
    onTick,
    isRunning: true,
    clear: () => {
      clearInterval(intervalId)
      ref.isRunning = false
    },
  }

  return ref
}

/** Clear a tickRef & stop it from running.
 *
 * @example const tickRef = subscribeFixedTick(() => console.log("ran"), 100);
 * unsubscribeFixedTick(tickRef);
 */
export function unsubscribeFixedTick(reference?: FixedTickReference) {
  reference?.clear()
}
