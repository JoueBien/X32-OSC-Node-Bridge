// Libs
import { FC, PropsWithChildren } from "react"
import styled from "styled-components"
// Comps

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* width: fit-content; */
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

// Defs
type Props = {
  className?: string
}

export const MeterBridgeBar: FC<PropsWithChildren & Props> = ({
  children, className
}) => {
  // ..
  return <Container className={`MeterBridgeBar ${className || ""}`}>
    {children}
  </Container>
}

