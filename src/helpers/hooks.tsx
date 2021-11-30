import { useState } from 'react'

export const useToggle = (
  initialValue = false
): { value: boolean; toggle: () => void } => {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    toggle: () => setValue((flag) => !flag),
  }
}

export const useObjectData = (
  initialValue = {}
): {
  data: any
  setState: (data) => void
  setField: (key, value) => void
} => {
  const [data, setValue] = useState(initialValue)
  return {
    data,
    setState: (data) => setValue(data),
    setField: (key, value) =>
      setValue((prevState) => ({ ...prevState, [key]: value })),
  }
}
