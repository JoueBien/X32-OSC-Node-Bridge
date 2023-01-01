
// Comps
import type { OSCTransport } from "../../../types/osc-transports"
import type { OSC, Argument, ArgumentType } from "../../../types/osc"
export type { OSCTransport, Port } from "../../../types/osc-transports"
export type {
  Argument,
  Message,
  ArgumentType,
  OptionalMessage,
} from "../../../types/osc"


type OscType = OSCTransport & OSC

export type GenericArg = {
  type: ArgumentType
  value: Argument
}

// Fix the legacy import & add types
const osc = {
  ...require('osc'),
  // @ts-ignore
} as OscType

// Fix the the return typing
function UDPPortFunc() {
  return new osc.UDPPort({})
}

export type UDPPortInstance = ReturnType<typeof UDPPortFunc>

export default osc as OscType
export const UDPPort = osc.UDPPort
