/**
 * The X32 class was based on some code found in the osc read me
 * https://github.com/colinbdclark/osc.js#sample-code-2
 * and this issue here
 * https://github.com/colinbdclark/osc.js/issues/145
 */
// Libs
import {
  UDPPort,
  UDPPortInstance,
  OptionalMessage,
  Message,
  Argument,
} from "./osc"

export type ConnectParams = { mixerIp: string; debug?: boolean }
export type RequestFunc = ({ address, args }: OptionalMessage<Argument> | Message<Argument>) => void


export default class X32 {
  udpPort?: UDPPortInstance

  // Do nothing when created
  constructor() {}

  connect(params: ConnectParams) {
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
      console.trace("fc-connect", e)
    } 

    // Emit Debug Data
    if (debug === true) {
      // On error show track
      this.udpPort?.on("error", function (error: any) {
        console.log("An error occurred: ", error?.message)
        console.trace(error)
      })
      // On Ready request a message
      this.udpPort?.on("ready", () => {
        console.log("ready")
        this.request({
          address: "/info",
        })
      })
    }
  }

  // Close the connection if exists
  disconnect() {
    try {
      this.udpPort?.close()
    }  catch (error) {
      console.trace(error)
    }
  }

  // Send message to server
  request({ address, args }: OptionalMessage<Argument> | Message<Argument>) {
    this.udpPort?.send({
      address,
      args: args || [],
    })
  }
}
