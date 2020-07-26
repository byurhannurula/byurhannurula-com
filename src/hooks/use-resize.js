import { useState, useEffect } from 'react'

export const useResize = () => {
  const [sizes, setSizes] = useState({ width: 0, height: 0 })
  const [isMobile, setMobile] = useState(false)

  const onResize = () => {
    setSizes({ width: window.innerWidth, height: window.innerHeight })
    setMobile(window.matchMedia(`(max-width: 720px)`).matches)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    onResize()

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return { isMobile, sizes }
}
