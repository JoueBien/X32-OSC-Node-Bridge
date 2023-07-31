import { Nav } from "rsuite"
import { ConnectFormContextProvider } from "@/shared/contexts/ConnectFormContext"
import { MixerContextProvider } from "@/shared/contexts/MixerContext"
import { useAsyncSetState } from "use-async-setstate"

import { SetUpScreen } from "./screens/SetUpScreen"
import { Meter } from "@/shared/components/Meter/Meter"
import { MBM7CL_POINTS } from "@/shared/helpers/meterPoints"

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
          <div style={{ display: "flex" }}>
            <Meter
              arg={0.5}
              points={MBM7CL_POINTS}
              label=""
              ledSize={{
                width: "20px",
                height: "10px",
                textSize: "0px",
                markerPadding: "0px",
                ledSegmentSpacing: "2px",
                paddingRight: "0px",
              }}
            />
            <Meter
              arg={0.5}
              points={MBM7CL_POINTS}
              label=""
              ledSize={{
                width: "20px",
                height: "10px",
                textSize: "10px",
                markerPadding: "2px",
                ledSegmentSpacing: "2px",
              }}
            />
          </div>
          {/* )} */}
        </ConnectFormContextProvider>
      </MixerContextProvider>
    </>
  )
}
