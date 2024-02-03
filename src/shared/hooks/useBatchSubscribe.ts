import { Arg, IntervalReference, OnMessageFunc } from "~/OSC/core/X32.types"
import { useAsyncState } from "./useAsyncState"
import { ARG_Fixed, FixedArray } from "@/types/args"
import { FrequencyFactor } from "@/types/frequencyFactor"
import { uint8ArrayToFloat32Array } from "../helpers/cast"
import { useGetState } from "use-async-setstate"
import { MessageArgBytes } from "osc"
import { Mixer } from "@/electron/OSC/MixerEventListeners"

export const useBatchSubscribe = (
  mixer: Mixer,
  params: {
    meterCommand:
      | "/meters/1"
      | "/meters/2"
      | "/meters/3"
      | "/meters/4"
      | "/meters/5"
      | "/meters/6"
      | "/meters/7"
      | "/meters/8"
      | "/meters/9"
      | "/meters/10"
      | "/meters/11"
      | "/meters/12"
      | "/meters/13"
      | "/meters/14"
      | "/meters/15"
      | "/meters/16"
    args?:
      | [
          Arg, // /meters/6 channel number
        ]
      | [Arg, Arg]
    frequency: FrequencyFactor
  }
) => {
  // Params
  const { frequency, meterCommand, args } = params

  // Local State
  const [meterData, setMeterData] = useAsyncState<ARG_Fixed<4>>([0, 0, 0, 0])
  const getMeterData = useGetState(meterData)
  const [intervalReference, setIntervalReference] = useAsyncState<
    IntervalReference | undefined
  >(undefined)

  // Static functions
  const onMessage: OnMessageFunc<FixedArray<MessageArgBytes, 1>> = async (
    message
  ) => {
    if (!message || message?.args?.length !== 1) {
      return
    }
    const { args } = message
    if (args[0] && args[0]?.value) {
      const newValues = uint8ArrayToFloat32Array<4>(args[0].value)
      setMeterData(newValues)
    }
  }

  const start = async () => {
    mixer.unsubscribe(intervalReference)
    setIntervalReference(
      await mixer.batchSubscribe({
        args: [
          {
            type: "s",
            value: meterCommand,
          },
          ...(args || []),
        ],
        onMessage: onMessage,
        frequency,
      })
    )
  }

  const stop = () => {
    mixer.unsubscribe(intervalReference)
  }

  return {
    start,
    stop,
    getMeterData,
    meterData,
  }
}
