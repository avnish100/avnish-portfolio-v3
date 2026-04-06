"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

interface TypewriterProps {
  text: string
  delay?: number
  onComplete?: () => void
}

function Typewriter({ text, delay = 30, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, delay, text, onComplete])

  return <>{displayedText}</>
}

export function Hero() {
  const [phase, setPhase] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (phase >= 7) {
      const timeout = setTimeout(() => setShowCursor(false), 1500)
      return () => clearTimeout(timeout)
    }
  }, [phase])

  const segments = [
    { text: "Software engineer turned ", color: null },
    { text: "product manager", color: "text-fun-coral" },
    { text: ". I bridge the gap between ", color: null },
    { text: "technical execution", color: "text-fun-blue" },
    { text: " and ", color: null },
    { text: "product strategy", color: "text-fun-green" },
    { text: ".", color: null },
  ]

  const subtitleWords = "Ex-Shopify Developer / Freelance / Now PM".split(" ")

  return (
    <motion.section
      ref={containerRef}
      className="min-h-[90vh] flex items-center pt-24 pb-16 relative"
      style={{ y, opacity }}
    >
      <div className="mx-auto max-w-6xl px-6 w-full relative z-10">
        {/* Animated subtitle - word by word */}
        <div className="mb-4 flex flex-wrap gap-x-2">
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              className="text-muted-foreground inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Main heading with typewriter */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-normal leading-relaxed max-w-4xl text-balance"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {segments.map((segment, index) => {
            if (index > phase) return null
            const isCurrentSegment = index === phase
            const className = segment.color ? `${segment.color} font-medium` : ""
            return (
              <span key={index} className={className}>
                {isCurrentSegment ? (
                  <Typewriter
                    text={segment.text}
                    delay={25}
                    onComplete={() => setPhase(prev => prev + 1)}
                  />
                ) : (
                  segment.text
                )}
              </span>
            )
          })}
          <span
            className={`inline-block w-[2px] h-[1em] bg-fun-coral ml-1 align-middle transition-opacity duration-100 ${
              showCursor && phase < 7 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 7 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 text-base border-foreground/20 hover:bg-foreground hover:text-background transition-all"
            asChild
          >
            <Link href="#work">View Work</Link>
          </Button>
          <Button
            variant="ghost"
            className="rounded-full px-8 py-6 text-base hover:bg-secondary transition-all"
            asChild
          >
            <Link href="#about">About Me</Link>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={phase >= 7 ? { opacity: 0.5 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-[1px] h-6 bg-foreground/20 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
