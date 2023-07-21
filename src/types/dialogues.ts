export type DialogueOpenRequestArgs = {
  channel: string
  options: {
    filters: Electron.FileFilter[]
    message?: string
  }
}

export type DialogueQuestionArgs = {
  channel: string
  options: {
    buttons?: string[]
    message?: string
    detail?: string
  }
}

export type DialogueQuestionResponseArgs = {
  button: number
}

export type DialogueSaveRequestArgs = {
  channel: string
  contents: string
  options: {
    filters: Electron.FileFilter[]
    message?: string
  }
}

export type DialogueSaveResponseArgs = NonNullable<unknown>

export type DialogueOpenResponseArgs = {
  contents?: string
}

export type WindowWithIpcRenderer = Window & {
  ipcRenderer: Electron.IpcRenderer
}
