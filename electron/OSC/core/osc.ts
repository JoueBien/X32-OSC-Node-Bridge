
// Comps
import type { OSCTransport } from "../../../src/types/osc-transports"
import type { OSC, Argument, ArgumentType } from "../../../src/types/osc"
export type { OSCTransport, Port } from "../../../src/types/osc-transports"
export type {
  Argument,
  Message,
  ArgumentType,
  OptionalMessage,
} from "../../../src/types/osc"


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
