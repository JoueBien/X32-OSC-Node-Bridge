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
const APP: AppType = (process.env.APP || "GetStarted") as AppType

// Style
const ScreenContainer = styled.div`
  ${screenContainerStyles}
`

function App() {
  // ..
  return (
    <>
      {APP === "GetStarted" && (
        <ScreenContainer className="ScreenContainer">
          <GetStarted />
        </ScreenContainer>
      )}
      {APP === "MeterBridge" && (
        <ScreenContainer className="ScreenContainer">
          <MeterBridge />
        </ScreenContainer>
      )}
      {APP === "MuteSync" && (
        <ScreenContainer className="ScreenContainer">
          <MuteSync />
        </ScreenContainer>
      )}
      {APP === "Workbench" && (
        <ScreenContainer className="ScreenContainer fill-screen">
          <Workbench />
        </ScreenContainer>
      )}
    </>
  )
}

export default App
