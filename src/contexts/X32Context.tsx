// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
// Comps
import X32 from "../helpers/mixer/X32"
import { ARG_16, ARG_32, ARG_8, ARRAY_16, ARRAY_32 } from "../types/args"

// Defs
type X32ContextProps = {}
type X32ContextState = {
  mixer?: X32
  connect: (params: any) => void
  disconnect: () => void
  chanelMeterArgs: ARG_32
  bussMeterArgs: ARG_16
}

export const X32Context = createContext<X32ContextState>({
  mixer: undefined,
  connect: () => {},
  disconnect: () => {},
  chanelMeterArgs: [...ARRAY_32],
  bussMeterArgs: [...ARRAY_16]
})

export const X32ContextProvider: FC<PropsWithChildren & X32ContextProps> = (defaultState) => {
  // Props
  const { children } = defaultState

  // State
  const [mixer, setMixer] = useState<X32>(new X32())
  // Post gain meters for channels 1-32
  const [chanelMeterArgs, setChanelMeterArgs] = useState<ARG_32>([...ARRAY_32])
  const [bussMeterArgs, setBussMeterArgs] = useState<ARG_16>([...ARRAY_16])

  // Functions
  const connect = (params: any) => {
    mixer.connect(params)
  }

  const disconnect = () => {
    mixer.disconnect()
  }
  
  // When refresh or app close we should clean up
  useEffect(() => {
    return () => {
      disconnect()
    }
  })
  
  // ..
  return (
    <X32Context.Provider
      value={{
        // State
        mixer,
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