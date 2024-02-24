import { Nav } from "rsuite"
import { ConnectFormContextProvider } from "@/shared/contexts/ConnectFormContext"
import { MixerContextProvider } from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"

// import { SetUpScreen } from "./screens/SetUpScreen"
import { MeterScreen } from "@/applications/MeterBridge/screens/MeterScreen"
import { MeterContextProvider } from "./contexts/MeterContext"
import { SetUpScreen } from "./screens/SetUpScreen"
import { MeterSettingsFlyOutModal } from "./screens/MeterSettingsFlyOutModal"

export const MeterBridge = () => {
  // Local State
  // TODO: Replace settings with a cog in the corner & remove the tab system.
  const [activeKey, setActiveKey] = useAsyncSetState<string>("setup")

  const toggleActiveKey = () => {
    console.log("activeKey", activeKey === "setup" ? "closed" : "setup")
    setActiveKey(activeKey === "setup" ? "closed" : "setup")
  }

  const closeSetUp = () => {
    setActiveKey("closed")
  }

  // ..
  return (
    <>
      {/* Page Navigation */}
      <Nav
        appearance="subtle"
        className="topNav"
        activeKey={activeKey}
        onSelect={toggleActiveKey}
      >
        <Nav.Item eventKey="setup">Setup</Nav.Item>
      </Nav>
      {/* Components that talk to the mixer */}
      <MixerContextProvider>
        <ConnectFormContextProvider>
          {<SetUpScreen isOpen={activeKey === "setup"} onClose={closeSetUp} />}
        </ConnectFormContextProvider>

        <MeterContextProvider>
          {/* A cheap way to make sure setup and meter settings can't open at the same time. */}
          <>
            {activeKey !== "setup" && (
              <>
                <MeterSettingsFlyOutModal />
              </>
            )}
            <MeterScreen />
          </>
        </MeterContextProvider>
      </MixerContextProvider>
    </>
  )
}
