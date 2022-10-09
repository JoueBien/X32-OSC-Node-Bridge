// Libs
import { FC, useEffect, useRef, WheelEvent, PropsWithChildren } from "react"
import styled from "styled-components"
import { distanceBetween } from "../../helpers/positionsBetween"
import { Direction, Step, stepBy1 } from "../../helpers/step"

const Container = styled.div`
  position: relative;
  border-radius: 100%;
  background: #282c34; // radial-gradient(circle at center, #16181d, #282c34); //
  border: 2px solid #424857;

  .marker {
    border-radius: 100%;
    background: transparent;
    &::after {
      content: " ";
      position: absolute;
      top: 0px;
      /* Left is 50% minus half width */
      left: calc(50% - 2.5px);
      width: 5px;
      height: 10px;
      background: white;
      border-radius: 2px;
    }
  }

  .value {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 70%;
  }
`

type Props = {
  size?: string // The width/height
  //Step - Used to calculate the next step up or down an increment
  step?: (previousValue: number, direction: Direction) => number
  value?: number // the value the dial is at
  min?: number // The min number
  max?: number // The max number
  onChange?: (value: number) => void // What to do when changed
  totalTravelDeg?: number // The total deg that to swing to/from
  rotationDeg?: number // The rotation of the dial to start with
  backgroundColor?: string
} & PropsWithChildren

export const Dial: FC<Props> = ({
  size,
  value = 0,
  step,
  min = -1,
  max = 1,
  onChange,
  totalTravelDeg,
  rotationDeg = 0, 
  children,
  backgroundColor,
}) => {
  // Local State
  const dialRef = useRef<HTMLDivElement | null>(null)

  // Calc
  // Figure out the degs
  // don't know how this works but it does
  const deg: number = (() => {
    // figure out the min and mac degs
    const _totalTravelDeg = totalTravelDeg || 180
    const negativeHalfTravel = (_totalTravelDeg / 2) * -1
    // Cast value into positive
    const _value = Math.abs(0 + min) + value
    // Work out where the degrees are in relation to the positive value
    return (
      negativeHalfTravel +
      (_totalTravelDeg / distanceBetween(min, max)) * _value
    )
  })()

  // Functions
  // On change - handle undefined func
  const _onChange = (value: number) => {
    if (onChange) {
      onChange(value)
    } else {
      console.warn("@Dial->onChange", value)
    }
  }

  // Run the default step of +/- 1 or a custom step
  const _step = (previousValue: number, direction: Direction) => {
    if (step) {
      return step(previousValue, direction)
    } else {
      return stepBy1(previousValue, direction)
    }
  }

  // When we scroll we go up or down 1 value
  const onScroll = (event: WheelEvent) => {
    // Prevent Page from scrolling
    event.preventDefault()
    // Remove Junk
    if (event.deltaY === 0 || event.deltaY === -0) {
      return
    }
    // Detect Up/Down
    if (event.deltaY > 0) {
      // Down
      const newValue = _step(value, Step.down)
      if (newValue <= min) {
        _onChange(min)
      } else {
        _onChange(newValue)
      }
    } else {
      // Up
      const newValue = _step(value, Step.up)
      if (newValue >= max) {
        _onChange(max)
      } else {
        _onChange(newValue)
      }
    }
  }

  // When scrolled on we need to update the value
  // This is a bit waste-full
  useEffect(() => {
    dialRef.current?.removeEventListener("wheel", onScroll as any)
    dialRef.current?.addEventListener("wheel", onScroll as any, false)
    return () => {
      dialRef.current?.removeEventListener("wheel", onScroll as any)
    }
  }, [onScroll])

  // ..
  return (
    <Container
      ref={dialRef}
      style={{
        width: size || "60px",
        height: size || "60px",
        background: backgroundColor,
        transform: `rotate(${rotationDeg}deg)`,
      }}
    >
      <div
        className="marker"
        style={{
          width: size || "60px",
          height: size || "60px",
          transform: `rotate(${deg}deg)`,
        }}
      />
      <div className="value" style={{
        transform: `rotate(${rotationDeg * -1}deg)`,
      }}>
        {/* {deg} */}
        {/* <br/> */}
        {children || value}
      </div>
    </Container>
  )
}
