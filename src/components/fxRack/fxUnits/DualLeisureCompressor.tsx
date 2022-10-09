import { useState } from "react"
import styled from "styled-components"
import { stepBy001, stepBy1 } from "../../../helpers/step"
import { Dial } from "../../inputs/Dial"

const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  background: #6c7793;
  flex-direction: column;

  .side {
    width: 90%;
    height: 140px;
    border: 4px solid white;

    .name {
      padding: 1.25%;
    }

    .controls {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
`

export const DualLeisureCompressor = () => {
  const [value1, setValue1] = useState(0.5)
  const [value2, setValue2] = useState(1)

  // ..
  return (
    <Container className="DualLeisureCompressor">
      {/* WaveDesigner Wave designer */}
      <div className="side">
        <div className="name">
          Dual Leisure Compressor <b>L</b>
        </div>
        <div className="controls">
          <Dial size="40px" backgroundColor="#124912" value={value2} step={stepBy1} min={1} max={0} rotationDeg={180+45} totalTravelDeg={-90} onChange={setValue2}>
            {(value2 === 1) && <>On</>}
            {(value2 === 0) && <>Off</>}
          </Dial>
          <Dial backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial size="50px" backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial size="40px" backgroundColor="#493c12" value={value2} step={stepBy1} min={1} max={0} rotationDeg={-90} totalTravelDeg={-180} onChange={setValue2}>
            {(value2 === 1) && <>LIMIT</>}
            {(value2 === 0) && <>COMP</>}
          </Dial>
        </div>
      </div>
      <div className="side">
        <div className="name">
          Dual Leisure Compressor <b>R</b>
        </div>
        <div className="controls">
          <Dial size="40px" backgroundColor="#124912" value={value2} step={stepBy1} min={1} max={0} rotationDeg={180+45} totalTravelDeg={-90} onChange={setValue2}>
            {(value2 === 1) && <>On</>}
            {(value2 === 0) && <>Off</>}
          </Dial>
          <Dial backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial size="50px" backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial size="40px" backgroundColor="#493c12" value={value2} step={stepBy1} min={1} max={0} rotationDeg={-90} totalTravelDeg={-180} onChange={setValue2}>
            {(value2 === 1) && <>LIMIT</>}
            {(value2 === 0) && <>COMP</>}
          </Dial>
        </div>
      </div>
    </Container>
  )
}
