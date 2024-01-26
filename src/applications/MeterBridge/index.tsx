import { Nav } from "rsuite"
import { ConnectFormContextProvider } from "@/shared/contexts/ConnectFormContext"
import { MixerContextProvider } from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"

// import { SetUpScreen } from "./screens/SetUpScreen"
import { MeterScreen } from "@/applications/MeterBridge/screens/MeterScreen"

export const MeterBridge = () => {
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
        <Nav.Item eventKey="controls">Controls</Nav.Item>
      </Nav>
      {/* Components that talk to the mixer */}
      <MixerContextProvider>
        <ConnectFormContextProvider>
          {/* {activeKey === "setup" && (
            <>
              <SetUpScreen />
            </>
          )}
          {activeKey === "controls" && ( */}
          <MeterScreen />
          {/* )} */}
        </ConnectFormContextProvider>
      </MixerContextProvider>
    </>
  )
}
