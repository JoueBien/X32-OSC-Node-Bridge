/**
 * The X32 class was based on some code found in the osc read me
 * https://github.com/colinbdclark/osc.js#sample-code-2
 * and this issue here
 * https://github.com/colinbdclark/osc.js/issues/145
 */
// Libs
import { delay } from "@/shared/utils/time"
import {
  MessageArg,
  MessageArgString,
  OnListenerMessage,
  ResponseMessage,
  UDPPort,
} from "osc"
import { v4 as uuidv4 } from "uuid"
import getPort from "get-port"
import { FixedArray } from "@/types/args"

import {
  ConnectParams,
  OnMessageFunc,
  IntervalReference,
  RequestThenReplyFuncParams,
  SubscribeFuncParams,
  RequestFuncParams,
  BatchSubscribeFuncParams,
  Arg,
  FormatSubscribeFuncParams,
  Info,
} from "./X32.types"

export default class X32 {
  udpPort?: UDPPort
  udpPortX?: UDPPort
  connected = false

  constructor() {}

  connect(params: ConnectParams) {
    return new Promise<false | Info>(async (resolve) => {
      const { mixerIp, debug } = params
      // Make sure we don't re-open on top
      this.disconnect()

      // Carpet bomb types because the pre-release ones suck
      try {
        this.udpPort = new UDPPort({
          localAddress: "0.0.0.0",
          localPort: await getPort(),
          metadata: true,
          remoteAddress: mixerIp,
          remotePort: 10023,
          broadcast: false,
        }) as any
        this.udpPortX = new UDPPort({
          localAddress: "0.0.0.0",
          localPort: await getPort(),
          metadata: true,
          remoteAddress: mixerIp,
          remotePort: 10023,
          broadcast: false,
        }) as any

        // Request Connect
        this.udpPortX?.open()
        this.udpPort?.open()
      } catch (e) {
        this.connected = false
        console.trace("fc-connect", e)
        resolve(false)
        return
      }

      // Emit Debug Data
      if (debug === true) {
        // On error show track
        this.udpPort?.on("error", function (error: any) {
          console.info("An error occurred: ", error?.message)
          console.trace(error)
        })
        this.udpPortX?.on("error", function (error: any) {
          console.info("An error occurred X: ", error?.message)
          console.trace(error)
        })
      }

      // Do the last part here async
      // We are considered connected when ready and we get the console info
      // ;(async () => {
      const isReady = await this.ready()
      console.info("isReady", isReady)
      if (isReady === true) {
        const info = await this.requestAndReply<
          FixedArray<MessageArgString | undefined, 4>
        >({
          address: "/info",
          args: [],
        })
        if (info !== undefined) {
          this.connected = true
          const x32Info = {
            serverVersion: info?.args?.[0].value || "",
            serverName: info?.args?.[1].value || "",
            console: info?.args?.[2].value || "",
            version: info?.args?.[3].value || "",
          }
          console.log("@X32->connect mixer info", x32Info)
          resolve(x32Info)
          return
        }
      }
      this.connected = false
      resolve(false)
      // })()
    })
  }

  isConnected() {
    return this.connected
  }

  async ready() {
    return new Promise<boolean>((resolve) => {
      let isResolved = false
      const onDone = () => {
        isResolved = true
        this.udpPort?.off("message", onDone)
        resolve(true)
      }
      this.udpPort?.on("ready", onDone)
      // If we never got a response we need to clean up
      delay(300).then(() => {
        if (isResolved === false) {
          this.udpPort?.off("message", onDone)
          resolve(false)
        }
      })
    })
  }

  // When we get any message we should process messages
  // Clean up with unsubscribe to unregister
  onAnyMessage(onMessage: OnMessageFunc): IntervalReference {
    const _onMessage: OnMessageFunc = (a, b, c) => {
      onMessage(a, b, c)
    }
    if (this.connected) {
      // register an event handler to update on any message
      this?.udpPort?.on("message", _onMessage as any)
      // Return a listener
      const ret: IntervalReference = {
        onMessage: onMessage,
        interval: undefined,
      }
      return ret
    }
    return {} as IntervalReference
  }

  onAnyMessageX(onMessage: OnMessageFunc): IntervalReference {
    const _onMessage: OnMessageFunc = (a, b, c) => {
      onMessage(a, b, c)
    }
    if (this.connected) {
      // register an event handler to update on any message
      this?.udpPortX?.on("message", _onMessage as any)
      // Return a listener
      const ret: IntervalReference = {
        onMessage: onMessage,
        interval: undefined,
      }
      return ret
    }
    return {} as IntervalReference
  }

  // When we get a specific set of addresses
  // Clean up with unsubscribe to unregister
  onMessages(addresses: string[], onMessage: OnMessageFunc) {
    const handler: OnMessageFunc = (oscMsg, timeTag, info) => {
      // console.log("@onAny", oscMsg.address, addresses.includes(oscMsg.address))
      if (addresses.includes(oscMsg.address)) {
        onMessage(oscMsg, timeTag, info)
      }
    }
    return this.onAnyMessage(handler)
  }

  onMessagesX(addresses: string[], onMessage: OnMessageFunc) {
    const handler: OnMessageFunc = (oscMsg, timeTag, info) => {
      // console.log("@onAny", oscMsg.address, addresses.includes(oscMsg.address))
      if (addresses.includes(oscMsg.address)) {
        onMessage(oscMsg, timeTag, info)
      }
    }
    return this.onAnyMessageX(handler)
  }

