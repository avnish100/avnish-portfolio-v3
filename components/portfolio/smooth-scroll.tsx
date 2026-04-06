"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor clicks for smooth scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute("href")
        if (href && href !== "#") {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            lenis.scrollTo(element as HTMLElement, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return <>{children}</>
}
