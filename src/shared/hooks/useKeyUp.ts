import { useEffect } from "react"

export function useKeyUp(
  callback: (event: KeyboardEvent) => void,
  updateOn?: any[]
) {
  function onKeyPress(event: KeyboardEvent) {
    callback(event)
  }

  // On Mount and callback change
  useEffect(() => {
    document.addEventListener("keyup", onKeyPress)

    // Clean up
    return () => {
      document.removeEventListener("keyup", onKeyPress)
    }
  }, [callback, ...(updateOn || [])])
}
