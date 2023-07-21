import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react"
import { MixerContext } from "@/shared/contexts/MixerContext"
import { MuteMapperContext } from "./MuteMapperContext"
import { useAsyncSetState, useGetState } from "use-async-setstate"
import type { IntervalReference } from "@/electron/OSC/core/X32"
import { useAsyncState } from "@/shared/hooks/useAsyncState"

// Types
type MuteShareContextState = {
  isConnected: boolean
  syncIsRunning: boolean
  canStartSync: boolean
  canStopSync: boolean
  syncMixerAToB: () => Promise<void>
  syncMixerBToA: () => Promise<void>
  startSync: () => Promise<void>
  endSync: () => Promise<void>
}
type MuteShareContextProps = NonNullable<unknown>

export const MuteShareContext = createContext<MuteShareContextState>({
  isConnected: false,
  syncIsRunning: false,
  canStartSync: false,
  canStopSync: false,
  syncMixerAToB: async () => {},
  syncMixerBToA: async () => {},
  startSync: async () => {},
  endSync: async () => {},
})

export const MuteShareContextProvider: FC<
  PropsWithChildren & MuteShareContextProps
> = ({ children }) => {
  // Shared State
  const { mixers, connected } = useContext(MixerContext)
  const { MixerA, MixerB } = mixers
  const { activeScene } = useContext(MuteMapperContext)
  const { sharedMuteItemHashMap, sharedMuteItemMessageAddresses } = activeScene
  const { MixerA: mixerAMuteHashMap, MixerB: mixerBMuteHashMap } =
    sharedMuteItemHashMap
  const {
    MixerA: mixerAMuteItemMessageAddresses,
    MixerB: mixerBMuteItemMessageAddresses,
  } = sharedMuteItemMessageAddresses

  // Local State
  const [syncIsRunning, setSyncIsRunning] = useAsyncSetState<boolean>(false)
  const getSyncIsRunning = useGetState(syncIsRunning)
  const [_messagesRefA, setMessagesRefA, getMessagesRefA] = useAsyncState<
    IntervalReference | undefined
  >(undefined)
  const [_messagesRefB, setMessagesRefB, getMessagesRefB] = useAsyncState<
    IntervalReference | undefined
  >(undefined)

  const [_xRemoteRefA, setXRemoteRefA, getXRemoteRefA] = useAsyncState<
    IntervalReference | undefined
  >(undefined)
  const [_xRemoteRefB, setXRemoteRefB, getXRemoteRefB] = useAsyncState<
    IntervalReference | undefined
  >(undefined)

  // Calc
  const isConnected = connected.MixerA && connected.MixerB
  const canStartSync = isConnected && !syncIsRunning
  const canStopSync = isConnected && syncIsRunning

  // Effects
  // When disconnected we should set started to false
  useEffect(() => {
    if (isConnected === false) {
      setSyncIsRunning(false)
    }
  }, [connected])

  // When started start syncing
  useEffect(() => {
    if (syncIsRunning) {
      initSyncListen()
    } else {
      cleanUpSyncListen()
    }
    // Clean up on exit
    return () => {
      cleanUpSyncListen()
    }
  }, [syncIsRunning])

  // Actions
  // When button starts sync
  const startSync = async () => {
    await setSyncIsRunning(true)
  }

  // When button stop sync
  const endSync = async () => {
    await setSyncIsRunning(false)
  }

  // Set up listen for mute changes
  // TODO: fix Mute Groups being inverted to that of anything else
  const initSyncListen = async () => {
    await cleanUpSyncListen()
    await setXRemoteRefA(await MixerA.xSubscribe())
    await setXRemoteRefB(await MixerB.xSubscribe())
    await setMessagesRefA(
      MixerA.onMessagesX(mixerAMuteItemMessageAddresses, async (message) => {
        const aKey = message.address
        const bKey = mixerBMuteHashMap[aKey]
        await MixerB.request({
          address: bKey,
          args: message.args,
        })
      })
    )
    await setMessagesRefB(
      MixerB.onMessagesX(mixerBMuteItemMessageAddresses, async (message) => {
        const bKey = message.address
        const aKey = mixerAMuteHashMap[bKey]
        await MixerA.request({
          address: aKey,
          args: message.args,
        })
      })
    )
  }

  // Clean up listen for mute changes
  const cleanUpSyncListen = async () => {
    if (getMessagesRefA()) {
      MixerA.unsubscribe(getMessagesRefA() as IntervalReference)
    }
    if (getMessagesRefB()) {
      MixerB.unsubscribe(getMessagesRefB() as IntervalReference)
    }
    if (getXRemoteRefA()) {
      MixerA.unsubscribe(getXRemoteRefA() as IntervalReference)
    }
    if (getXRemoteRefB()) {
      MixerB.unsubscribe(getXRemoteRefB() as IntervalReference)
    }
  }

  // TODO: fix Mute Groups being inverted to that of anything else
  const syncMixerAToB = async () => {
    const reStartSync = getSyncIsRunning()
    // Pause sync
    await endSync()
    await Promise.all(
      Object.keys(mixerAMuteHashMap).map(async (aKey) => {
        const bKey = mixerBMuteHashMap[aKey]
        // Get the value on console Both Consoles
        const resA = await MixerA.requestAndReply({
          address: aKey,
        })
        const resB = await MixerB.requestAndReply({
          address: bKey,
        })
        // If we get a response and they are not equal
        // We can set the other consoles value
        if (
          resA &&
          resB &&
          JSON.stringify(resA.args) !== JSON.stringify(resB.args)
        ) {
          await MixerB.request({
            address: bKey,
            args: resA.args,
          })
        }
      })
    )
    if (reStartSync) {
      startSync()
    }
  }

  const syncMixerBToA = async () => {
    const reStartSync = getSyncIsRunning()
    await endSync()
    await Promise.all(
      Object.keys(mixerBMuteHashMap).map(async (bKey) => {
        const aKey = mixerAMuteHashMap[bKey]
        // Get the value on console A
        const resB = await MixerB.requestAndReply({
          address: bKey,
        })
        const resA = await MixerA.requestAndReply({
          address: aKey,
        })

        // If we get a response and they are not equal
        // We can set the other consoles value
        if (
          resA &&
          resB &&
          JSON.stringify(resA.args) !== JSON.stringify(resB.args)
        ) {
          await MixerA.request({
            address: aKey,
            args: resB.args,
          })
        }
      })
    )
    if (reStartSync) {
      startSync()
    }
  }

  // ..
  return (
    <MuteShareContext.Provider
      value={{
        isConnected,
        syncIsRunning,
        canStartSync,
        canStopSync,
        syncMixerAToB,
        syncMixerBToA,
        startSync,
        endSync,
      }}
    >
      {children}
    </MuteShareContext.Provider>
  )
}