  // When we only need on address
  // Clean up with unsubscribe to unregister
  onMessage(address: string, onMessage: OnMessageFunc) {
    return this.onMessages([address], onMessage)
  }

  onMessageX(address: string, onMessage: OnMessageFunc) {
    return this.onMessagesX([address], onMessage)
  }

  async requestAndReply<ARG_T = MessageArg[]>({
    address,
    args,
  }: RequestThenReplyFuncParams) {
    let isResolved = false
    return new Promise<ResponseMessage<ARG_T> | undefined>((resolve) => {
      // When done we return the message & Clean up
      const onDone: OnListenerMessage<ARG_T> = (oscMsg, _timeTag, _info) => {
        if (oscMsg.address === address) {
          // console.log('oscMsg', oscMsg)
          isResolved = true
          this.udpPort?.off("message", onDone)
          resolve(oscMsg)
        }
      }

      this.udpPort?.on("message", onDone)

      this.request({
        address,
        args,
      })

      // If we never got a response we need to clean up
      delay(1000).then(() => {
        if (isResolved === false) {
          this.udpPort?.off("message", onDone)
          console.warn(`@requestAndReply->too slow to reply on ${address}`)
          resolve(undefined)
        }
      })
    })
  }

  async subscribe({ address, args, onMessage }: SubscribeFuncParams) {
    if (this.connected) {
      // Set up the message
      this.udpPort?.on("message", onMessage as any)
      // Set up the repeats
      const interval = setInterval(() => {
        if (this.connected) {
          console.log("Request Continue", address)
          // this.request({ address, args })
          this.request({
            address: "/renew",
            args: [{ type: "s", value: address }],
          })
        }
      }, 5000)
      // Start the first request
      await delay(200)
      this.request({ address, args })

      return {
        interval,
        onMessage,
      }
    }
    return {} as IntervalReference
  }

  async xSubscribe() {
    if (this.connected) {
      const onMessage = () => {}
      const address = "/xremote"
      // Set up the repeats
      const interval = setInterval(() => {
        if (this.connected) {
          this.requestX({
            address,
          })
        }
      }, 5000)
      // Start the first request
      await delay(200)
      this.requestX({ address })

      return {
        interval,
        onMessage,
      }
    }
    return {} as IntervalReference
  }

  async batchSubscribe({
    args,
    onMessage,
    frequency,
  }: BatchSubscribeFuncParams) {
    if (this.connected) {
      const address = `/${uuidv4()}`
      const requestArgs: Arg[] = [
        { type: "s", value: address },
        ...(args || []),
        { type: "i", value: frequency },
      ]

      const _onMessage: OnMessageFunc = (message, timeTag, info) => {
        if (message.address === address) {
          onMessage(message, timeTag, info)
        }
      }
      // Set up the message
      this.udpPort?.on("message", _onMessage as any)
      // Set up the repeats
      const interval = setInterval(() => {
        if (this.connected) {
          console.log("Request Continue", address)
          this.request({
            address: "/renew",
            args: [{ type: "s", value: address }],
          })
        }
      }, 5000)
      // Start the first request
      await delay(200)
      this.request({ address: "/batchsubscribe", args: requestArgs })

      return {
        interval,
        onMessage: _onMessage,
      }
    }
    return {} as IntervalReference
  }

  async formatSubscribe({
    args,
    onMessage,
    frequency,
  }: FormatSubscribeFuncParams) {
    if (this.connected) {
      const address = `/${uuidv4()}`
      const requestArgs: Arg[] = [
        { type: "s", value: address },
        ...(args || []),
        { type: "i", value: frequency },
      ]

      const _onMessage: OnMessageFunc = (message, timeTag, info) => {
        if (message.address === address) {
          onMessage(message, timeTag, info)
        }
      }
      // Set up the message
      this.udpPort?.on("message", _onMessage as any)
      // Set up the repeats
      const interval = setInterval(() => {
        if (this.connected) {
          console.log("Request Continue", address)
          this.request({
            address: "/renew",
            args: [{ type: "s", value: address }],
          })
        }
      }, 5000)
      // Start the first request
      await delay(200)
      this.request({ address: "/formatsubscribe", args: requestArgs })
      return {
        interval,
        onMessage,
      }
    }
    return {} as IntervalReference
  }

  unsubscribe(params?: IntervalReference) {
    const { interval, onMessage } = params || {}
    if (interval) {
      clearInterval(interval)
    }
    if (onMessage) {
      this.udpPort?.off("message", onMessage)
      this.udpPortX?.off("message", onMessage)
    }
  }

  // Close the connection if exists
  disconnect() {
    try {
      this.udpPort?.close()
      this.udpPortX?.close()
      this.connected = false
    } catch (error) {
      this.connected = false
      // console.trace("@X32->disconnect already disconnected", error)
    }
  }

  // Send message to server
  request({ address, args }: RequestFuncParams) {
    console.info("@X32->request using:(address, args)", address, args)
    this.udpPort?.send({
      address,
      args: args || [],
    })
  }
  requestX({ address, args }: RequestFuncParams) {
    console.info("@X32->requestX using:(address, args)", address, args)
    this.udpPortX?.send({
      address,
      args: args || [],
    })
  }
}
