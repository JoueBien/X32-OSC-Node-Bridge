import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { useObjectList } from "shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"

export type SharedMuteItem = { mixerA: CommandOption; mixerB: CommandOption }

type MuteMapperContextState = {
  sharedMuteItemList: SharedMuteItem[]
  sharedMuteItemHashMap: {
    MixerA: Record<string, string>
    MixerB: Record<string, string>
  }
  addSharedMuteItem: (value: SharedMuteItem) => Promise<void>
  removeSharedMuteItem: (index: number) => Promise<void>
  sharedMuteItemMessageAddresses: {MixerA: string[], MixerB: string[]}
}
type MuteMapperContextProps = {}

export const MuteMapperContext = createContext<MuteMapperContextState>({
  sharedMuteItemList: [],
  sharedMuteItemHashMap: {
    MixerA: {},
    MixerB: {},
  },
  addSharedMuteItem: async () => {},
  removeSharedMuteItem: async () => {},
  sharedMuteItemMessageAddresses: {
    MixerA: [],
    MixerB: []
  }
})

export const MuteMapperContextProvider: FC<
  PropsWithChildren & MuteMapperContextProps
> = ({ children }) => {
  // Local State
  const [storedMiteItemsList, setStoredMiteItemsList] = useLocalStorage<
    SharedMuteItem[]
  >("shared-mute-lists", [])
  const {
    list: sharedMuteItemList,
    push: addSharedMuteItem,
    removeAtIndex: removeSharedMuteItem,
  } = useObjectList<SharedMuteItem>(storedMiteItemsList)

  // Calc
  // Set up a hash map to map for what links to what
  // We need both directions A->B and B->A 
  const sharedMuteItemHashMap = {
    MixerA: sharedMuteItemList.reduce<Record<string, string>>(
      (allValues, item) => {
        return { ...allValues, [item.mixerA.value]: item.mixerB.value }
      },
      {}
    ),
    MixerB: sharedMuteItemList.reduce<Record<string, string>>(
      (allValues, item) => {
        return { ...allValues, [item.mixerB.value]: item.mixerA.value }
      },
      {}
    ),
  }

  const sharedMuteItemMessageAddresses = {
    MixerA: Object.keys(sharedMuteItemHashMap.MixerA),
    MixerB: Object.keys(sharedMuteItemHashMap.MixerB),
  }

  // Effects
  // Keep State always stored
  useEffect(() => {
    setStoredMiteItemsList(sharedMuteItemList)
  }, [sharedMuteItemList])

  // ..
  return (
    <MuteMapperContext.Provider
      value={{
        sharedMuteItemList,
        addSharedMuteItem,
        sharedMuteItemMessageAddresses,
        removeSharedMuteItem,
        sharedMuteItemHashMap,
      }}
    >
      {children}
    </MuteMapperContext.Provider>
  )
}
