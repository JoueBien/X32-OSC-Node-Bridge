/**
 * The X32 class was based on some code found in the osc read me
 * https://github.com/colinbdclark/osc.js#sample-code-2
 * and this issue here
 * https://github.com/colinbdclark/osc.js/issues/145
 */
// Libs
import { ArgumentWithMetadataShape, FullTimeTag } from "../../../src/types/osc"
import { delay } from "../../../src/shared/helpers/time"
import { UDPPort, UDPPortInstance, OptionalMessage, Message } from "./osc"
import { v4 as uuidv4 } from "uuid"

export type ConnectParams = { mixerIp: string; debug?: boolean }

export type RequestFuncParams =
  | OptionalMessage<ArgumentWithMetadataShape<any>>
  | Message<ArgumentWithMetadataShape<any>>
export type Arg = ArgumentWithMetadataShape<any>
export type RequestFunc = ({ address, args }: RequestFuncParams) => void

export type UnSubscribeFunc = () => void
export type IntervalReference = {
  interval?: NodeJS.Timer
  onMessage?: any
}

export type OnMessageFunc = (
  message: Message<ArgumentWithMetadataShape<any>>,
  timeTag: FullTimeTag,
  info: any
) => void

export type SubscribeFuncParams = RequestFuncParams & {
  onMessage: OnMessageFunc
  frequency: number
}
export type SubscribeFunc = ({
  address,
  args,
  onMessage,
  frequency,
}: SubscribeFuncParams) => Promise<IntervalReference | undefined>

export type RequestThenReplyFuncParams = RequestFuncParams & {}

export type RequestThenReplyFunc = ({
  address,
  args,
}: RequestThenReplyFuncParams) => Promise<
  Message<ArgumentWithMetadataShape<any>> | undefined
>

export type Info = {
  serverVersion: string
  serverName: string
  console: string
  version: string
}

export default class X32 {
  udpPort?: UDPPortInstance
  connected: boolean = false
  localPort: number

  // Set the reply port the mixer replies on init
  constructor(localPort: number) {
    this.localPort = localPort
  }

  connect(params: ConnectParams) {
    return new Promise<false | Info>((resolve) => {
      const { mixerIp, debug } = params
      // Make sure we don't re-open on top
      this.disconnect()

      // Carpet bomb types because the pre-release ones suck
      try {
        this.udpPort = new UDPPort({
          localAddress: "0.0.0.0",
          localPort: this.localPort,
          metadata: true,
          remoteAddress: mixerIp,
          remotePort: 10023,
          broadcast: false,
        }) as any

        // Request Connect
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
          console.log("An error occurred: ", error?.message)
          console.trace(error)
        })
      }

      // Do the last part here async
      // We are considered connected when ready and we get the console info
      ;(async () => {
        const isReady = await this.ready()
        console.log("isReady", isReady)
        if (isReady === true) {
          const info = await this.requestAndReply({
            address: "/info",
            args: [],
          })
          if (info !== undefined) {
            this.connected = true
            resolve({
              serverVersion: info?.args?.[0].value || "",
              serverName: info?.args?.[1].value || "",
              console: info?.args?.[2].value || "",
              version: info?.args?.[3].value || "",
            })
            return
          }
        }
        this.connected = false
        resolve(false)
      })()
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

  // When we only need on address
  // Clean up with unsubscribe to unregister
  onMessage(address: string, onMessage: OnMessageFunc) {
    return this.onMessages([address], onMessage)
  }

  async requestAndReply({ address, args }: RequestThenReplyFuncParams) {
    let isResolved = false
    return new Promise<Message<ArgumentWithMetadataShape<any>> | undefined>(
      (resolve) => {
        // When done we return the message & Clean up
        const onDone: OnMessageFunc = (oscMsg, timeTag, info) => {
          if (oscMsg.address === address) {
            // console.log('oscMsg', oscMsg)
            isResolved = true
            this.udpPort?.off("message", onDone)
            resolve(oscMsg)
          }
        }

        this.udpPort?.on("message", onDone as any)

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
      }
    )
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
          this.request({
            address,
          })
        }
      }, 5000)
      // Start the first request
      await delay(200)
      this.request({ address })

      return {
        interval,
        onMessage,
      }
    }
    return {} as IntervalReference
  }

  async batchSubscribe({ args, onMessage, frequency }: SubscribeFuncParams) {
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

  async formatSubscribe({ args, onMessage, frequency }: SubscribeFuncParams) {
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

  unsubscribe({ interval, onMessage }: IntervalReference) {
    if (interval) {
      clearInterval(interval)
    }
    if (onMessage) {
      this.udpPort?.off("message", onMessage)
    }
  }

  // Close the connection if exists
  disconnect() {
    try {
      this.udpPort?.close()
      this.connected = false
    } catch (error) {
      this.connected = false
      // console.trace("@X32->disconnect already disconnected", error)
    }
  }

  // Send message to server
  request({ address, args }: RequestFuncParams) {
    console.log("@X32->request", address, args)
    this.udpPort?.send({
      address,
      args: args || [],
    })
  }
}
