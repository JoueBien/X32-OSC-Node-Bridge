import { useLocalStorage } from "usehooks-ts"
import { useObjectList } from "./useObjectList"
import { useEffect } from "react"
import { v4 as uuid } from "uuid"
import {
  DialogueOpenRequestArgs,
  DialogueOpenResponseArgs,
  DialogueSaveRequestArgs,
  DialogueSaveResponseArgs,
  WindowWithIpcRenderer,
} from "@/types/dialogues"
import { RecordMap, useIdRecordList } from "./useIdRecordList"

const ipcRenderer = (window as unknown as WindowWithIpcRenderer).ipcRenderer

export type StorageItem<T> = {
  name: string
  version: number
  // id: string
} & T

export function useStoredSceneList<T>(params: {
  key: string
  writeVersion: number
  supportedVersions: number[]
  exportFileTypes: Electron.FileFilter[]
  importFileTypes: Electron.FileFilter[]
  messages?: {
    importMessage?: string
    exportMessage?: string
    unsupportedVersionMessage?: string
    unableToReadFileMessage?: string
  }
}) {
  // Params
  const { key, writeVersion, supportedVersions, messages, importFileTypes } =
    params
  const {
    importMessage,
    exportMessage,
    unsupportedVersionMessage,
    unableToReadFileMessage,
  } = messages || {}
  const fullKey = `scene-saves-${key}-2`

  // Local State
  const [savedList, setSaveList] = useLocalStorage<RecordMap<StorageItem<T>>>(
    fullKey,
    {}
  )
  const { list, map, setItem, updateItem, newItem, deleteItem } =
    useIdRecordList<StorageItem<T>>(savedList)

  // Calc
  // Only show supported versions
  const supportedList = list.filter((item) =>
    supportedVersions.includes(item.value.version)
  )

  // Effects
  // Keep storage in sync with list
  useEffect(() => {
    setSaveList(map)
  }, [map])

  // Function
  // Save a new scene locally
  const saveNewScene = async (item: StorageItem<T>) => {
    const id = await newItem({
      ...item,
      version: writeVersion,
    })
    return id
  }

  const updateScene = (id: string, item: StorageItem<T>) => {
    updateItem(id, item)
  }

  // Remove a local scene
  const removeScene = async (id: string) => {
    await deleteItem(id)
  }

  // Import and Export to a file
  const importScene = () => {
    return new Promise<StorageItem<T> | string | undefined>((resolve) => {
      const channel = uuid()
      const args: DialogueOpenRequestArgs = {
        channel,
        options: {
          message: importMessage || "Import scene from file.",
          filters: importFileTypes,
        },
      }
      ipcRenderer.send("dialogue-open", args)
      ipcRenderer.once(channel, (_event, arg: DialogueOpenResponseArgs) => {
        const { contents } = arg
        if (contents) {
          try {
            const item: StorageItem<T> = JSON.parse(contents)
            if (supportedVersions.includes(item?.version)) {
              return resolve(item)
            }
            return resolve(unsupportedVersionMessage || "Un-supported version")
          } catch (e) {
            return resolve(unableToReadFileMessage || "Unable to read file")
          }
        }
        return resolve(undefined)
      })
    })
  }

  const exportScene = (value: T, name: string) => {
    const item: StorageItem<T> = {
      ...value,
      id: uuid(),
      name,
      version: writeVersion,
    }
    return new Promise<undefined>((resolve) => {
      const channel = uuid()
      const args: DialogueSaveRequestArgs = {
        channel,
        contents: JSON.stringify(item),
        options: {
          message: exportMessage || "Export scene from file.",
          filters: importFileTypes,
        },
      }
      ipcRenderer.send("dialogue-save", args)
      ipcRenderer.once(channel, (_event, _arg: DialogueSaveResponseArgs) => {
        resolve(undefined)
      })
    })
  }

  return {
    list,
    map,
    supportedList,
    saveNewScene,
    updateScene,
    removeScene,
    exportScene,
    importScene,
  }
}
