import { contextBridge, ipcRenderer } from "electron"

export function initIpcRendererListenersBridge() {
  return {
    ipcRenderer: contextBridge.exposeInMainWorld("ipcRenderer", {
      // And we can't just expose it we have to wrap it
      on: (channel: any, listener: any) => ipcRenderer.on(channel, listener),
      once: (channel: any, listener: any) =>
        ipcRenderer.once(channel, listener),
      send: (channel: any, args: any) => ipcRenderer.send(channel, args),
    }),
  }
}
