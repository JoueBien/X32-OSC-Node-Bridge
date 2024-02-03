import { contextBridge } from "electron"
import X32 from "~/OSC/core/X32"

import {
  ConnectParams,
  Info,
  RequestFuncParams,
  IntervalReference,
  RequestThenReplyFuncParams,
  SubscribeFuncParams,
  OnMessageFunc,
  BatchSubscribeFuncParams,
} from "~/OSC/core/X32.types"

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
    // Send Message
    request: (params: RequestFuncParams) => OscMixer.request(params),
    requestX: (params: RequestFuncParams) => OscMixer.requestX(params),
    requestAndReply: (params: RequestThenReplyFuncParams) =>
      OscMixer.requestAndReply(params),

    // Get Updates a number of times 10 seconds
    xSubscribe: () => OscMixer.xSubscribe(),
    subscribe: (params: SubscribeFuncParams) => OscMixer.subscribe(params),
    batchSubscribe: (params: BatchSubscribeFuncParams) =>
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

    // For use with X
    onAnyMessageX: (onMessage: OnMessageFunc) =>
      OscMixer.onAnyMessageX(onMessage),
    onMessagesX: (addresses: string[], onMessage: OnMessageFunc) =>
      OscMixer.onMessagesX(addresses, onMessage),
    onMessageX: (addresses: string, onMessage: OnMessageFunc) =>
      OscMixer.onMessageX(addresses, onMessage),
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

export type WindowMixerSharedKey = keyof WindowMixerShared
