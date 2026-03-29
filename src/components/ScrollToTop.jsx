import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on client-side navigation (hash-only changes keep scroll). */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
