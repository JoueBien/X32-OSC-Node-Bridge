import { useState } from "react"
import styled from "styled-components"
import { stepBy001 } from "../../../helpers/step"
import { Dial } from "../../inputs/Dial"

const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  background: #002999;

  .side {
    width: 40%;
    height: 140px;
    border: 4px solid white;
    border-radius: 10% 0% 10% 0%;

    & + .side {
      margin-left: 7%;
    }

    .name {
      padding: 2.5%;
    }

    .controls {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
`

export const WaveDesigner = () => {
  const [value1, setValue1] = useState(0.5)

  // ..
  return (
    <Container className="WaveDesigner">
      {/* WaveDesigner Wave designer */}
      <div className="side">
        <div className="name">
          Wave Designer <b>L</b>
        </div>
        <div className="controls">
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
        </div>
      </div>
      <div className="side">
        <div className="name">
          Wave Designer <b>R</b>
        </div>
        <div className="controls">
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
          <Dial backgroundColor={"#49121f"} value={value1} step={stepBy001} min={0} max={1} totalTravelDeg={270} onChange={setValue1} />
        </div>
      </div>
    </Container>
  )
}
