import { useAsyncSetState, useGetState } from "use-async-setstate"

export type Item8<T> = [T, T, T, T, T, T, T, T]
export type Item8Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export default function use8<T>(clearValue: T) {
  // Props
  const clearValue8: Item8<T> = [
    clearValue,
    clearValue,
    clearValue,
    clearValue,
    clearValue,
    clearValue,
    clearValue,
    clearValue,
  ]

  // Local State
  const [items, setItems] = useAsyncSetState<Item8<T>>(clearValue8)
  const getItems = useGetState(items)

  // Re-set all items to nothings
  async function clearItems() {
    await setItems(clearValue8)
  }

  // Set a specific index
  async function setItem(index: Item8Index, value: T) {
    const newItems = getItems()
    newItems[index] = value
    await setItems(newItems)
  }

  return {
    items,
    setItems,
    setItem,
    clearItems,
  }
}
