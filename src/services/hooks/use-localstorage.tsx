import { useState } from 'react'

function useLocalStorage<T>(key: string, initialUser: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialUser

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialUser
    } catch (error) {
      console.log(error)
      return initialUser
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined')
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}

export default useLocalStorage
