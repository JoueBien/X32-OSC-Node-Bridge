import { app, BrowserWindow, ipcMain, dialog } from "electron"
import {
  DialogueOpenRequestArgs,
  DialogueOpenResponseArgs,
  DialogueSaveRequestArgs,
} from "../src/types/dialogues"
import { promises as fsPromises } from "node:fs"
import * as path from "path"
// import { initAppMixerEventListeners } from "./OSC/MixerEventListeners"
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer"

const { readFile, writeFile } = fsPromises

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "X32 OSC Node Bridge",
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      // @ts-ignore
      enableRemoteModule: true,
    },
  })
  win.setMinimizable(false)

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`)
  } else {
    win.loadURL("http://localhost:3000/index.html")

    win.webContents.openDevTools()

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : "")
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    })
  }
}

app.whenReady().then(() => {
  // DevTools
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err))

  createWindow()
  // const mixerEventListeners = initAppMixerEventListeners(app)

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  })
})

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
