// Libs
import styled from "styled-components"

// Comps 
import "../styles/App.css"
import { MeterScreen } from "./MeterScreen"

// Style
const ScreenContainer = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  padding-top: 32px;
  padding-bottom: 32px;
`

function App() {
  // ..
  return (
    <ScreenContainer className="ScreenContainer">
      <MeterScreen />
    </ScreenContainer>
  )
}

export default App
