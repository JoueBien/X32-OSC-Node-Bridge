import {
  MessageArg,
  OnListenerMessage,
  ResponseMessage,
  SendMessage,
} from "osc"
import { FrequencyFactor } from "@/types/frequencyFactor"

export type ConnectParams = { mixerIp: string; debug?: boolean }

export type RequestFuncParams = SendMessage
export type Arg = MessageArg
export type RequestFunc = ({ address, args }: RequestFuncParams) => void

export type UnSubscribeFunc = () => void
export type IntervalReference = {
  interval?: NodeJS.Timer
  onMessage?: any
}

export type OnMessageFunc<ARG_T = MessageArg[]> = OnListenerMessage<ARG_T>

export type SubscribeFuncParams = RequestFuncParams & {
  onMessage: OnMessageFunc
  frequency: FrequencyFactor
}

export type BatchSubscribeFuncParams = Omit<RequestFuncParams, "address"> & {
  onMessage: OnMessageFunc
  frequency: FrequencyFactor
}

export type FormatSubscribeFuncParams = Omit<RequestFuncParams, "address"> & {
  onMessage: OnMessageFunc
  frequency: FrequencyFactor
}

export type SubscribeFunc = ({
  address,
  args,
  onMessage,
  frequency,
}: SubscribeFuncParams) => Promise<IntervalReference | undefined>

export type RequestThenReplyFuncParams = RequestFuncParams // & {}

export type RequestThenReplyFunc = ({
  address,
  args,
}: RequestThenReplyFuncParams) => Promise<ResponseMessage | undefined>

export type Info = {
  serverVersion: string
  serverName: string
  console: string
  version: string
}
