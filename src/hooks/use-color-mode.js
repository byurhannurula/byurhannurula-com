import { useState, useEffect } from 'react'

export const useColorMode = () => {
  const [currentTheme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light',
  )

  const setNewTheme = (newTheme) => {
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      setNewTheme('light')
    } else {
      setNewTheme('dark')
    }
  }

  const prefersDarkMode = () => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    if (query !== 'undefined' && query.matches) {
      return true
    }
    return false
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      setNewTheme(localTheme)
    } else {
      setNewTheme('light')
    }
  }, [])

  return [currentTheme, toggleTheme]
}
