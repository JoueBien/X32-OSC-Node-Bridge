// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { initAppMixerEventListenersBridge } from "./OSC/MixerEventListeners"
import { initIpcRendererListenersBridge } from "./ipcRenderer/IpcRendererListeners"

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const contextBridgeRes = {
  ...initAppMixerEventListenersBridge(),
  // This is so dumb - this should just be import in render
  ...initIpcRendererListenersBridge(),
}
