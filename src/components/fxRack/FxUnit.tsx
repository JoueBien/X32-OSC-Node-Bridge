// Libs
import { FC, useState, useContext, SyntheticEvent } from "react"
import { SelectPicker } from "rsuite"
import styled from "styled-components"
import { X32Context } from "../../contexts/X32Context"
// Comps
import { MBM7CL_POINTS } from "../../helpers/mixer/db"
import { ARG_4 } from "../../types/args"
import { fxLabelsToOptions, FX_LABELS_1_4_TYPE, FX_LABELS_5_8_TYPE, FX_UNIT_NUMBER } from "../../types/fxTypes"
import DbArgMeterST from "../meters/DbArgMeter/DbArgMeterST"
import { WaveDesigner } from "./fxUnits/WaveDesigner"

// Styles
const Container = styled.div`
  display: flex;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(75px * 2);

    padding-top: 10px;
    padding-bottom: 15px;

    .meter-in-out {
      display: flex;
      align-items: center;
    }
  }

  .fx-unit-inner {
    width: 100%;
  }
`
// Props
type Props = {
  fxUnit: FX_UNIT_NUMBER
  fxTypeArg?: number
  availableFx?: (FX_LABELS_1_4_TYPE | FX_LABELS_5_8_TYPE)[]
  channelArgs?: ARG_4
}

export const FxUnit: FC<Props> = ({
  fxTypeArg, channelArgs, fxUnit, availableFx,
}) => {
  // Local State
  const [fxOptions , _setFxOptions] = useState(fxLabelsToOptions(availableFx || []))

  // Global State
  const { setFxType } = useContext(X32Context)

  // Funcs
  const onChangeOption = (value: number | null, event: SyntheticEvent<Element, Event>) => {
    setFxType(fxUnit, value || 0)
  }

  // ..
  return <Container className="FxUnit">
    <div className="left">
      <div className="meter-in-out">
        <DbArgMeterST arg1={channelArgs?.[0]} arg2={channelArgs?.[1]} points={MBM7CL_POINTS} halfHeight={true} label={`${fxUnit} In L/R`}/>
        <DbArgMeterST arg1={channelArgs?.[2]} arg2={channelArgs?.[3]} points={MBM7CL_POINTS} halfHeight={true} label={`${fxUnit} Out L/R`}/>
      </div>
      <SelectPicker size="sm" value={fxTypeArg || 0} data={fxOptions} style={{ width: "100%" }} cleanable={false} onChange={onChangeOption} />
    </div>
    <div className="fx-unit-inner">
    <WaveDesigner />
      {availableFx?.[fxTypeArg || 0] === "Wave Designer" && <WaveDesigner /> }
    </div>
  </Container>
}
