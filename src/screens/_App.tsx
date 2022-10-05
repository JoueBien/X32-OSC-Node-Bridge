// Libs
import styled from "styled-components"
import Nav from "rsuite/Nav"
// Comps
import "../styles/App.css"
import { MeterScreen } from "./MeterScreen"
import { useContext, useEffect, useState } from "react"
import { ConnectScreen } from "./ConnectScreen"
import { FxScreen } from "./FxScreen"
import { X32Context } from "../contexts/X32Context"

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
  // Global State
  const [activeKey, setActiveKey] = useState<string>("setup")
  const { startMeters, stopMeters, } = useContext(X32Context) 

  // When looking at the bridge we show the bridge
  useEffect(() => {
    // We need to stop all
    stopMeters();
    // Then start which ever one we need
    if (activeKey === "bridge") { startMeters(); } 

  }, [activeKey])

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
        <Nav.Item eventKey="fx">Fx</Nav.Item>
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

      {activeKey === "fx" && (
        <>
          <FxScreen />
        </>
      )}
    </ScreenContainer>
  )
}

export default App
