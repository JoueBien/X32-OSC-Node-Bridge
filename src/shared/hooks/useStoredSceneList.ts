import { useLocalStorage } from "usehooks-ts"
import { useObjectList } from "./useObjectList"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import {
  DialogueOpenRequestArgs,
  DialogueOpenResponseArgs,
  DialogueSaveRequestArgs,
  DialogueSaveResponseArgs,
  WindowWithIpcRenderer,
} from "types/dialogues"

const ipcRenderer = (window as unknown as WindowWithIpcRenderer).ipcRenderer

export type StorageItem<T> = {
  name: string
  version: number
  id: string
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
  const fullKey = `scene-saves-${key}`

  // Local State
  const [savedList, setSaveList] = useLocalStorage<StorageItem<T>[]>(
    fullKey,
    []
  )
  const { list, pushStart, removeObject } =
    useObjectList<StorageItem<T>>(savedList)

  // Calc
  // Only show supported versions
  const supportedList = list.filter((item) =>
    supportedVersions.includes(item.version)
  )

  // Effects
  // Keep storage in sync with list
  useEffect(() => {
    setSaveList(list)
  }, [list])

  // Function
  // Save a new scene locally
  const saveNewScene = async (item: Omit<StorageItem<T>, "id" | "version">) => {
    await pushStart({
      ...item,
      version: writeVersion,
      id: uuid(),
    } as StorageItem<T>)
  }

  // Remove a local scene
  const removeScene = async (item: StorageItem<T>) => {
    await removeObject(item)
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
      ipcRenderer.once(channel, (event, arg: DialogueOpenResponseArgs) => {
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

  const exportScene = (item: StorageItem<T>) => {
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
      ipcRenderer.once(channel, (event, arg: DialogueSaveResponseArgs) => {
        resolve(undefined)
      })
    })
  }

  return {
    list,
    supportedList,
    saveNewScene,
    removeScene,
    exportScene,
    importScene,
  }
}
