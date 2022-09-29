// Libs
import styled from "styled-components"
import Nav from "rsuite/Nav"
// Comps
import "../styles/App.css"
import { MeterScreen } from "./MeterScreen"
import { useState } from "react"
import { ConnectScreen } from "./ConnectScreen"

// Style
const ScreenContainer = styled.div`
  width: 1920px;

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
  // Local State
  const [activeKey, setActiveKey] = useState<string>("setup")

  // ..
  return (
    <ScreenContainer className="ScreenContainer">
      <Nav
        appearance="subtle"
        className="topNav"
        activeKey={activeKey}
        onSelect={setActiveKey}
      >
        <Nav.Item eventKey="setup">Setup</Nav.Item>
        <Nav.Item eventKey="bridge">Bridge</Nav.Item>
      </Nav>
      {activeKey === "setup" && (
        <>
          <ConnectScreen />
        </>
      )}
      {activeKey === "bridge" && (
        <>
          <MeterScreen />
        </>
      )}
    </ScreenContainer>
  )
}

export default App
