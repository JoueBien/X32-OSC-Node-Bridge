import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from "react"
import { MixerContext } from "shared/contexts/MixerContext"
import { MuteMapperContext } from "./MuteMapperContext"

// Types
type MuteShareContextState = {
  isConnected: boolean
  syncMixerAToB: () => Promise<void>
  syncMixerBToA: () => Promise<void>
}
type MuteShareContextProps = {}

export const MuteShareContext = createContext<MuteShareContextState>({
  isConnected: false,
  syncMixerAToB: async () => {},
  syncMixerBToA: async () => {},
})

export const MuteShareContextProvider: FC<
  PropsWithChildren & MuteShareContextProps
> = ({ children }) => {
  // Shared State
  const { mixers, connected } = useContext(MixerContext)
  const { MixerA, MixerB } = mixers
  const { sharedMuteItemHashMap } = useContext(MuteMapperContext)
  const { MixerA: mixerAMuteHashMap, MixerB: mixerBMuteHashMap } =
    sharedMuteItemHashMap

  // Calc
  const isConnected = connected.MixerA && connected.MixerB

  // Actions
  // TODO: fix Mute Groups being inverted to that of anything else
  const syncMixerAToB = async () => {
    await Promise.all(
      Object.keys(mixerAMuteHashMap).map(async (aKey) => {
        // Get the value on console A
        const resA = await MixerA.requestAndReply({
          address: aKey,
        })
        // If we get a response we can then set B
        const bKey = mixerBMuteHashMap[aKey]
        if (resA) {
          await MixerB.request({
            address: bKey,
            args: resA.args,
          })
        }
      })
    )
  }

  const syncMixerBToA = async () => {
    await Promise.all(
      Object.keys(mixerBMuteHashMap).map(async (bKey) => {
        // Get the value on console A
        const resB = await MixerB.requestAndReply({
          address: bKey,
        })
        // If we get a response we can then set B
        const aKey = mixerAMuteHashMap[bKey]
        if (resB) {
          await MixerA.request({
            address: aKey,
            args: resB.args,
          })
        }
      })
    )
  }

  // ..
  return (
    <MuteShareContext.Provider
      value={{
        isConnected,
        syncMixerAToB,
        syncMixerBToA,
      }}
    >
      {children}
    </MuteShareContext.Provider>
  )
}
