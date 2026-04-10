"use client"

import { useEffect, useState, useCallback } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false)
  const stableOnComplete = useCallback(onComplete, [])

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1200)
    const t2 = setTimeout(() => stableOnComplete(), 2000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [stableOnComplete])

  return (
    <div
      className="preloader-overlay"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <span
        className="preloader-logo"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? "scale(0.8)" : "scale(1)",
        }}
      >
        AJ
      </span>
    </div>
  )
}
