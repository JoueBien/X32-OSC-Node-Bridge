import { FC, useContext, useState } from "react"
import styled from "styled-components"
import { X32Context } from "../../../contexts/X32Context"
import { argToAmpValue, argToOnOff } from "../../../helpers/mixer/cast"
import { stepBy025, stepBy1, stepByNegative1 } from "../../../helpers/step"
import { ARG_64 } from "../../../types/args"
import { FX_UNIT_NUMBER } from "../../../types/fxTypes"
import { Dial } from "../../inputs/Dial"
import { colors } from "../../../styles/index"

const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #994d00;

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
  }
`

type Props = {
  fxArgs?: ARG_64
  fxUnit: FX_UNIT_NUMBER
}

export const DualGuitarAmp: FC<Props> = ({ fxArgs, fxUnit }) => {
  // Props
  const value1 = fxArgs?.[0] || 0
  const value2 = fxArgs?.[1] || 0
  const value3 = fxArgs?.[2] || 0
  const value4 = fxArgs?.[3] || 0
  const value5 = fxArgs?.[4] || 0
  const value6 = fxArgs?.[5] || 0
  const value7 = fxArgs?.[6] || 0
  const value8 = fxArgs?.[7] || 0
  const value9 = fxArgs?.[8] || 0

  const value10 = fxArgs?.[9] || 0
  const value11 = fxArgs?.[10] || 0
  const value12 = fxArgs?.[11] || 0
  const value13 = fxArgs?.[12] || 0
  const value14 = fxArgs?.[13] || 0
  const value15 = fxArgs?.[14] || 0
  const value16 = fxArgs?.[15] || 0
  const value17 = fxArgs?.[16] || 0
  const value18 = fxArgs?.[17] || 0
  // Global State
  const { setFxParam } = useContext(X32Context)

  // Function
  const onChange = (fxParamIndex: number, value: number) => {
    console.log("@onChange->", fxParamIndex, value)
    setFxParam(fxUnit, fxParamIndex, value)
  }

  // ..
  return (
    <Container className="DualGuitarAmp">
      {/* WaveDesigner Wave designer */}
      <div className="side">
        <div className="name">
          Guitar Amp <b>L</b>
        </div>
        <div className="controls">
          <Dial
            size="50px"
            backgroundColor="#49121f"
            value={value1}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(1, value)
            }}
          />
          <Dial
            size="50px"
            value={value2}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(2, value)
            }}
          />
          <Dial
            size="50px"
            value={value3}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(3, value)
            }}
          />
          <Dial
            size="50px"
            value={value4}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(4, value)
            }}
          />
          <Dial
            size="50px"
            value={value5}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(5, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#49121f"
            value={value6}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(6, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#493c12"
            value={value7}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(7, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#493c12"
            value={value8}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(8, value)
            }}
          />
          <Dial
            size="40px"
            backgroundColor="#124912"
            value={value9 > 0 ? 1 : 0}
            step={stepBy1}
            min={1}
            max={0}
            rotationDeg={180 + 45}
            totalTravelDeg={-90}
            valueFormatter={argToOnOff}
            onChange={(value) => {
              onChange(9, value)
            }}
          />
        </div>
      </div>
      <div className="side">
        <div className="name">
          Guitar Amp <b>R</b>
        </div>
        <div className="controls">
          <Dial
            size="50px"
            backgroundColor="#49121f"
            value={value10}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(10, value)
            }}
          />
          <Dial
            size="50px"
            value={value11}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(11, value)
            }}
          />
          <Dial
            size="50px"
            value={value12}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(12, value)
            }}
          />
          <Dial
            size="50px"
            value={value13}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(13, value)
            }}
          />
          <Dial
            size="50px"
            value={value14}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(14, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#49121f"
            value={value15}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(15, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#493c12"
            value={value16}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(16, value)
            }}
          />
          <Dial
            size="50px"
            backgroundColor="#493c12"
            value={value17}
            step={stepBy025}
            min={0}
            max={1}
            totalTravelDeg={270}
            valueFormatter={argToAmpValue}
            onChange={(value) => {
              onChange(17, value)
            }}
          />
          <Dial
            size="40px"
            backgroundColor="#124912"
            value={value18 > 0 ? 1 : 0}
            step={stepBy1}
            min={1}
            max={0}
            rotationDeg={180 + 45}
            totalTravelDeg={-90}
            valueFormatter={argToOnOff}
            onChange={(value) => {
              onChange(8, value)
            }}
          />
        </div>
      </div>
    </Container>
  )
}
