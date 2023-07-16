// Libs
import styled from "styled-components"
// Comps
import "shared/styles/App.css"
import { Workbench } from "applications/Workbench"
import { MeterBridge } from "applications/MeterBridge"
import { colors } from "shared/styles"
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

  .rs-btn {
    padding: 0.30rem;
    border-radius: 0.30rem;
    line-height: 200%;
    font-size: 0.6rem;
    font-weight: 650;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .Button-grey.rs-btn-default {
    background-color: ${colors.buttonGrey};
    color: ${colors.inverted.buttonGrey};
    border: 1px solid ${colors.buttonGrey};
  }

  .Button-red.rs-btn-default {
    background-color: ${colors.buttonRed};
    color: ${colors.inverted.buttonRed};
    border: 1px solid ${colors.buttonRed};
  }

  .Button-blue.rs-btn-default {
    background-color: ${colors.buttonBlue};
    color: ${colors.inverted.buttonBlue};
    border: 1px solid ${colors.buttonBlue};
  }




  // 0066ff

  .rs-input {
    padding: 0.30rem;
    border-radius: 0.30rem;
    line-height: 200%;
    font-size: 0.6rem;
    font-weight: 650;
    letter-spacing: 0.025rem;
    background-color: transparent;
    color: ${colors.text};
    /* text-transform: uppercase; */
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
