// Libs
import validator from "validator"
import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from "react"
import { useLocalStorage } from "usehooks-ts"
// Comps

// Defs
type Settings = {
  ip: string
}

type Errors = {
  ip?: string
}

type ConnectFormContextProps = {
  defaultIp?: string
}
type ConnectFormContextState = {
  settings: Settings
  canSubmit: boolean
  storedIps: { storedIps: string[] }
  errors: Errors
  setIp: (value: string) => void
  addIp: (value: string) => void
  removeIp: (value: string) => void
}

export const ConnectFormContext = createContext<ConnectFormContextState>({
  settings: {} as Settings,
  canSubmit: false,
  errors: {} as Errors,
  storedIps: { storedIps: [] },
  setIp: (value: string) => {},
  addIp: (value: string) => {},
  removeIp: (value: string) => {},
})

export const ConnectFormContextProvider: FC<
  PropsWithChildren & ConnectFormContextProps
> = (defaultState) => {
  // Props
  const { children, defaultIp } = defaultState

  // Local State
  const [settings, setSettings] = useLocalStorage<Settings>(
    "connect-settings",
    {
      ip: defaultIp || "192.168.0.30",
    }
  )
  const [storedIps, setStoredIps] = useLocalStorage<{ storedIps: string[] }>(
    "connect-stored-ip",
    { storedIps: [defaultIp || "192.168.0.30"] }
  )
  const [errors, setErrors] = useState<Errors>({})

  // calc
  const canSubmit: boolean = Object.keys(errors).length === 0 ? true : false

  // Funcs
  const setIp = (value: string) => {
    setSettings({
      ...settings,
      ip: value,
    })
  }

  const addIp = (value: string) => {
    setStoredIps({
      ...storedIps,
      storedIps: [
        value,
        ...storedIps.storedIps.filter((ipStr) => ipStr !== value),
      ],
    })
  }

  const removeIp = (value: string) => {
    setStoredIps({
      ...storedIps,
      storedIps: [...storedIps.storedIps.filter((ipStr) => ipStr !== value)],
    })
  }

  // Effects
  useEffect(() => {
    if (validator.isIP(settings?.ip) === false) {
      setErrors({
        ...errors,
        ip: "Invalid IP Address",
      })
    } else if (settings?.ip?.includes(":") === true) {
      setErrors({
        ...errors,
        ip: "IP Address must be IPV4 not 6",
      })
    } else {
      const _errors = {
        ...errors,
      }
      delete _errors.ip
      setErrors({
        ..._errors,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings?.ip])

  // ..
  return (
    <ConnectFormContext.Provider
      value={{
        // State
        settings,
        canSubmit,
        errors,
        storedIps,
        // Mutations
        setIp,
        addIp,
        removeIp,
      }}
    >
      {children}
    </ConnectFormContext.Provider>
  )
}
