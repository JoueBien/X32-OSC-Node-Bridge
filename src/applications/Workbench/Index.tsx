import { Nav } from "rsuite"
import { ConnectFormContextProvider } from "@/shared/contexts/ConnectFormContext"
import { MixerContextProvider } from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"

import { Screen } from "./screens/Screen"

export const Workbench = () => {
  // ..
  return (
    <>
      {/* Components that talk to the mixer */}
      <MixerContextProvider>
        <ConnectFormContextProvider>
          <Screen />
        </ConnectFormContextProvider>
      </MixerContextProvider>
    </>
  )
}
