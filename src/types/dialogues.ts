export type DialogueOpenRequestArgs = {
  channel: string
  options: {
    filters: Electron.FileFilter[]
    message?: string
  }
}

export type DialogueOpenResponseArgs = {
  contents?: string
}

export type WindowWithIpcRenderer = Window & {
  ipcRenderer: Electron.IpcRenderer
}
