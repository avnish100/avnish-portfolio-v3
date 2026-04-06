"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroOverlayProps {
  onComplete: () => void
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const lines = [
    { text: "Software Engineer", color: "text-fun-coral" },
    { text: "Shopify Developer", color: "text-fun-blue" },
    { text: "Product Manager", color: "text-fun-green" },
  ]

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Reveal each line with stagger
    lines.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setCurrentLine(index + 1)
        }, 400 + index * 500)
      )
    })

    // Start exit after all lines shown
    timers.push(
      setTimeout(() => {
        setIsExiting(true)
      }, 400 + lines.length * 500 + 600)
    )

    // Complete after exit animation
    timers.push(
      setTimeout(() => {
        onComplete()
      }, 400 + lines.length * 500 + 1400)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Background panels that split apart on exit */}
      <motion.div
        className="absolute inset-0 bg-background"
        animate={isExiting ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-foreground/[0.03]"
        animate={isExiting ? { clipPath: "inset(100% 0 0 0)" } : { clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 w-full">
        <div className="space-y-2">
          {lines.map((line, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div
                className={`text-4xl md:text-6xl lg:text-7xl font-light ${line.color}`}
                initial={{ y: "110%", rotateX: -30 }}
                animate={
                  index < currentLine
                    ? isExiting
                      ? { y: "-110%", rotateX: 30, opacity: 0 }
                      : { y: "0%", rotateX: 0 }
                    : { y: "110%", rotateX: -30 }
                }
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: isExiting ? index * 0.05 : 0,
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Animated line */}
        <motion.div
          className="mt-8 h-[2px] bg-foreground/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={isExiting ? { scaleX: 0, originX: 1 } : { scaleX: currentLine > 0 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}
