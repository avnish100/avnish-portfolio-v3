"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const TRAIL_COUNT = 6

function TrailDot({
  cursorX,
  cursorY,
  index,
}: {
  cursorX: ReturnType<typeof useMotionValue<number>>
  cursorY: ReturnType<typeof useMotionValue<number>>
  index: number
}) {
  // Each trail dot has progressively softer springs = more lag
  const stiffness = 300 - index * 40
  const damping = 25 - index * 2
  const x = useSpring(cursorX, { stiffness, damping, mass: 0.2 })
  const y = useSpring(cursorY, { stiffness, damping, mass: 0.2 })

  const size = Math.max(2, 6 - index)
  const opacity = Math.max(0.05, 0.35 - index * 0.05)

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none"
      style={{ x, y }}
    >
      <div
        className="rounded-full bg-fun-coral"
        style={{
          width: size,
          height: size,
          opacity,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  )
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 30, stiffness: 400, mass: 0.2 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor], input, textarea, select")) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor], input, textarea, select")) {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Trail dots — each follows cursor with increasing lag */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <TrailDot
          key={i}
          cursorX={cursorX}
          cursorY={cursorY}
          index={i}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full bg-fun-coral"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{
            width: isHovering ? 40 : 8,
            height: isHovering ? 40 : 8,
            opacity: isHovering ? 0.5 : 0.9,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
      </motion.div>
    </>
  )
}
