// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useAsyncSetState } from "use-async-setstate";
// Comps
import X32, { IntervalReference } from "../helpers/mixer/X32"
import { argUint8ArrayToArray } from "../helpers/mixer/cast"
import { ARG_16, ARG_32, ARG_8, ARRAY_16, ARRAY_32 } from "../types/args"

// Defs
type X32ContextProps = {}
type X32ContextState = {
  mixer?: X32
  connected: boolean
  connect: (params: any) => Promise<void>
  disconnect: () => void
  chanelMeterArgs: ARG_32
  bussMeterArgs: ARG_16
}

export const X32Context = createContext<X32ContextState>({
  mixer: undefined,
  connected: false,
  connect: async () => {},
  disconnect: () => {},
  chanelMeterArgs: [...ARRAY_32],
  bussMeterArgs: [...ARRAY_16]
})

export const X32ContextProvider: FC<PropsWithChildren & X32ContextProps> = (defaultState) => {
  // Props
  const { children } = defaultState

  // State
  const [mixer, setMixer] = useState<X32>(new X32())
  const [connected, setConnected] = useAsyncSetState<boolean>(false)
  // Post gain meters for channels 1-32
  const [chanelMeterArgs, setChanelMeterArgs] = useState<ARG_32>([...ARRAY_32])
  const [bussMeterArgs, setBussMeterArgs] = useState<ARG_16>([...ARRAY_16])

  const [subToMeter1, setSubToMeter1] = useAsyncSetState<IntervalReference>({} as IntervalReference)

  // Functions
  const disconnect = async () => {
    await setConnected(false)
    mixer.unsubscribe(subToMeter1)
    setSubToMeter1({})
    mixer.disconnect()
  }

  const connect = async (params: any) => {
    await disconnect()
    const res = await mixer.connect(params)
    await setConnected(res)
    setSubToMeter1(await mixer?.subscribe({
      address: "/meters",
      args:[
        {"type": "s", "value": "/meters/1"},
        {"type": "i", "value": 16}
      ],
      onMessage: (message, timeTag, info) => {
        const unit8ArrayValues = message.args[0].value as Uint8Array
        const arrayValues = argUint8ArrayToArray(unit8ArrayValues)
        const channels = arrayValues.slice(0, 32) as ARG_32
        setChanelMeterArgs(channels)

        console.log(message.address)

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
        mixer,
        connected,
        chanelMeterArgs,
        bussMeterArgs,
        // Mutations
        connect,
        disconnect
      }}
    >
      {children}
    </X32Context.Provider>
  );
};