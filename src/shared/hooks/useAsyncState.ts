import { useAsyncSetState, useGetState } from "use-async-setstate"

export function useAsyncState<T>(initialState: T): [T, (newState: T) => Promise<T>, () => T] {
  const [state, set] = useAsyncSetState<T>(initialState)
  const get = useGetState(state)
  return [state, set, get]
}
