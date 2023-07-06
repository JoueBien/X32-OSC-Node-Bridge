// Libs
import validator from "validator"
import { FC, PropsWithChildren, createContext, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import { WindowMixerSharedKey } from "../../../electron/OSC/MixerEventListeners"
import { useAsyncSetState, useGetState } from "use-async-setstate"
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
  settings: Record<WindowMixerSharedKey, Settings | undefined>
  canSubmit: {
    Mixer: boolean
    MixerA: boolean
    MixerB: boolean
  }
  storedIps: { storedIps: string[] }
  errors: Record<WindowMixerSharedKey, Errors | undefined>
  setIp: (value: string, mixerKey: WindowMixerSharedKey) => void
  addIp: (value: string) => void
  removeIp: (value: string) => void
}

export const ConnectFormContext = createContext<ConnectFormContextState>({
  settings: {
    Mixer: undefined,
    MixerA: undefined,
    MixerB: undefined,
  },
  canSubmit: {
    Mixer: false,
    MixerA: false,
    MixerB: false,
  },
  errors: {
    Mixer: undefined,
    MixerA: undefined,
    MixerB: undefined,
  },
  storedIps: { storedIps: [] },
  setIp: (value: string, mixerKey: WindowMixerSharedKey) => {},
  addIp: (value: string) => {},
  removeIp: (value: string) => {},
})

export const ConnectFormContextProvider: FC<
  PropsWithChildren & ConnectFormContextProps
> = (defaultState) => {
  // Props
  const { children, defaultIp } = defaultState

  // Local State
  const [settings, setSettings] = useLocalStorage<
    Record<WindowMixerSharedKey, Settings | undefined>
  >("connect-settings", {
    Mixer: undefined,
    MixerA: undefined,
    MixerB: undefined,
  })
  const [storedIps, setStoredIps] = useLocalStorage<{ storedIps: string[] }>(
    "connect-stored-ip",
    { storedIps: [defaultIp || "192.168.0.30"] }
  )
  const [errors, setErrors] = useAsyncSetState<
    Record<WindowMixerSharedKey, Errors | undefined>
  >({ Mixer: undefined, MixerA: undefined, MixerB: undefined })
  const getErrors = useGetState(errors)

  // calc
  const canSubmit = {
    Mixer: Object.keys(errors?.Mixer || {}).length === 0 ? true : false,
    MixerA: Object.keys(errors?.MixerA || {}).length === 0 ? true : false,
    MixerB: Object.keys(errors?.MixerB || {}).length === 0 ? true : false,
  }

  // Funcs
  const setIp = (value: string, mixerKey: WindowMixerSharedKey) => {
    setSettings({
      ...settings,
      [mixerKey]: {
        ip: value,
      },
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
    ;(async () => {
      Object.keys(settings).forEach(async (key) => {
        const ip = settings[key as WindowMixerSharedKey]?.ip
        if (ip) {
          if (validator.isIP(ip) === false) {
            await setErrors({
              ...getErrors(),
              [key]: { ip: "Invalid IP Address" },
            })
          } else if (ip.includes(":") === true) {
            await setErrors({
              ...getErrors(),
              [key]: { ip: "IP Address must be IPV4 not 6" },
            })
          } else {
            await setErrors({ ...getErrors(), [key]: {} })
          }
        } else {
          await setErrors({ ...getErrors(), [key]: {} })
        }
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.Mixer?.ip, settings?.MixerA, settings?.MixerB])

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
