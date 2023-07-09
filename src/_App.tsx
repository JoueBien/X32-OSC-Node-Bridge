// Libs
import styled from "styled-components"
// Comps
import "shared/styles/App.css"
import { Workbench } from "applications/Workbench"
import { MeterBridge } from "applications/MeterBridge"
// Config
let app: string = "Workbench" // MeterBridge// Workbench

// Style
const ScreenContainer = styled.div`
  min-width: 1900px;
  width: 100%;

  .topNav {
    margin-bottom: 15px;
    .rs-nav-item {
      /* font-size: 20px; */
      font-size: 10px;
      padding: 5px;
    }

    .rs-nav-item:not(.rs-nav-item-active) {
      color: grey;
    }

    /* .rs-nav-subtle .rs-nav-item:hover, .rs-nav-subtle .rs-nav-item:focus */

    .rs-nav-item.rs-nav-item-active {
      color: white;
    }

    .rs-nav-bar {
      display: none;
    }
  }
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
      {app === "Workbench" && (
        <>
          <Workbench />
        </>
      )}
    </ScreenContainer>
  )
}

export default App
