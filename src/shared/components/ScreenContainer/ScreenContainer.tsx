import React, { FC, PropsWithChildren } from "react"
import styled from "styled-components"

// Types
type Props = {
  className?: string
} & PropsWithChildren

// Styles
const Container = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  &.clear-nav {
    top: 2rem;
  }

  &.center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.fill-screen {
    display: flex;
  }
`

export const ScreenContainer: FC<Props> = ({ children, className }) => {
  // ..
  return (
    <Container className={`ScreenContainer ${className || ""}`}>
      {children}
    </Container>
  )
}
