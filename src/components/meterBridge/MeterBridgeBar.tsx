// Libs
import { FC, PropsWithChildren } from "react"
import styled from "styled-components"
// Comps

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`

// Defs
type Props = {}

export const MeterBridgeBar: FC<PropsWithChildren & Props> = ({
  children,
}) => {
  // ..
  return <Container className="MeterBridgeBar">
    {children}
  </Container>
}

