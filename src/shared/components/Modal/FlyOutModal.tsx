import { FC, PropsWithChildren } from "react"
import styled, { RuleSet } from "styled-components"
import { ModalPortal, ModalPortalProps } from "./ModalPortal"
import { colors } from "@/shared/styles"
import { screenContainerStyles } from "@/shared/styles/screenContainerStyles"

export type Props = {
  position?: "left" | "right"
  openWidth?: string
  css?: RuleSet<object>
} & ModalPortalProps &
  PropsWithChildren

export type StyledProps = {
  $position?: "left" | "right"
  $openWidth?: string
  $css?: RuleSet<object>
}

const Container = styled.div<StyledProps>`
  /* Apply the global styles to the portal */
  /* Note width is set in screenContainerStyles so we have to call it first so it can be set here. */
  ${screenContainerStyles}

  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0.6rem;
  bottom: 0.6rem;
  ${(props) => props?.$position || "right"}: 0.6rem;
  width: ${(props) => props?.$openWidth || "400px"};
  padding: 0.3rem;

  background: ${colors.background};
  border: 1px solid ${colors.text};
  border-radius: 0.3rem;
  overflow-y: auto;

  /* Exp - not sure if I want to keep it. */
  ${(props) => props?.$css}
`

export const FlyOutModal: FC<Props> = ({
  children,
  isOpen,
  position,
  openWidth,
  css,
  onClose,
  closeOnEscape,
}) => {
  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={closeOnEscape}
    >
      <Container
        className="FlyOutModal"
        $css={css}
        $position={position}
        $openWidth={openWidth}
      >
        {children}
      </Container>
    </ModalPortal>
  )
}
