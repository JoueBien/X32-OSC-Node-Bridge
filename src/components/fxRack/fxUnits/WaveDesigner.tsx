import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
`

export const WaveDesigner = () => {
  const [sta, setSta] = useState(50)

  // ..
  return <Container>WaveDesigner
    {/* <Knob onChange={setSta} min={0} max={100} value={sta}/> */}
    Wave designer
  </Container>
}