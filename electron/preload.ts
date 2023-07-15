import { contextBridge, ipcRenderer } from "electron"
import { initAppMixerEventListenersBridge } from "./OSC/MixerEventListeners"

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const contextBridgeRes = {
  ...initAppMixerEventListenersBridge(),
  // This is so dumb - this should just be import in render
  ipc: contextBridge.exposeInMainWorld("ipcRenderer", {
    // And we can't just expose it we have to wrap it
    on: (channel: any, listener: any) => ipcRenderer.on(channel, listener),
    once: (channel: any, listener: any) => ipcRenderer.once(channel, listener),
    send: (channel: any, args: any) => ipcRenderer.send(channel, args),
  }),
}
