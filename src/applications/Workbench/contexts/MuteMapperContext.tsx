import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { useObjectList } from "shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"
import {
  StorageItem,
  useStoredSceneList,
} from "shared/hooks/useStoredSceneList"

export type SharedMuteItem = { mixerA: CommandOption; mixerB: CommandOption }

export type MuteSceneStorageItem = StorageItem<{ value: SharedMuteItem[] }>

type MuteMapperContextState = {
  sharedMuteItemList: SharedMuteItem[]
  sharedMuteItemHashMap: {
    MixerA: Record<string, string>
    MixerB: Record<string, string>
  }
  overrideSharedMuteList: (values: SharedMuteItem[]) => Promise<void>
  addSharedMuteItem: (value: SharedMuteItem) => Promise<void>
  removeSharedMuteItem: (index: number) => Promise<void>
  sharedMuteItemMessageAddresses: { MixerA: string[]; MixerB: string[] }
  importMuteScene: () => Promise<MuteSceneStorageItem | string | undefined>
  exportMuteScene: (contents: SharedMuteItem[], name: string) => void
  supportedList: MuteSceneStorageItem[]
  saveNewScene: (
    item: Omit<StorageItem<{ value: SharedMuteItem[] }>, "id" | "version">
  ) => Promise<void>
  removeScene: (item: MuteSceneStorageItem) => Promise<void>
}
type MuteMapperContextProps = {}

export const MuteMapperContext = createContext<MuteMapperContextState>({
  sharedMuteItemList: [],
  sharedMuteItemHashMap: {
    MixerA: {},
    MixerB: {},
  },
  overrideSharedMuteList: async () => {},
  addSharedMuteItem: async () => {},
  removeSharedMuteItem: async () => {},
  sharedMuteItemMessageAddresses: {
    MixerA: [],
    MixerB: [],
  },
  importMuteScene: async () => {return ""; },
  exportMuteScene: async () => {},
  supportedList: [],
  saveNewScene: async () => {},
  removeScene: async () => {},
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
    overrideList: overrideSharedMuteList,
  } = useObjectList<SharedMuteItem>(storedMiteItemsList)

  const { importScene, exportScene, supportedList, saveNewScene, removeScene } =
    useStoredSceneList<{ value: SharedMuteItem[] }>({
      key: "mutes",
      writeVersion: 1,
      supportedVersions: [1],
      messages: {
        importMessage: "Import mute scene from file.",
        exportMessage: "Export mute scene from file.",
      },
      importFileTypes: [
        {
          name: "mute scene",
          extensions: ["1.zscn"],
        },
      ],
      exportFileTypes: [
        {
          name: "mute scene",
          extensions: ["1.zscn"],
        },
      ],
    })

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

  // Functions
  const importMuteScene = async () => {
    return await importScene()
  }
  const exportMuteScene = (contents: SharedMuteItem[], name: string) => {
    exportScene({ value: contents }, name)
  }

  // ..
  return (
    <MuteMapperContext.Provider
      value={{
        sharedMuteItemList,
        overrideSharedMuteList,
        addSharedMuteItem,
        sharedMuteItemMessageAddresses,
        removeSharedMuteItem,
        sharedMuteItemHashMap,
        importMuteScene,
        exportMuteScene,
        supportedList,
        saveNewScene,
        removeScene,
      }}
    >
      {children}
    </MuteMapperContext.Provider>
  )
}
