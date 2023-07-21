import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  powerSaveBlocker,
  powerMonitor,
} from "electron"
import {
  DialogueOpenRequestArgs,
  DialogueOpenResponseArgs,
  DialogueQuestionArgs,
  DialogueQuestionResponseArgs,
  DialogueSaveRequestArgs,
} from "@/types/dialogues"
import { promises as fsPromises } from "node:fs"
// Tell electron to be quiet in dev mode
if (!app.isPackaged) {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"
}
const { readFile, writeFile } = fsPromises

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit()
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "X32 OSC Node Bridge",
    autoHideMenuBar: true,

    webPreferences: {
      backgroundThrottling: false,
      // contextIsolation: false,
      nodeIntegration: true,
      contextIsolation: true,
      // @ts-ignore
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow()
  // Tell the app to never suspend while out of focus
  powerMonitor.on("lock-screen", () => {
    powerSaveBlocker.start("prevent-display-sleep")
  })
  powerMonitor.on("suspend", () => {
    powerSaveBlocker.start("prevent-app-suspension")
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// On an save request save file
ipcMain.on("dialogue-save", async (event, arg: DialogueSaveRequestArgs) => {
  const { channel, options, contents } = arg
  const { filters, message } = options
  try {
    // Let the user find the file
    const res = await dialog.showSaveDialog({
      filters,
      message,
    })
    const filePath: string | undefined = res?.filePath
    if (res.canceled || filePath === undefined) {
      throw new Error("file save canceled")
    }
    // Write file here
    await writeFile(filePath, contents, { encoding: "utf8" })
    event.sender.send(channel, {})
  } catch (e: any) {
    console.error('@ipcMain.on("dialogue-save")', e)
    event.sender.send(channel, {})
  }
})

// On an open request read a file
ipcMain.on("dialogue-open", async (event, arg: DialogueOpenRequestArgs) => {
  const { channel, options } = arg
  const { filters, message } = options
  try {
    // Let the user find the file
    const res = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters,
      message,
    })
    // Read the file or reject if something went wrong
    const filePath: string | undefined = res?.filePaths?.[0]
    if (res.canceled || filePath === undefined) {
      throw new Error("file open canceled")
    }
    const fileRes = await readFile(filePath, { encoding: "utf8" })
    const args: DialogueOpenResponseArgs = {
      contents: fileRes,
    }
    event.sender.send(channel, args)
  } catch (e) {
    console.error('@ipcMain.on("dialogue-open")', e)
    event.sender.send(channel, {})
  }
})

ipcMain.on("dialogue-question", async (event, arg: DialogueQuestionArgs) => {
  const { channel, options } = arg
  const { buttons, message, detail } = options

  const { response } = await dialog.showMessageBox({
    message: message || "Question?",
    detail: detail || undefined,
    type: "question",
    noLink: true,
    buttons,
  })

  const res: DialogueQuestionResponseArgs = {
    button: response,
  }
  event.sender.send(channel, res)
})
