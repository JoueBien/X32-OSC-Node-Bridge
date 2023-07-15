import { useLocalStorage } from "usehooks-ts"
import { useObjectList } from "./useObjectList"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { ipcRenderer } from "electron"
import {
  DialogueOpenRequestArgs,
  DialogueOpenResponseArgs,
} from "types/dialogues"

export type StorageItem<T> = {
  name: string
  version: number
  id: string
} & T

export function useStoredSceneList<T>(params: {
  key: string
  writeVersion: number
  supportedVersions: number[]
  fileTypes: Electron.FileFilter[]
  openMessage?: string
}) {
  // Params
  const { key, writeVersion, openMessage, fileTypes } = params
  const fullKey = `scene-saves-${key}`

  // Local State
  const [savedList, setSaveList] = useLocalStorage<StorageItem<T>[]>(
    fullKey,
    []
  )
  const { list, pushStart, removeObject } =
    useObjectList<StorageItem<T>>(savedList)

  // Effects
  // Keep storage in sync with list
  useEffect(() => {
    setSaveList(savedList)
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
    const channel = uuid()
    const args: DialogueOpenRequestArgs = {
      channel,
      options: {
        message: openMessage || "Import scene from file.",
        filters: fileTypes,
      },
    }
    ipcRenderer.send("dialogue-open", args)
    ipcRenderer.once(channel, (event, arg: DialogueOpenResponseArgs) => {
      console.log("@@hi", arg)
    })
  }
  const exportScene = async (item: StorageItem<T>) => {}

  return {
    list,
    saveNewScene,
    removeScene,
    exportScene,
    importScene,
  }
}
