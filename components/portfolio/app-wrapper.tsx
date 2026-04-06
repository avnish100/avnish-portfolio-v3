"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { IntroOverlay } from "./intro-overlay"
import { PageTransitionProvider } from "./page-transition"
import { SmoothScroll } from "./smooth-scroll"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showIntro, setShowIntro] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    // Only show intro on homepage and if not already shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
    if (pathname !== "/" || hasSeenIntro) {
      setShowIntro(false)
    }
  }, [pathname])

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true")
    setShowIntro(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <SmoothScroll>
      <PageTransitionProvider>
        {/* Animated gradient mesh background */}
        <div className="gradient-mesh">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        {/* Intro overlay */}
        <AnimatePresence>
          {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
        </AnimatePresence>

        {/* Main content */}
        <motion.div
          initial={showIntro ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>

        {/* Noise overlay */}
        <div className="noise-overlay" />
      </PageTransitionProvider>
    </SmoothScroll>
  )
}
