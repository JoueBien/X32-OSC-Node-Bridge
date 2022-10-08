// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useAsyncSetState } from "use-async-setstate";
import { useDebouncedCallback } from "use-debounce"
// Comps
import X32, { IntervalReference } from "../helpers/mixer/X32"
import X32Sub from "../helpers/mixer/X32Sub"
import { argUint8ArrayToFloat32Array, argUint8ArrayToInt32Array } from "../helpers/mixer/cast"
import { ARG_16, ARG_32, ARG_8, ARRAY_16, ARRAY_32 } from "../types/args"
import { FX_UNIT_NUMBER } from "../types/fxTypes";

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
  fxTypeArgs: ARG_8,
  stopFxs: () => Promise<void>
  startFxs: () => Promise<void>
  setFxType: (unit: FX_UNIT_NUMBER, fxType: number) => void
}

const UI_TICK_RATE = 1000/60


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
  fxTypeArgs: [0,0,0,0,0,0,0,0],
  stopFxs: async () => {},
  startFxs: async () => {},
  setFxType: () => {},
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

  // Fx TYpes
  const [fxTypeArgs, _setFxTypeArgs] = useState<ARG_8>([0,0,0,0,0,0,0,0])
  const setFxTypeArgs = useDebouncedCallback(_setFxTypeArgs, UI_TICK_RATE)
  const [subToFxArgs1, setSubToFxArgs1] = useAsyncSetState<IntervalReference>({} as IntervalReference)

  // Requests
  const setFxType = (unit: FX_UNIT_NUMBER, fxType: number) => connection1.setFxType(unit, fxType)

  // Functions
  const stopFxs = async () => {
    connection1.unsubscribe(subToFxArgs1); setSubToFxArgs1({})
    connection1.unsubscribe(subToMeter4); setSubToMeter4({})
  }

  const startFxs = async () => {
    const subs = await connection1.startListenFx([
      (message, timeTag, info) => {
        if (message.address === "/customfxtypes") {
          const arrayValues = argUint8ArrayToInt32Array(message.args[0].value as Uint8Array) as ARG_8
          setFxTypeArgs(arrayValues)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/custommeters9") {
          const arrayValues4 = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_32
          setAfxArgs(arrayValues4)
        }
      },
    ])
    setSubToFxArgs1(subs[0])
    setSubToMeter4(subs[1])
  }


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
  }

  const disconnect = async () => {
    await setConnected(false)
    await stopMeters()
    await stopFxs()
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
        fxTypeArgs,
        startFxs,
        stopFxs,
        setFxType,
      }}
    >
      {children}
    </X32Context.Provider>
  );
};