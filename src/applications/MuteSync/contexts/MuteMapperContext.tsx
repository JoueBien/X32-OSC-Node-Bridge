import { createContext, FC, PropsWithChildren, useEffect } from "react"
import { useObjectList } from "@/shared/hooks/useObjectList"
import { useLocalStorage } from "usehooks-ts"
import {
  StorageItem,
  useStoredSceneList,
} from "@/shared/hooks/useStoredSceneList"
import { CommandOption } from "@/shared/commandOptions/types"
import { ListItem } from "@/shared/hooks/useIdRecordList"

export type SharedMuteItem = { mixerA: CommandOption; mixerB: CommandOption }

export type MuteSceneStorageItem = StorageItem<{ value: SharedMuteItem[] }>

type MuteMapperContextState = {
  activeScene: {
    activeSceneId: string | undefined
    activeSceneName: string
    updateActiveSceneName: (text: string) => void
    clearActive: () => Promise<void>
    sharedMuteItemList: SharedMuteItem[]
    sharedMuteItemHashMap: {
      MixerA: Record<string, string>
      MixerB: Record<string, string>
    }
    // overrideSharedMuteList: (values: SharedMuteItem[]) => Promise<void>
    addSharedMuteItem: (value: SharedMuteItem) => Promise<void>
    removeSharedMuteItem: (index: number) => Promise<void>
    sharedMuteItemMessageAddresses: { MixerA: string[]; MixerB: string[] }
  }
  importMuteScene: () => Promise<void>
  exportMuteScene: (contents: SharedMuteItem[], name: string) => void

  storedScenes: {
    storedMutedScenes: ListItem<
      StorageItem<{
        value: SharedMuteItem[]
      }>
    >[]
    storeActiveAs: () => Promise<void>
    storeActive: () => Promise<void>
    recallToActive: (
      item: ListItem<
        StorageItem<{
          value: SharedMuteItem[]
        }>
      >
    ) => Promise<void>
    removeMuteScene: (id: string) => Promise<void>
  }
}
type MuteMapperContextProps = NonNullable<unknown>

export const MuteMapperContext = createContext<MuteMapperContextState>({
  activeScene: {
    activeSceneId: undefined,
    activeSceneName: "",
    clearActive: async () => {},
    updateActiveSceneName: () => {},
    sharedMuteItemList: [],
    sharedMuteItemHashMap: {
      MixerA: {},
      MixerB: {},
    },
    addSharedMuteItem: async () => {},
    removeSharedMuteItem: async () => {},
    sharedMuteItemMessageAddresses: {
      MixerA: [],
      MixerB: [],
    },
  },
  storedScenes: {
    storedMutedScenes: [],
    recallToActive: async () => {},

    storeActiveAs: async () => {},
    storeActive: async () => {},
    // saveNewMuteScene: async () => "",
    removeMuteScene: async () => {},
  },
  importMuteScene: async () => {},
  exportMuteScene: async () => {},
})

export const MuteMapperContextProvider: FC<
  PropsWithChildren & MuteMapperContextProps
> = ({ children }) => {
  // Local State
  const [storedMiteItemsList, setStoredMiteItemsList] = useLocalStorage<
    SharedMuteItem[]
  >("shared-mute-lists", [])

  const [activeSceneName, _setActiveSceneName] = useLocalStorage<string>(
    "shared-mute-list-name",
    "New Mute Scene"
  )

  const [activeSceneId, setActiveSceneId] = useLocalStorage<string | undefined>(
    "shared-mute-list-id",
    undefined
  )

  const {
    list: sharedMuteItemList,
    push: addSharedMuteItem,
    removeAtIndex: removeSharedMuteItem,
    overrideList: overrideSharedMuteList,
  } = useObjectList<SharedMuteItem>(storedMiteItemsList)

  const clearActive = async () => {
    await _setActiveSceneName("New Mute Scene")
    await overrideSharedMuteList([])
    await setActiveSceneId(undefined)
  }

  const storeActiveAs = async () => {
    const id = await saveNewMuteScene({
      name: activeSceneName,
      value: [...sharedMuteItemList],
      version: 1,
    })
    await setActiveSceneId(id)
  }

  const storeActive = async () => {
    if (activeSceneId !== undefined) {
      updateMuteScene(activeSceneId, {
        name: activeSceneName,
        value: [...sharedMuteItemList],
        version: 1,
      })
    }
  }

  const recallToActive = async (
    item: ListItem<
      StorageItem<{
        value: SharedMuteItem[]
      }>
    >
  ) => {
    await overrideSharedMuteList(item.value.value)
    await updateActiveSceneName(item.value.name)
    await setActiveSceneId(item.id)
  }

  const {
    importScene,
    exportScene,
    supportedList: storedMutedScenes,
    saveNewScene: saveNewMuteScene,
    updateScene: updateMuteScene,
    removeScene: removeMuteScene,
  } = useStoredSceneList<{ value: SharedMuteItem[] }>({
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
  const updateActiveSceneName = (text: string) => {
    if (text.length < 60) {
      _setActiveSceneName(text)
    }
  }

  const importMuteScene = async () => {
    const imported = await importScene()
    if (typeof imported === "object") {
      _setActiveSceneName(imported.name)
      overrideSharedMuteList(imported.value)
    }
  }
  const exportMuteScene = (contents: SharedMuteItem[], name: string) => {
    exportScene({ value: contents }, name)
  }

  // ..
  return (
    <MuteMapperContext.Provider
      value={{
        activeScene: {
          activeSceneId,
          activeSceneName,
          updateActiveSceneName,
          clearActive,
          sharedMuteItemList,
          addSharedMuteItem,
          sharedMuteItemMessageAddresses,
          removeSharedMuteItem,
          sharedMuteItemHashMap,
        },
        storedScenes: {
          storedMutedScenes,

          storeActiveAs,
          storeActive,
          recallToActive,
          removeMuteScene,
        },
        importMuteScene,
        exportMuteScene,
      }}
    >
      {children}
    </MuteMapperContext.Provider>
  )
}
