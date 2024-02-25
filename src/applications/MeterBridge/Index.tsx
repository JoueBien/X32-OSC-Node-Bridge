import { Nav } from "rsuite"
import { ConnectFormContextProvider } from "@/shared/contexts/ConnectFormContext"
import { MixerContextProvider } from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"

// import { SetUpScreen } from "./screens/SetUpScreen"
import { MeterScreen } from "@/applications/MeterBridge/screens/MeterScreen"
import { MeterContextProvider } from "./contexts/MeterContext"
import { SetUpScreen } from "./screens/SetUpScreen"
import { MeterSettingsFlyOutModal } from "./screens/MeterSettingsFlyOutModal"
import { LayoutSettingsFlyOutModal } from "./screens/LayoutSettingsFlyOutModal"

export const MeterBridge = () => {
  // Local State
  const [activeKey, setActiveKey] = useAsyncSetState<string>("setup")

  // Functions
  const toggleActiveKey = (newKey: string) => {
    if (newKey === activeKey) {
      setActiveKey("closed")
    } else {
      setActiveKey(newKey)
    }
  }

  const closeAll = () => {
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
        <Nav.Item eventKey="layout">Layout</Nav.Item>
      </Nav>
      {/* Components that talk to the mixer */}
      <MixerContextProvider>
        <ConnectFormContextProvider>
          {<SetUpScreen isOpen={activeKey === "setup"} onClose={closeAll} />}
        </ConnectFormContextProvider>

        <MeterContextProvider>
          <LayoutSettingsFlyOutModal
            isOpen={activeKey === "layout"}
            onClose={closeAll}
          />
          {/* A cheap way to make sure setup and meter settings can't open at the same time. */}
          <>
            {activeKey === "closed" && (
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
