import { useAsyncSetState, useGetState } from "use-async-setstate"
import { v4 as uuid } from "uuid"

export type ListItem<I> = { id: string; value: I }
export type RecordMap<I> = Record<string, I>

export function useIdRecordList<I>(
  initialValue: RecordMap<I>,
  sort?: (a: ListItem<I>, b: ListItem<I>) => number
) {
  // Local State
  // The map of items stored with there ID's as a key
  const [map, setMap] = useAsyncSetState<RecordMap<I>>(initialValue || {})
  const getMap = useGetState(map)
  const updateAll = setMap

  // calc
  // Turn the map into an array that is sorted in an order
  // Defaults to add order
  const list: ListItem<I>[] = Object.keys(map)
    .map((key) => ({
      id: key,
      value: map[key],
    }))
    .sort(sort)

  // Functions
  // Set an item - if no ID one is provided
  const setItem = async (params: { id?: string | undefined; value: I }) => {
    const { id: existingId, value } = params
    let newId = existingId || uuid()
    await setMap({
      ...getMap(),
      [newId]: value,
    })
    return newId
  }

  // Update an item at the ID
  const updateItem = async (id: string, value: I) => {
    await setItem({ id, value })
    return id
  }

  // Create a new ID
  const newItem = async (value: I) => {
    return await setItem({ id: undefined, value })
  }

  // Delete an item at an ID
  const deleteItem = async (id: string) => {
    const newMap = getMap()
    delete newMap[id]
    await setMap({
      ...newMap,
    })
  }

  return {
    // State
    list,
    map,
    // Mutations
    setItem,
    updateItem,
    newItem,
    updateAll,
    deleteItem,
  }
}
