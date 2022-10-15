import { FC, useContext, useState } from "react"
import styled from "styled-components"
import { X32Context } from "../../../contexts/X32Context"
import { argToLimitCompress, argToNeg18Pos6, argToOnOff, argToPosPercentageNoSymbol } from "../../../helpers/mixer/cast"
import { stepBy001, stepBy02, stepBy1, stepByDbNeg18ToPos6HalfSteps } from "../../../helpers/step"
import { ARG_64 } from "../../../types/args"
import { FX_UNIT_NUMBER } from "../../../types/fxTypes"
import { Dial } from "../../inputs/Dial"
import { colors } from "../../../styles/index"


const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  background: #6c7793;
  flex-direction: column;

  .side {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    height: 140px;

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

  .side + .side {
    border-top: 4px solid  ${colors.background};
    background: ${colors.background};
  }
`

type Props = {
  fxArgs?: ARG_64
  fxUnit: FX_UNIT_NUMBER
}

export const StereoLeisureCompressor: FC<Props> = ({ fxArgs, fxUnit }) => {
  // Props
  const value1 = fxArgs?.[0] || 0
  const value2 = fxArgs?.[1] || 0
  const value3 = fxArgs?.[2] || 0
  const value4 = fxArgs?.[3] || 0
  const value5 = fxArgs?.[4] || 0

  // Global State
  const { setFxParam } = useContext(X32Context)

  // Function
  const onChange = (fxParamIndex: number, value: number) => {
    console.log("@onChange->", fxParamIndex, value)
    setFxParam(fxUnit, fxParamIndex, value)
  }
  

  // ..
  return (
    <Container className="StereoLeisureCompressor">
      {/* WaveDesigner Wave designer */}
      <div className="side">
        <div className="name">
          Stereo Leisure Compressor <b>L/R</b>
        </div>
        <div className="controls">
          <Dial
            size="40px"
            backgroundColor="#124912"
            value={value1 > 0 ? 1 : 0}
            step={stepBy1}
            min={1}
            max={0}
            rotationDeg={180 + 45}
            totalTravelDeg={-90}
            valueFormatter={argToOnOff}
            onChange={(value) => {
              onChange(1, value)
            }}
          />
          <Dial
            backgroundColor={"#49121f"}
            value={value2}
            step={stepBy02}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosPercentageNoSymbol}
            onChange={(value) => {
              onChange(2, value)
            }}
          />
          <Dial
            value={value3}
            step={stepBy02}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToPosPercentageNoSymbol}
            onChange={(value) => {
              onChange(3, value)
            }}
          />
          {/* Gain */}
          <Dial
            size="50px"
            backgroundColor={"#49121f"}
            value={value5}
            step={stepByDbNeg18ToPos6HalfSteps}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToNeg18Pos6}
            onChange={(value) => {
              onChange(5, value)
            }}
          />
          {/* Mode */}
          <Dial
            size="40px"
            backgroundColor="#493c12"
            value={value4 > 0 ? 1 : 0}
            step={stepBy001}
            min={1}
            max={0}
            rotationDeg={-90}
            totalTravelDeg={-180}
            valueFormatter={argToLimitCompress}
            onChange={(value) => {
              onChange(4, value)
            }}
          />
        </div>
      </div>
      <div className="side">
      </div>
    </Container>
  )
}
