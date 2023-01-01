import { contextBridge } from "electron"
import X32, { ConnectParams, Info, RequestFuncParams, IntervalReference, RequestThenReplyFuncParams, SubscribeFuncParams } from "./core/X32"

// We can't expose X32 directly so
const OscMixer = new X32()

// we use the bridge to use OSC/Node in the render
const shared = {
  // Connect & Disconnect
  connect: (params: ConnectParams): Promise<boolean | Info> => OscMixer.connect(params),
  isConnected: () => OscMixer.isConnected(),
  disconnect: () => OscMixer.disconnect(),

  // Communication Functions
  request: (params: RequestFuncParams) => OscMixer.request(params),
  requestAndReply: (params: RequestThenReplyFuncParams) => OscMixer.requestAndReply(params),
  subscribe: (params: SubscribeFuncParams) => OscMixer.subscribe(params),
  batchSubscribe: (params: SubscribeFuncParams) => OscMixer.batchSubscribe(params),
  formatSubscribe: (params: SubscribeFuncParams) => OscMixer.formatSubscribe(params),
  unsubscribe: (params: IntervalReference) => OscMixer.unsubscribe(params),
}
export function initAppMixerEventListenersBridge() {
  return contextBridge.exposeInMainWorld('Mixer', shared)
}

// Expose the type
export type Mixer = typeof shared

