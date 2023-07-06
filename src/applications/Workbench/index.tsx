import { ConnectScreen } from "shared/components/ConnectScreen/ConnectScreen"
import { ConnectFormContext, ConnectFormContextProvider } from "shared/contexts/ConnectFormContext"
import { MixerContext, MixerContextProvider } from "shared/contexts/MixerContext"

export const Workbench = () => {
  return <>
    <MixerContextProvider>
      <ConnectFormContextProvider>
        <ConnectScreen mixerKey="Mixer"/>
        <ConnectScreen mixerKey="MixerA"/>
        <ConnectScreen mixerKey="MixerB"/>
      </ConnectFormContextProvider>
    </MixerContextProvider>
  </>
}