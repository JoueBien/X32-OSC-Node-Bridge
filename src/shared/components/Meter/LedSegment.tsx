// Libs
import { FC } from "react"
import styled from "styled-components"

// Defs
export type MeterSegmentColor = "green" | "#FFBF00" | "red"

type Props = {
  label?: number | string
  color?: MeterSegmentColor
  min?: number
  max?: number
  arg?: number
  isOn?: boolean
  size?: {
    width?: string
    height?: string
    textSize?: string
    markerPadding?: string
    ledSegmentSpacing?: string
    radius?: string
  }
}

type StyleProps = Pick<Props, "color" | "size">

// Styles
const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* width: ${(props) => props?.size?.width || "40px"}; */
  height: ${(props) => props?.size?.height || "20px"};
  /* background: #282c34; */

  & + .LedSegment {
    margin-top: ${(props) => props?.size?.ledSegmentSpacing || "5px"};
  }

  .light {
    position: relative;
    flex-shrink: 0;
    width: ${(props) => props?.size?.width || "40px"};
    height: ${(props) => props?.size?.height || "20px"};

    border-radius: ${(props) => props?.size?.radius || "6px"};
    overflow: hidden;

    .reflector {
      background: ${(props) => props?.color || "green"};
      content: " ";
      position: absolute;
      width: ${(props) => props?.size?.width || "40px"};
      /* height: 20px; */
      height: ${(props) => props?.size?.height || "20px"};
      top: 0px;
      left: 0px;
      opacity: 0.3;
    }

    .glow {
      background: ${(props) => props?.color || "green"};
      content: " ";
      position: absolute;
      width: ${(props) => props?.size?.width || "40px"};
      /* height: 20px; */
      height: ${(props) => props?.size?.height || "20px"};
      top: 0px;
      left: 0px;
    }
  }

  .label {
    display: inline-block;
    line-height: ${(props) => props?.size?.textSize || "20px"};
    color: white;
    font-size: ${(props) => props?.size?.textSize || "20px"};
    margin-left: ${(props) => props?.size?.markerPadding || "5px"};
    width: ${(props) => props?.size?.width || "40px"};
  }
`

// https://stackoverflow.com/questions/61770036/finding-percentage-values-given-min-and-max-in-javascript
const percentBetween = (min: number, max: number) => (value: number) =>
  (100 * (value - min)) / (max - min)

export const LedSegment: FC<Props> = (props) => {
  // Props
  const { label, color, max, min, arg, isOn, size } = props

  // Calc
  const opacity = (() => {
    // Show on and off if requested
    if (isOn === true) {
      return 1
    } else if (isOn === false) {
      return 0
    }

    // Make sure all our input are okay
    if (
      min === undefined &&
      max === undefined &&
      arg !== undefined &&
      (max || 0) > (min || 0)
    ) {
      console.warn("@MeterSegment->opacity: missing max, min, arg")
      return 0.5
    }

    // If zero we are off and we don't need to calculate
    if (arg === 0 || arg === Infinity) {
      return 0
    }

    // Figure out the linear % between each
    const percent = percentBetween(min as number, max as number)
    // from 100% go to 1
    const opacity = percent(arg as number) / 100

    if (opacity > 1) {
      return 1
    }

    return opacity
  })()

  // ..
  return (
    <Container className="LedSegment" color={color} size={size}>
      <div className="light">
        <div className="reflector" />
        <div
          className="glow"
          style={{
            opacity: opacity,
          }}
        />
      </div>
      <div className="label">{label}</div>
    </Container>
  )
}
