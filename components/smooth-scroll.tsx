"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      )
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
  }, [isMobile])

  if (isMobile) {
    return <>{children}</>
  }

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1, 
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  )
}
