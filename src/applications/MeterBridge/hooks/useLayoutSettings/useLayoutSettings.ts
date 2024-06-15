import { useLayoutSettingsLoader } from "./useLayoutSettingsLoader"
import { useMeterSourceMap } from "./useMeterSourceMap"
import { useRowColumns } from "./useRowColumns"

export function useLayoutSettings() {
  const {} = useMeterSourceMap()
  const {} = useRowColumns()
  const {} = useLayoutSettingsLoader()

  return {}
}

export type UseLayoutSettings = ReturnType<typeof useLayoutSettings>
