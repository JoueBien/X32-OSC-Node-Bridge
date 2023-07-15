export type DialogueOpenRequestArgs = {
  channel: string
  options: {
    filters: Electron.FileFilter[],
    message?: string
  }
  // fileExtensions: string[]
}

export type DialogueOpenResponseArgs = {
  contents?: string
}