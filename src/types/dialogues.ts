export type DialogueOpenRequestArgs = {
  channel: string
  options: {
    filters: Electron.FileFilter[]
    message?: string
  }
}

export type DialogueSaveRequestArgs = {
  channel: string
  contents: string,
  options: {
    filters: Electron.FileFilter[]
    message?: string
  }
}

export type DialogueSaveResponseArgs = {}

export type DialogueOpenResponseArgs = {
  contents?: string
}

export type WindowWithIpcRenderer = Window & {
  ipcRenderer: Electron.IpcRenderer
}
