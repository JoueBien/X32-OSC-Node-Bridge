import { useAsyncSetState, useGetState } from "use-async-setstate"

export const useObjectList = <T>(
  defaultList?: T[],
  sort?: (a: T, b: T) => number
) => {
  // State
  const [list, setList] = useAsyncSetState<T[]>(defaultList || [])
  const getList = useGetState(list)

  // Mutators
  const updateAtIndex = async (index: number, value: T) => {
    const newList = getList()
    newList[index] = value
    await setList(newList.sort(sort))
  }

  const push = async (value: T) => {
    await setList([...getList(), value].sort(sort))
  }

  const pushEnd = push

  const pushStart = async (value: T) => {
    await setList([value, ...getList()].sort(sort))
  }

  const removeAtIndex = async (index: number) => {
    await setList(getList().filter((value, itemIndex) => index !== itemIndex))
  }

  // Find and object in the list that has a key with a value
  const getObjectByKeyValue = (key: keyof T, value: any) => {
    const strValue = JSON.stringify(value)

    const first = getList().find(
      (itemIndex) => JSON.stringify(itemIndex?.[key]) === strValue
    )
    return first
  }

  const removeObject = async (value: T) => {
    const strValue = JSON.stringify(value)
    await setList(getList().filter((item) => strValue !== JSON.stringify(item)))
  }

  return {
    list,
    overrideList: async ( values: T[]) => {
      await setList(values)
    },
    updateAtIndex,
    push,
    pushEnd,
    pushStart,
    removeAtIndex,
    removeObject,
    getObjectByKeyValue,
  }
}
