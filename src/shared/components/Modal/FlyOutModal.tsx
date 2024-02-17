import { FC, PropsWithChildren } from "react"
import styled, { RuleSet } from "styled-components"
import { ModalPortal, ModalPortalProps } from "./ModalPortal"
import { colors } from "@/shared/styles"

export type Props = {
  position?: "left" | "right"
  css?: RuleSet<object>
} & ModalPortalProps &
  PropsWithChildren

const Container = styled.div<Pick<Props, "position" | "css">>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0.6rem;
  bottom: 0.6rem;
  ${(props) => props?.position || "right"}: 0.6rem;
  width: 400px;
  padding: 0.3rem;

  background: ${colors.background};
  border: 1px solid ${colors.text};
  border-radius: 0.3rem;
  overflow-y: scroll;
  /* Exp - not sure if I want to keep it. */
  ${(props) => props?.css}
`

export const FlyOutModal: FC<Props> = ({
  children,
  isOpen,
  position,
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
      <Container className="FlyOutModal" css={css} position={position}>
        {children}
      </Container>
    </ModalPortal>
  )
}
