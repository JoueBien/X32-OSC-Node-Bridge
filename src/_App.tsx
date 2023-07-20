// Libs
import styled from "styled-components"
// Comps
import "shared/styles/App.css"
import { MuteSync } from "applications/MuteSync"
import { MeterBridge } from "applications/MeterBridge"
import { screenContainerStyles } from "shared/styles/screenContainerStyles"
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
