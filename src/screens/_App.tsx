// Libs
import styled from "styled-components"
// Comps
import "../styles/App.css"
import { Workbench } from "applications/Workbench"
import { MeterBridge } from "applications/MeterBridge"
// Config
let app: string = "MeterBridge" // MeterBridge// Workbench

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
  // const [activeKey, setActiveKey] = useState<string>("setup")
  // const { startMeters, stopMeters, startFxs, stopFxs } = useContext(X32Context)

  // When looking at the bridge we show the bridge
  // useEffect(() => {
  // // We need to stop all
  // stopMeters()
  // stopFxs()
  // // Then start which ever one we need
  // if (activeKey === "bridge") { startMeters(); }
  // if (activeKey === "fx") { startFxs(); }

  // }, [activeKey])

  // function send() {
  // ipcRenderer.send('connect', 'stuff')
  // }
  // Workbench
  // MeterBridge

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

      {/* <h1 onClick={send}>Disabled stuff !!</h1> */}
      {/* <Nav
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
      )} */}
      {/* {activeKey === "bridge" && (
        <>
          <MeterScreen />
        </>
      )}

      {activeKey === "fx" && (
        <>
          <FxScreen />
        </>
      )} */}
    </ScreenContainer>
  )
}

export default App
