import { FC, useContext, useState } from "react"
import styled from "styled-components"
import { X32Context } from "../../../contexts/X32Context"
import { argToPosNeg24, argToPosNegPercentage, floatToFixed3 } from "../../../helpers/mixer/cast"
import { stepBy001, stepBy01, stepByDbPlusMinus24InHalfSteps } from "../../../helpers/step"
import { ARG_64 } from "../../../types/args"
import { FX_UNIT_NUMBER } from "../../../types/fxTypes"
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

type Props = {
  fxArgs?: ARG_64
  fxUnit: FX_UNIT_NUMBER
}

export const WaveDesigner: FC<Props> = ({ fxArgs, fxUnit }) => {

  // Props
  const value1 = fxArgs?.[0] || 0
  const value2 = fxArgs?.[1] || 0
  const value3 = fxArgs?.[2] || 0
  const value4 = fxArgs?.[3] || 0
  const value5 = fxArgs?.[4] || 0
  const value6 = fxArgs?.[5] || 0

  // Global State
  const { setFxParam } = useContext(X32Context)

  // Function
  const onChange = (fxParamIndex: number, value: number) => {
    console.log("@onChange->", fxParamIndex, value)
    setFxParam(fxUnit, fxParamIndex , value)
  }

  // ..
  return (
    <Container className="WaveDesigner">
      {/* WaveDesigner Wave designer */}
      <div className="side">
        <div className="name">
          Wave Designer <b>L</b>
        </div>
        <div className="controls">
          <Dial
            value={floatToFixed3(value1)}
            step={stepBy01}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNegPercentage}
            onChange={(value) => {
              onChange(1, value)
            }}
          />
          <Dial
            value={floatToFixed3(value2)}
            step={stepBy01}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNegPercentage}
            onChange={(value) => {
              onChange(2, value)
            }}
          />
          <Dial
            backgroundColor={"#49121f"}
            value={floatToFixed3(value3)}
            step={stepByDbPlusMinus24InHalfSteps}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNeg24}
            onChange={(value) => {
              onChange(3, value)
            }}
          />
        </div>
      </div>
      <div className="side">
        <div className="name">
          Wave Designer <b>R</b>
        </div>
        <div className="controls">
          <Dial
            value={floatToFixed3(value4)}
            step={stepBy01}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNegPercentage}
            onChange={(value) => {
              onChange(4, value)
            }}
          />
          <Dial
            value={floatToFixed3(value5)}
            step={stepBy01}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNegPercentage}
            onChange={(value) => {
              onChange(5, value)
            }}
          />
          <Dial
            backgroundColor={"#49121f"}
            value={floatToFixed3(value6)}
            step={stepByDbPlusMinus24InHalfSteps}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosNeg24}
            onChange={(value) => {
              onChange(6, value)
            }}
          />
        </div>
      </div>
    </Container>
  )
}
