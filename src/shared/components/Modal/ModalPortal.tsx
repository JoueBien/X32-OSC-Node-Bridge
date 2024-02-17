import { useKeyUp } from "@/shared/hooks/useKeyUp"
import { FC, PropsWithChildren, Fragment } from "react"
import { createPortal } from "react-dom"

export type ModalPortalProps = {
  isOpen: boolean
  closeOnEscape?: boolean
  onClose: () => void
} & PropsWithChildren

/** A transparent way to implement single layer modals.
 * While it does provide accessibility for closing by escape it
 * does not provide other accessibility tools like a
 * tab trap OR shifting focus to a close button OR multiple modals.
 */
export const ModalPortal: FC<ModalPortalProps> = ({
  children,
  isOpen,
  closeOnEscape,
  onClose,
}) => {
  // Functions
  function _onClose() {
    const func =
      onClose || (() => console.warn("@ModalPortal->onClose no function set"))
    func()
  }

  // Effects
  // Set up listener for Escape key
  useKeyUp(
    (event) => {
      if (event.code === "Escape" && closeOnEscape === true) {
        _onClose()
      }
    },
    [closeOnEscape, onClose]
  )
  // null || ..
  if (!isOpen) {
    return null
  }

  return createPortal(<Fragment>{children}</Fragment>, document.body)
}
