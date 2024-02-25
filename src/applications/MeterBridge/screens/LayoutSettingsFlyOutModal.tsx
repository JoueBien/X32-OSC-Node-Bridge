import { FlyOutModal } from "@/shared/components/Modal/FlyOutModal"
import { FC } from "react"
import styled from "styled-components"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const Container = styled.div``

export const LayoutSettingsFlyOutModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <FlyOutModal isOpen={isOpen} onClose={onClose}>
      <Container>
        <p>
          <b>Layout Settings</b>
          <br />
          <br />
        </p>
      </Container>
    </FlyOutModal>
  )
}
