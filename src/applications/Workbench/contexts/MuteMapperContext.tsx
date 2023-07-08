import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { useObjectList } from "shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"

export type SharedMuteItem = { mixerA: CommandOption; mixerB: CommandOption }

type MuteMapperContextState = {
  sharedMuteItemList: SharedMuteItem[]
  addSharedMuteItem: (value: SharedMuteItem) => Promise<void>
  removeSharedMuteItem: (index: number) => Promise<void>
}
type MuteMapperContextProps = {}

export const MuteMapperContext = createContext<MuteMapperContextState>({
  sharedMuteItemList: [],
  addSharedMuteItem: async () => {},
  removeSharedMuteItem: async () => {},
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

  // Effects
  // Keep State always stored
  useEffect(() => {
    setStoredMiteItemsList(sharedMuteItemList)
  }, [sharedMuteItemList])

  // ..
  return (
    <MuteMapperContext.Provider
      value={{ sharedMuteItemList, addSharedMuteItem, removeSharedMuteItem }}
    >
      {children}
    </MuteMapperContext.Provider>
  )
}
