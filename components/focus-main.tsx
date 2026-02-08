"use client"

import { useEffect } from "react"

export default function FocusMain() {
  useEffect(() => {
    // Add keyboard/mouse detection to show focus outlines only when tabbing
    function handleFirstTab(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        try { document.documentElement.classList.add('user-is-tabbing') } catch (e) {}
        window.removeEventListener('keydown', handleFirstTab)
        window.addEventListener('mousedown', handleMouseDownOnce)
      }
    }

    function handleMouseDownOnce() {
      try { document.documentElement.classList.remove('user-is-tabbing') } catch (e) {}
      window.removeEventListener('mousedown', handleMouseDownOnce)
      window.addEventListener('keydown', handleFirstTab)
    }

    window.addEventListener('keydown', handleFirstTab)

    // Focus main on initial load if no hash present (makes keyboard users see content immediately)
    try {
      if (!location.hash) {
        const main = document.getElementById('main')
        if (main && document.activeElement === document.body) {
          // small delay to ensure hydration complete
          setTimeout(() => {
            try {
              (main as HTMLElement).focus()
              // add a temporary visible hint so the change is obvious to users
              document.documentElement.classList.add('show-main-focus')
              setTimeout(() => {
                document.documentElement.classList.remove('show-main-focus')
              }, 2000)
            } catch (e) {}
          }, 120)
        }
      }
    } catch (e) {}

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', handleMouseDownOnce)
    }
  }, [])

  return null
}
