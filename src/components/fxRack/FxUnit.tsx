// Libs
import { FC, useState, useContext, SyntheticEvent, useEffect } from "react"
import { SelectPicker } from "rsuite"
import styled from "styled-components"
import { X32Context } from "../../contexts/X32Context"
// Comps
import { MBM7CL_POINTS } from "../../helpers/mixer/db"
import { ARG_4, ARG_64 } from "../../types/args"
import {
  fxLabelsToOptions,
  FX_LABELS_1_4_TYPE,
  FX_LABELS_5_8_TYPE,
  FX_UNIT_NUMBER,
} from "../../types/fxTypes"
import DbArgMeterST from "../meters/DbArgMeter/DbArgMeterST"
import { DualGuitarAmp } from "./fxUnits/DualGuitarAmp"
import { DualLeisureCompressor } from "./fxUnits/DualLeisureCompressor"
import { StereoGuitarAmp } from "./fxUnits/StereoGuitarAmp"
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
    display: flex;
    width: 100%;
  }
`
// Props
type Props = {
  fxUnit: FX_UNIT_NUMBER
  fxTypeArg?: number
  availableFx?: (FX_LABELS_1_4_TYPE | FX_LABELS_5_8_TYPE)[]
  channelArgs?: ARG_4
  fxArgs?: ARG_64
  
}

export const FxUnit: FC<Props> = ({
  fxTypeArg,
  channelArgs,
  fxUnit,
  availableFx,
  fxArgs
}) => {
  // Local State
  const [fxOptions, _setFxOptions] = useState(
    fxLabelsToOptions(availableFx || [])
  )
  const [localFxTypeArg, setLocalFxTypeArg] = useState<number | undefined>(
    fxTypeArg
  )
  const [canUpdate, setCanUpdate] = useState<boolean>(true)

  // Global State
  const { setFxType } = useContext(X32Context)

  // Funcs
  const onChangeOption = (
    value: number | null,
    _event: SyntheticEvent<Element, Event>
  ) => {
    setFxType(fxUnit, value || 0)
    setLocalFxTypeArg(value || 0)
  }

  // Keep updating with the value
  useEffect(() => {
    // We don't wan't to keep track of updates if we have the control open
    if (canUpdate === true) {
      setLocalFxTypeArg(fxTypeArg)
    }
  }, [fxTypeArg])

  // ..
  return (
    <Container className="FxUnit">
      <div className="left">
        <div className="meter-in-out">
          <DbArgMeterST
            arg1={channelArgs?.[0]}
            arg2={channelArgs?.[1]}
            points={MBM7CL_POINTS}
            halfHeight={true}
            label={`${fxUnit} In L/R`}
          />
          <DbArgMeterST
            arg1={channelArgs?.[2]}
            arg2={channelArgs?.[3]}
            points={MBM7CL_POINTS}
            halfHeight={true}
            label={`${fxUnit} Out L/R`}
          />
        </div>
        <SelectPicker
          size="sm"
          value={localFxTypeArg || 0}
          data={fxOptions}
          style={{ width: "100%" }}
          cleanable={false}
          onChange={onChangeOption}
          onEntered={() => { setCanUpdate(false); }}
          onExited={() => { setCanUpdate(true); }}
        />
      </div>
      {canUpdate === true && <>
        <div className="fx-unit-inner">
          {/* <WaveDesigner /> */}
          {/* <DualGuitarAmp /> */}
          {/* <DualLeisureCompressor /> */}
          {availableFx?.[localFxTypeArg || 0] === "Wave Designer" && <WaveDesigner fxUnit={fxUnit} fxArgs={fxArgs} /> }
          {availableFx?.[localFxTypeArg || 0] === "Dual Guitar Amp" && <DualGuitarAmp fxUnit={fxUnit} fxArgs={fxArgs} />}
          {availableFx?.[localFxTypeArg || 0] === "Stereo Guitar Amp" && <StereoGuitarAmp fxUnit={fxUnit} fxArgs={fxArgs} />}

        
        </div>
      </>}
    </Container>
  )
}
