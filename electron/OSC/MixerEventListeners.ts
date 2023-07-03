import { contextBridge } from "electron"
import X32, {
  ConnectParams,
  Info,
  RequestFuncParams,
  IntervalReference,
  RequestThenReplyFuncParams,
  SubscribeFuncParams,
} from "./core/X32"

// We can't expose X32 directly so
// we use the bridge to use OSC/Node in the render
const shared = () => {
  const OscMixer = new X32()
  return {
    // Connect & Disconnect
    connect: (params: ConnectParams): Promise<boolean | Info> =>
      OscMixer.connect(params),
    isConnected: () => OscMixer.isConnected(),
    disconnect: () => OscMixer.disconnect(),

    // Communication Functions
    request: (params: RequestFuncParams) => OscMixer.request(params),
    requestAndReply: (params: RequestThenReplyFuncParams) =>
      OscMixer.requestAndReply(params),
    subscribe: (params: SubscribeFuncParams) => OscMixer.subscribe(params),
    batchSubscribe: (params: SubscribeFuncParams) =>
      OscMixer.batchSubscribe(params),
    formatSubscribe: (params: SubscribeFuncParams) =>
      OscMixer.formatSubscribe(params),
    unsubscribe: (params: IntervalReference) => OscMixer.unsubscribe(params),
  }
}
export function initAppMixerEventListenersBridge() {
  return {
    Mixer: contextBridge.exposeInMainWorld("Mixer", shared()),
    MixerA: contextBridge.exposeInMainWorld("MixerA", shared()),
    MixerB: contextBridge.exposeInMainWorld("MixerB", shared()),
  }
}

// Expose the type
export type Mixer = ReturnType<typeof shared>

export type WindowMixerShared = {
  Mixer: Mixer
  MixerA: Mixer
  MixerB: Mixer
}