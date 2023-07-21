// Libs
import { useAsyncSetState, useGetState } from "use-async-setstate"
import { createContext, FC, PropsWithChildren } from "react"
// Comps
import { ConnectParams } from "@/electron/OSC/core/X32"
import {
  WindowMixerShared,
  WindowMixerSharedKey,
} from "@/electron/OSC/MixerEventListeners"

// Consts
const AllMixers = globalThis as unknown as WindowMixerShared

// Defs
type X32ContextProps = NonNullable<unknown>
type X32ContextState = {
  connected: Record<WindowMixerSharedKey, boolean>
  connect: (
    params: ConnectParams,
    mixerKey: WindowMixerSharedKey
  ) => Promise<boolean>
  disconnect: (mixerKey: WindowMixerSharedKey) => void
  mixers: WindowMixerShared
}

export const MixerContext = createContext<X32ContextState>({
  connected: { Mixer: false, MixerA: false, MixerB: false },
  connect: (() => {}) as any,
  disconnect: () => {},
  mixers: AllMixers,
})

export const MixerContextProvider: FC<PropsWithChildren & X32ContextProps> = (
  defaultState
) => {
  // Props
  const { children } = defaultState

  // State
  const [connected, setConnected] = useAsyncSetState<
    Record<WindowMixerSharedKey, boolean>
  >({ Mixer: false, MixerA: false, MixerB: false })

  const getConnected = useGetState(connected)

  // Mutations
  async function connect(
    params: ConnectParams,
    mixerKey: WindowMixerSharedKey
  ) {
    const res = await AllMixers[mixerKey].connect(params)
    if (res !== false) {
      await setConnected({ ...getConnected(), [mixerKey]: true })
      return true
    } else {
      await setConnected({ ...getConnected(), [mixerKey]: false })
      return false
    }
  }

  async function disconnect(mixerKey: WindowMixerSharedKey) {
    AllMixers[mixerKey].disconnect()
    await setConnected({ ...getConnected(), [mixerKey]: false })
  }

  // ..
  return (
    <MixerContext.Provider
      value={{
        // State
        connected,

        // Mutations
        connect,
        disconnect,
        mixers: AllMixers,
      }}
    >
      {children}
    </MixerContext.Provider>
  )
}
