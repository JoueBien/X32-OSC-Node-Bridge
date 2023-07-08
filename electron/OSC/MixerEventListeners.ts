import { contextBridge } from "electron"
import X32, {
  ConnectParams,
  Info,
  RequestFuncParams,
  IntervalReference,
  RequestThenReplyFuncParams,
  SubscribeFuncParams,
  OnMessageFunc,
} from "./core/X32"

// We can't expose X32 directly so
// we use the bridge to use OSC/Node in the render
const shared = (localPort: number) => {
  const OscMixer = new X32(localPort)
  return {
    // Connect & Disconnect
    connect: (params: ConnectParams): Promise<boolean | Info> =>
      OscMixer.connect(params),
    isConnected: () => OscMixer.isConnected(),
    disconnect: () => OscMixer.disconnect(),

    // Communication Functions
    // Send Message
    request: (params: RequestFuncParams) => OscMixer.request(params),
    requestAndReply: (params: RequestThenReplyFuncParams) =>
      OscMixer.requestAndReply(params),
    
     // Get Updates a number of times 10 seconds
    subscribe: (params: SubscribeFuncParams) => OscMixer.subscribe(params),
    batchSubscribe: (params: SubscribeFuncParams) =>
      OscMixer.batchSubscribe(params),
    formatSubscribe: (params: SubscribeFuncParams) =>
      OscMixer.formatSubscribe(params),
    unsubscribe: (params: IntervalReference) => OscMixer.unsubscribe(params),

    // Handel messages with out subscribe
    onAnyMessage: (onMessage: OnMessageFunc) =>
      OscMixer.onAnyMessage(onMessage),
    onMessages: (addresses: string[], onMessage: OnMessageFunc) =>
      OscMixer.onMessages(addresses, onMessage),
    onMessage: (addresses: string, onMessage: OnMessageFunc) =>
      OscMixer.onMessage(addresses, onMessage),
  }
}
export function initAppMixerEventListenersBridge() {
  return {
    Mixer: contextBridge.exposeInMainWorld("Mixer", shared(57121)),
    MixerA: contextBridge.exposeInMainWorld("MixerA", shared(57122)),
    MixerB: contextBridge.exposeInMainWorld("MixerB", shared(57123)),
  }
}

// Expose the type
export type Mixer = ReturnType<typeof shared>

export type WindowMixerShared = {
  Mixer: Mixer
  MixerA: Mixer
  MixerB: Mixer
}

export type WindowMixerSharedKey = keyof WindowMixerShared
