// Libs
import { useAsyncSetState } from "use-async-setstate"
import { createContext, FC, PropsWithChildren } from "react"
// Comps
import { ConnectParams } from "../../../electron/OSC/core/X32"
import { WindowMixerShared  } from "../../../electron/OSC/MixerEventListeners"
// Defs
type X32ContextProps = {}
type X32ContextState = {
  connected: boolean
  connect: (params: ConnectParams) => Promise<boolean>
  disconnect: () => void
}

const mixer = (globalThis as unknown as WindowMixerShared).Mixer

export const MixerContext = createContext<X32ContextState>({
  connected: false,
  connect: (() => {}) as any,
  disconnect: () => {}
})


export const MixerContextProvider: FC<PropsWithChildren & X32ContextProps> = (defaultState) => {
    // Props
    const {children} = defaultState

    // State
    const [connected, setConnected] = useAsyncSetState<boolean>(false)

    // Mutations
    async function connect (params: ConnectParams) {
      const res = await mixer.connect(params)
      if (res !== false) {
        setConnected(true)
        return true
      } else {
        setConnected(false)
        return false
      }
    }

    async function disconnect () {
      mixer.disconnect()
      setConnected(false)
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
        }}
      >
        {children}
      </MixerContext.Provider>
    );
}
