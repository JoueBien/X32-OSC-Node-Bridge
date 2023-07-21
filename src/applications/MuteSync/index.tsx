import { Nav } from "rsuite"
import {
  ConnectFormContextProvider,
} from "@/shared/contexts/ConnectFormContext"
import {
  MixerContextProvider,
} from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"
import { MuteMapperContextProvider } from "./contexts/MuteMapperContext"
import { MuteMapperScreen } from "./screens/MuteMapperScreen"
import { SetUpScreen } from "./screens/SetUpScreen"
import {
  MuteShareContextProvider,
} from "./contexts/MuteShareContext"

export const MuteSync = () => {
  // Local State
  const [activeKey, setActiveKey] = useAsyncSetState<string>("setup")

  // ..
  return (
    <>
      {/* Page Navigation */}
      <Nav
        appearance="subtle"
        className="topNav"
        activeKey={activeKey}
        onSelect={setActiveKey}
      >
        <Nav.Item eventKey="setup">Setup</Nav.Item>
        <Nav.Item eventKey="mapping">Mute Mapping</Nav.Item>
        {/* <Nav.Item eventKey="mutes">Mutes</Nav.Item> */}
      </Nav>
      {/* Components that talk to the mixer */}
      <MixerContextProvider>
        <ConnectFormContextProvider>
          <MuteMapperContextProvider>
            <MuteShareContextProvider>
              {activeKey === "setup" && (
                <>
                  <SetUpScreen />
                </>
              )}
              {activeKey === "mapping" && (
                <>
                  <MuteMapperScreen />
                </>
              )}
            </MuteShareContextProvider>
          </MuteMapperContextProvider>
        </ConnectFormContextProvider>
      </MixerContextProvider>
    </>
  )
}
