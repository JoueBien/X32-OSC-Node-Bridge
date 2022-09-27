// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useAsyncSetState } from "use-async-setstate";
import { useDebouncedCallback } from "use-debounce"
// Comps
import X32, { IntervalReference } from "../helpers/mixer/X32"
import { argUint8ArrayToArray } from "../helpers/mixer/cast"
import { ARG_16, ARG_32, ARG_8, ARRAY_16, ARRAY_32, ARRAY_8 } from "../types/args"

// Defs
type X32ContextProps = {}
type X32ContextState = {
  // mixer?: X32
  connected: boolean
  connect: (params: any) => Promise<void>
  disconnect: () => void
  chanelMeterArgs: ARG_32
  bussMeterArgs: ARG_32,
}

export const X32Context = createContext<X32ContextState>({
  // mixer: undefined,
  connected: false,
  connect: async () => {},
  disconnect: () => {},
  chanelMeterArgs: [...ARRAY_32],
  bussMeterArgs: [...ARRAY_32],
})

export const X32ContextProvider: FC<PropsWithChildren & X32ContextProps> = (defaultState) => {
  // Props
  const { children } = defaultState

  // State
  const [connection1, setConnection1] = useState<X32>(new X32())
  const [connected, setConnected] = useAsyncSetState<boolean>(false)
  // Post gain meters for channels 1-32
  const [chanelMeterArgs, _setChanelMeterArgs] = useState<ARG_32>([...ARRAY_32])
  const [bussMeterArgs, _setBussMeterArgs] = useState<ARG_32>([...ARRAY_32])

  const setChanelMeterArgs = useDebouncedCallback(_setChanelMeterArgs, 1000/60)
  const setBussMeterArgs = useDebouncedCallback(_setBussMeterArgs, 1000/60)

  const [subToMeter1, setSubToMeter1] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToMeter2, setSubToMeter2] = useAsyncSetState<IntervalReference>({} as IntervalReference)

  // Functions
  const disconnect = async () => {
    await setConnected(false)
    connection1.unsubscribe(subToMeter1)
    setSubToMeter1({})
    connection1.unsubscribe(subToMeter2)
    setSubToMeter2({})
    connection1.disconnect()
  }

  const connect = async (params: any) => {
    await disconnect()
    const res = await connection1.connect(params)
    await setConnected(res)
    // Subscribe to the channels
    setSubToMeter1(
      await connection1?.subscribe({
        address: "/meters/1",
        args:[
          {"type": "s", "value": "/meters/1"},
          {"type": "i", "value": 50}
        ],
        onMessage: (message, timeTag, info) => {
          if (message.address === "/meters/1") {
            const unit8ArrayValues = message.args[0].value as Uint8Array
            const arrayValues = argUint8ArrayToArray(unit8ArrayValues) as ARG_32
            setChanelMeterArgs(arrayValues)
          }
        },
      })
    )

    // Syb to the bus 1-16 and matrix and master L/R/C
    setSubToMeter2(
      await connection1?.subscribe({
        address: "/meters/2",
        args:[
          {"type": "s", "value": "/meters/2"},
          {"type": "i", "value": 50}
        ],
        onMessage: (message, timeTag, info) => {
          
          if (message.address === "/meters/2") {
            const unit8ArrayValues2 = message.args[0].value as Uint8Array
            const arrayValues2 = argUint8ArrayToArray(unit8ArrayValues2) as ARG_32
            setBussMeterArgs(arrayValues2)
          }
        },
      })
    )
  }
  
  // When refresh or app close we should clean up
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])
  
  // ..
  return (
    <X32Context.Provider
      value={{
        // State
        // mixer,
        connected,
        chanelMeterArgs,
        bussMeterArgs,
        // masterMeterArgs,
        // masterCenterMeterArg,
        // Mutations
        connect,
        disconnect
      }}
    >
      {children}
    </X32Context.Provider>
  );
};