// Libs
import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts"
// Comps


// Defs

type Settings = {
  ip: string,
}

type ConnectFormContextProps = {
  defaultIp?: string
}
type ConnectFormContextState = {
  settings: Settings,
  setIp: (value: string) => void
}


export const ConnectFormContext = createContext<ConnectFormContextState>({
  settings: {} as Settings,
  setIp: (value: string) => {}
})

export const ConnectFormProvider: FC<PropsWithChildren & ConnectFormContextProps> = (defaultState) => {
  // Props
  const { children, defaultIp } = defaultState
  
  // Local State
  const [settings, setSettings] = useLocalStorage<Settings>(
    "connect-settings", 
    {
    ip: defaultIp || "192.168.0.30"
    }
  )

  // Funcs
  const setIp = (value: string) => {
    setSettings({
      ...settings,
      ip: value,
    })
  }

  // ..
  return (
    <ConnectFormContext.Provider
      value={{
        // State
        settings,
        // Mutations 
        setIp
      }}
    >
      {children}
    </ConnectFormContext.Provider>
  );
};