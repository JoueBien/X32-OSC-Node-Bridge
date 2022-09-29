import type { OSCTransport } from "../../types/osc-transports"
import type { OSC, Argument, ArgumentType } from "../../types/osc"
export type { OSCTransport, Port } from "../../types/osc-transports"
export type {
  Argument,
  Message,
  ArgumentType,
  OptionalMessage,
} from "../../types/osc"


type OscType = OSCTransport & OSC

export type GenericArg = {
  type: ArgumentType
  value: Argument
}

const osc = {
  // @ts-ignore
  ...window.osc
} as OscType

// Fix the typing
function UDPPortFunc() {
  return new osc.UDPPort({})
}

export type UDPPortInstance = ReturnType<typeof UDPPortFunc>

export default osc
export const UDPPort = osc.UDPPort
