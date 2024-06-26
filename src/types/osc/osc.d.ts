// Right types
type UDPPortOptions = {
  localPort?: number
  localAddress?: string
  remotePort?: number
  remoteAddress?: string
  broadcast?: boolean
  multicastTTL?: number
  multicastMembership?: string[]
  socket?: any
  socketId?: any
  metadata?: boolean
}

type MessageArgFloat = {
  type: "f"
  value: number
}

type MessageArgInt = {
  type: "i"
  value: number
}

type MessageArgString = {
  type: "s"
  value: string
}

type MessageArgBytes = {
  type: "s"
  value: Uint8Array
}

type MessageArg =
  | MessageArgFloat
  | MessageArgString
  | MessageArgInt
  | MessageArgBytes

type SendMessage<ARG_A = MessageArg[]> = {
  address: string
  args?: ARG_A
}

type ResponseMessage<ARG_A = MessageArg[]> = {
  address: string
  args: ARG_A
}

type OnListenerReady = () => void
type OnListenerMessage<ARG_T = MessageArg[]> = (
  message: ResponseMessage<ARG_T>,
  timeTag: FullTimeTag,
  info: any
) => void

type OnListenerError = (error: any) => void
type OnListeners = OnListenerReady | OnListenerMessage | OnListenerError

declare class OscBase {
  open(): void
  listen(): void
  close(): void
}

declare class OscEventsAndBase extends OscBase {
  // Send message.
  send(oscPacket: SendMessage): void

  // On every time.
  on(event: "ready", listener: OnListenerReady): void
  on<ARG_T = MessageArg>(
    event: "message",
    listener: OnListenerMessage<ARG_T>
  ): void
  on(event: "error", listener: OnListenerError): void

  // Only on single time - auto off after first time.
  once(event: "ready", listener: OnListenerReady): void
  once<ARG_T = MessageArg>(
    event: "message",
    listener: OnListenerMessage<ARG_T>
  ): void
  once(event: "error", listener: OnListenerError): void

  // Any here because the shape of the return arg does not matter.
  off<ARG_T = any>(
    event: "read" | "message" | "error",
    listener: OnListeners<ARG_T>
  ): void
}

class UDPPort extends OscEventsAndBase {
  constructor(options?: UDPPortOptions)
}

declare module "osc" {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  // import osc from "osc"
  // import { UDPPort } from "./osc"

  export {
    UDPPort,
    UDPPortOptions,
    MessageArgFloat,
    MessageArgInt,
    MessageArgString,
    MessageArgBytes,
    Uint8Array,
    MessageArg,
    SendMessage,
    ResponseMessage,
    OnListenerReady,
    OnListenerError,
    OscBase,
    OscEventsAndBase,
    OnListenerMessage,
  }
}
