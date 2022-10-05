// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useAsyncSetState } from "use-async-setstate";
import { useDebouncedCallback } from "use-debounce"
// Comps
import X32, { IntervalReference } from "../helpers/mixer/X32"
import X32Sub from "../helpers/mixer/X32Sub"
import { argUint8ArrayToFloat32Array } from "../helpers/mixer/cast"
import { ARG_16, ARG_32, ARRAY_16, ARRAY_32 } from "../types/args"

// Defs
type X32ContextProps = {}
type X32ContextState = {
  // mixer?: X32
  connected: boolean
  connect: (params: any) => Promise<void>
  disconnect: () => void
  chanelMeterArgs: ARG_32
  bussMeterArgs: ARG_32,
  auxArgs: ARG_16,
  fxArgs: ARG_32,
  stopMeters: () => Promise<void>
  startMeters: () => Promise<void>
}

const METER_TICK_RATE = 2
const UI_TICK_RATE = 1000/60

const METER_TIMING_ARS = [
  {"type" :"i", "value": 0},
  {"type" :"i", "value": 0}, 
  {"type" :"i", "value": METER_TICK_RATE}
]

export const X32Context = createContext<X32ContextState>({
  // mixer: undefined,
  connected: false,
  connect: async () => {},
  disconnect: () => {},
  chanelMeterArgs: [...ARRAY_32],
  bussMeterArgs: [...ARRAY_32],
  auxArgs: [...ARRAY_16],
  fxArgs: [...ARRAY_32],
  stopMeters: async () => {},
  startMeters: async () => {},
})

export const X32ContextProvider: FC<PropsWithChildren & X32ContextProps> = (defaultState) => {
  // Props
  const { children } = defaultState

  // State
  const [connection1, _setConnection1] = useState<X32Sub>(new X32Sub())
  const [connected, setConnected] = useAsyncSetState<boolean>(false)
  // Post gain meters for channels 1-32
  const [chanelMeterArgs, _setChanelMeterArgs] = useState<ARG_32>([...ARRAY_32])
  const [bussMeterArgs, _setBussMeterArgs] = useState<ARG_32>([...ARRAY_32])
  const [auxArgs, _setAuxArgs] = useState<ARG_16>([...ARRAY_16])
  const [fxArgs, _setAfxArgs] = useState<ARG_32>([...ARRAY_32])

  const setChanelMeterArgs = useDebouncedCallback(_setChanelMeterArgs, UI_TICK_RATE)
  const setBussMeterArgs = useDebouncedCallback(_setBussMeterArgs, UI_TICK_RATE)
  const setAuxArgs = useDebouncedCallback(_setAuxArgs, UI_TICK_RATE)
  const setAfxArgs = useDebouncedCallback(_setAfxArgs, UI_TICK_RATE)

  const [subToMeter1, setSubToMeter1] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToMeter2, setSubToMeter2] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToMeter3, setSubToMeter3] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToMeter4, setSubToMeter4] = useAsyncSetState<IntervalReference>({} as IntervalReference)

  // Functions
  const stopMeters = async () => {
    connection1.unsubscribe(subToMeter1); setSubToMeter1({})
    connection1.unsubscribe(subToMeter2); setSubToMeter2({})
    connection1.unsubscribe(subToMeter3); setSubToMeter3({})
    connection1.unsubscribe(subToMeter4); setSubToMeter4({})
  }

  const startMeters = async () => {
    const subs = await connection1.startListenMeters([
      (message, timeTag, info) => {
        if (message.address === "/custommeters1") {
          const arrayValues = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
          setChanelMeterArgs(arrayValues)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/custommeters2") {
          const arrayValues2 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
          setBussMeterArgs(arrayValues2)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/custommeters3") {
          const arrayValues3 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_16
          setAuxArgs(arrayValues3)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/custommeters9") {
          const arrayValues4 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
          setAfxArgs(arrayValues4)
        }
      },
    ])

    setSubToMeter1(subs[0])
    setSubToMeter2(subs[1])
    setSubToMeter3(subs[2])
    setSubToMeter4(subs[3])
    // // Subscribe to the channels
    // setSubToMeter1(
    //   await connection1?.batchSubscribe({
    //     address: "/custommeters1",
    //     args: [
    //       {"type":"s","value":"/custommeters1"},
    //       {"type": "s", "value": "/meters/1"},
    //       ...METER_TIMING_ARS,
    //     ],
    //     onMessage: (message, timeTag, info) => {
    //       if (message.address === "/custommeters1") {
    //         const arrayValues = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
    //         setChanelMeterArgs(arrayValues)
    //       }
    //     },
    //   })
    // )

    // // Syb to the bus 1-16 and matrix and master L/R/C
    // setSubToMeter2(
    //   await connection1?.batchSubscribe({
    //     address: "/custommeters2",
    //     args: [
    //       {"type":"s","value":"/custommeters2"},
    //       {"type": "s", "value": "/meters/2"},
    //       ...METER_TIMING_ARS,
    //     ],
    //     onMessage: (message, timeTag, info) => {
    //       if (message.address === "/custommeters2") {
    //         const arrayValues2 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
    //         setBussMeterArgs(arrayValues2)
    //       }
    //     },
    //   })
    // )

    // // Syb to the AUX Send and Ret
    // setSubToMeter3(
    //   await connection1?.batchSubscribe({
    //     address: "/custommeters3",
    //     args: [
    //       {"type":"s","value":"/custommeters3"},
    //       {"type": "s", "value": "/meters/3"},
    //       ...METER_TIMING_ARS,
    //     ],
    //     onMessage: (message, timeTag, info) => {
    //       if (message.address === "/custommeters3") {
    //         const arrayValues3 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_16
    //         setAuxArgs(arrayValues3)
    //       }
    //     },
    //   })
    // )

    // // Syb to the AUX Send and Ret
    // setSubToMeter4(
    //   await connection1?.batchSubscribe({
    //     address: "/custommeters9",
    //     args: [
    //       {"type":"s","value":"/custommeters9"},
    //       {"type": "s", "value": "/meters/9"},
    //       ...METER_TIMING_ARS,
    //     ],
    //     onMessage: (message, timeTag, info) => {
    //       if (message.address === "/custommeters9") {
    //         const arrayValues4 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
    //         setAfxArgs(arrayValues4)
    //       }
    //     },
    //   })
    // )
  }

  const disconnect = async () => {
    await setConnected(false)
    await stopMeters()
    connection1.disconnect()
  }

  const connect = async (params: any) => {
    await disconnect()
    const res = await connection1.connect(params)
    await setConnected(res)
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
        connected,
        chanelMeterArgs,
        bussMeterArgs,
        auxArgs,
        fxArgs,
        connect,
        disconnect,
        startMeters,
        stopMeters,
      }}
    >
      {children}
    </X32Context.Provider>
  );
};