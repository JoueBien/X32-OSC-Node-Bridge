/**
 * The X32 class was based on some code found in the osc read me
 * https://github.com/colinbdclark/osc.js#sample-code-2
 * and this issue here
 * https://github.com/colinbdclark/osc.js/issues/145
 */
// Libs
import { type } from "os";
import { ArgumentWithMetadataShape, FullTimeTag } from "../../types/osc";
import { delay } from "../time"
import {
  UDPPort,
  UDPPortInstance,
  OptionalMessage,
  Message,
  Argument,
} from "./osc"

export type ConnectParams = { mixerIp: string; debug?: boolean }

export type RequestFuncParams = OptionalMessage<ArgumentWithMetadataShape<any>> | Message<ArgumentWithMetadataShape<any>>
export type RequestFunc = ({ address, args }: RequestFuncParams) => void

export type UnSubscribeFunc = () => void
export type IntervalReference = {
  interval?: NodeJS.Timer
  onMessage?: any
}

export type OnMessageFunc = (message: Message<ArgumentWithMetadataShape<any>>, timeTag: FullTimeTag, info: any) => void

export type SubscribeFuncParams = RequestFuncParams & { onMessage: OnMessageFunc }
export type SubscribeFunc = ({
  address,
  args,
  onMessage,
}: SubscribeFuncParams) => Promise<IntervalReference | undefined>


export default class X32 {
  udpPort?: UDPPortInstance
  connected: boolean = false

  // Do nothing when created
  constructor() {}

  connect(params: ConnectParams) {
    return new Promise<boolean>((resolve) => {
      console.log("params", params)
      const { mixerIp, debug } = params
      // Make sure we don't re-open on top
      this.disconnect()

      // Carpet bomb types because the pre-release ones suck
      try {
        this.udpPort = new UDPPort({
          localAddress: "0.0.0.0",
          localPort: 57121,
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
      }

      // Emit Debug Data
      if (debug === true) {
        // On error show track
        this.udpPort?.on("error", function (error: any) {
          console.log("An error occurred: ", error?.message)
          console.trace(error)
        })
      }

      // On Ready request a message
      this.udpPort?.on("ready", () => {
        this.connected = true
        // On Ready Respond to info
        this.udpPort?.on("message", function (oscMsg, timeTag, info) {
          if (oscMsg.address === "/info") {
            console.log("/info", oscMsg)
            resolve(true)
          }
        })
        // Request info 
        this.request({
          address: "/info",
        })
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
          this.request({ address: "/renew", args: [
            {"type": "s", "value": address},
          ]})
        }
      }, 10000-200)
      // Start the first request
      // await delay(100)
      this.request({ address, args })


      return {
        interval,
        onMessage
      }
    }
    return {} as IntervalReference
  }

  unsubscribe({interval, onMessage }: IntervalReference) {
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
    // console.log("@X32->request", address, args, this.udpPort)
    this.udpPort?.send({
      address,
      args: args || [],
    })
  }
}
