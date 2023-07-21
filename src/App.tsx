// Libs
import styled from "styled-components"
// All of our base styles
import "rsuite/dist/rsuite.min.css"
import "@/shared/styles/index.css"
import "@/shared/styles/App.css"
// Comps
import { MuteSync } from "@/applications/MuteSync"
import { MeterBridge } from "@/applications/MeterBridge"
import { screenContainerStyles } from "@/shared/styles/screenContainerStyles"
// Config
type AppType = "Workbench" | "MeterBridge" | "MuteSync"
const app: AppType = "MuteSync"

// Style
const ScreenContainer = styled.div`
  ${screenContainerStyles}
`

function App() {
  // ..
  return (
    <ScreenContainer className="ScreenContainer">
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
    </ScreenContainer>
  )
}

export default App
