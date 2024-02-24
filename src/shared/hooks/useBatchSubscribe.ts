import { Arg, IntervalReference, OnMessageFunc } from "~/OSC/core/X32.types"
import { useAsyncState } from "./useAsyncState"
import { ARG_Fixed, FixedArray } from "@/types/args"
import { FrequencyFactor } from "@/types/frequencyFactor"
import { argUint8ArrayToFloat32Array } from "../helpers/cast"
import { useGetState } from "use-async-setstate"
import { MessageArgBytes, MessageArgInt } from "osc"
import { Mixer } from "@/electron/OSC/MixerEventListeners"
import { filledArray } from "../helpers/filledArray"

export type UseBatchSubscribeBase<
  MeterDataSize extends number,
  Args extends Arg[],
> = (params: {
  mixer: Mixer
  args?: Args // [Arg] | [Arg, Arg]
  frequency: FrequencyFactor
}) => UseBatchSubscribeReturnBase<MeterDataSize>

export type UseBatchSubscribeReturnBase<MeterDataSize extends number> = {
  start: () => Promise<void>
  stop: () => void
  getMeterData: () => ARG_Fixed<MeterDataSize>
  meterData: ARG_Fixed<MeterDataSize>
}

export const useBatchSubscribeMeter6: UseBatchSubscribeBase<
  4,
  [MessageArgInt]
> = (params) =>
  useBatchSubscribe<"/meters/6", 4, [MessageArgInt]>({
    ...params,
    meterCommand: "/meters/6",
    defaultMeterData: [1, 1, 1, 1],
  })

export const useBatchSubscribeMeter1: UseBatchSubscribeBase<96, undefined> = (
  params
) =>
  useBatchSubscribe<"/meters/1", 96, undefined>({
    ...params,
    meterCommand: "/meters/1",
    defaultMeterData: filledArray<96, 1>(96, 1),
  })

export const useBatchSubscribeMeter2: UseBatchSubscribeBase<49, undefined> = (
  params
) =>
  useBatchSubscribe<"/meters/2", 49, undefined>({
    ...params,
    meterCommand: "/meters/2",
    defaultMeterData: filledArray<49, 1>(49, 1),
  })

/** The base for meter commands 0-14.
 *  Do not export create an exported wrapper above.
 */
const useBatchSubscribe: <
  MeterCommand extends string,
  MeterDataSize extends number,
  Args extends Arg[],
>(params: {
  meterCommand: MeterCommand
  mixer: Mixer
  /** Args can be [Arg] or [Arg, Arg] */
  args?: Args
  frequency: FrequencyFactor
  defaultMeterData: ARG_Fixed<MeterDataSize>
}) => ReturnType<UseBatchSubscribeBase<MeterDataSize, Args>> = (params) => {
  // Params
  const { mixer, frequency, meterCommand, args, defaultMeterData } = params

  // Local State
  const [meterData, setMeterData] = useAsyncState(defaultMeterData)
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
      const newValues = argUint8ArrayToFloat32Array<typeof meterData.length>(
        args[0].value
      )
      setMeterData(newValues)
    }
  }

  const start = async () => {
    mixer.unsubscribe(intervalReference)
    setIntervalReference(
      await mixer.subscribe({
        address: "/meters",
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
