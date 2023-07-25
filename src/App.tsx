// Libs
import styled from "styled-components"
// All of our base styles
import "rsuite/dist/rsuite.min.css"
import "@/shared/styles/index.css"
import "@/shared/styles/App.css"
// Comps
import { MuteSync } from "@/applications/MuteSync"
import { MeterBridge } from "@/applications/MeterBridge/Index"
import { screenContainerStyles } from "@/shared/styles/screenContainerStyles"
import { GetStarted } from "./applications/GetStarted/Index"
import { Workbench } from "./applications/Workbench/Index"
// Config
type AppType = "Workbench" | "MeterBridge" | "MuteSync" | "GetStarted"
const app: AppType = "GetStarted"

// Style
const ScreenContainer = styled.div`
  ${screenContainerStyles}
`

function App() {
  // ..
  return (
    <ScreenContainer className="ScreenContainer">
      {app === "GetStarted" && (
        <>
          <GetStarted />
        </>
      )}
      {app === "MeterBridge" && (
        <>
          <MeterBridge />
        </>
      )}
      {app === "MuteSync" && (
        <>
          <MuteSync />
        </>
      )}
      {app === "Workbench" && (
        <>
          <Workbench />
        </>
      )}
    </ScreenContainer>
  )
}

export default App
