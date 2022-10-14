// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useAsyncSetState } from "use-async-setstate";
import { useDebouncedCallback } from "use-debounce"
// Comps
import X32, { IntervalReference } from "../helpers/mixer/X32"
import X32Sub from "../helpers/mixer/X32Sub"
import { argUint8ArrayToFloat32Array, argUint8ArrayToInt32Array } from "../helpers/mixer/cast"
import { ARG_16, ARG_32, ARG_64, ARG_8, ARRAY_16, ARRAY_32, ARRAY_64 } from "../types/args"
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
  fxArgs1: ARG_64
  fxArgs2: ARG_64
  fxArgs3: ARG_64
  fxArgs4: ARG_64
  fxArgs5: ARG_64
  fxArgs6: ARG_64
  fxArgs7: ARG_64
  fxArgs8: ARG_64
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
  fxArgs1: ARRAY_64,
  fxArgs2: ARRAY_64,
  fxArgs3: ARRAY_64,
  fxArgs4: ARRAY_64,
  fxArgs5: ARRAY_64,
  fxArgs6: ARRAY_64,
  fxArgs7: ARRAY_64,
  fxArgs8: ARRAY_64,
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
  const [subToFxTypeArgs, setSubToFxTypeArgs] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  
  const [subToFxArgs1, setSubToFxArgs1] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs2, setSubToFxArgs2] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs3, setSubToFxArgs3] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs4, setSubToFxArgs4] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs5, setSubToFxArgs5] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs6, setSubToFxArgs6] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs7, setSubToFxArgs7] = useAsyncSetState<IntervalReference>({} as IntervalReference)
  const [subToFxArgs8, setSubToFxArgs8] = useAsyncSetState<IntervalReference>({} as IntervalReference)

  const [fxArgs1, setFxArgs1] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs2, setFxArgs2] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs3, setFxArgs3] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs4, setFxArgs4] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs5, setFxArgs5] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs6, setFxArgs6] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs7, setFxArgs7] = useAsyncSetState<ARG_64>(ARRAY_64)
  const [fxArgs8, setFxArgs8] = useAsyncSetState<ARG_64>(ARRAY_64)


  // Requests
  const setFxType = (unit: FX_UNIT_NUMBER, fxType: number) => connection1.setFxType(unit, fxType)

  // Functions
  const stopFxs = async () => {
    connection1.unsubscribe(subToFxTypeArgs); setSubToFxTypeArgs({})
    connection1.unsubscribe(subToMeter4); setSubToMeter4({})
    connection1.unsubscribe(subToFxArgs1); setSubToFxArgs1({})
    connection1.unsubscribe(subToFxArgs2); setSubToFxArgs2({})
    connection1.unsubscribe(subToFxArgs3); setSubToFxArgs3({})
    connection1.unsubscribe(subToFxArgs4); setSubToFxArgs4({})
    connection1.unsubscribe(subToFxArgs5); setSubToFxArgs5({})
    connection1.unsubscribe(subToFxArgs6); setSubToFxArgs6({})
    connection1.unsubscribe(subToFxArgs7); setSubToFxArgs7({})
    connection1.unsubscribe(subToFxArgs8); setSubToFxArgs8({})
  }

  const startFxs = async () => {
    const [
      sub1, sub2, 
      subA1, subA2, 
      subA3, subA4, 
      subA5, subA6, 
      subA7, subA8, 
    ] = await connection1.startListenFx([
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
      (message, timeTag, info) => {
        if (message.address === "/customfxargs1") {
          // Do Stuff here
          const arrayValues = argUint8ArrayToFloat32Array(message.args[0].value as Uint8Array) as ARG_64
          setFxArgs1(arrayValues)
          // console.log("/customfxargs1", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs2") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs3") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs4") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs5") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs6") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs7") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
      (message, timeTag, info) => {
        if (message.address === "/customfxargs8") {
          // Do Stuff here
          // console.log("message", message)
        }
      },
    ])
    setSubToFxTypeArgs(sub1)
    setSubToMeter4(sub2)
    setSubToFxArgs1(subA1)
    setSubToFxArgs2(subA2)
    setSubToFxArgs3(subA3)
    setSubToFxArgs4(subA4)
    setSubToFxArgs5(subA5)
    setSubToFxArgs6(subA6)
    setSubToFxArgs7(subA7)
    setSubToFxArgs8(subA8)
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
        fxArgs1,
        fxArgs2,
        fxArgs3,
        fxArgs4,
        fxArgs5,
        fxArgs6,
        fxArgs7,
        fxArgs8,
      }}
    >
      {children}
    </X32Context.Provider>
  );
};