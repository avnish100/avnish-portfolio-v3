"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Preloader } from "./preloader"
import { IntroOverlay } from "./intro-overlay"
import { PageTransitionProvider } from "./page-transition"
import { SmoothScroll } from "./smooth-scroll"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showPreloader, setShowPreloader] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    if (pathname !== "/") {
      setShowPreloader(false)
    }
  }, [pathname])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
    if (pathname === "/" && !hasSeenIntro) {
      setShowIntro(true)
    }
  }

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true")
    setShowIntro(false)
  }

  if (!mounted) {
    return null
  }

  const isLoading = showPreloader || showIntro

  return (
    <>
      {/* Preloader — rendered outside all wrappers so fixed positioning works */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Intro overlay — also outside wrappers */}
      <AnimatePresence>
        {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <SmoothScroll>
        <PageTransitionProvider>
          {/* Animated gradient mesh background */}
          <div className="gradient-mesh">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>

          {/* Main content */}
          <motion.div
            initial={isLoading ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>

          {/* Noise overlay */}
          <div className="noise-overlay" />
        </PageTransitionProvider>
      </SmoothScroll>
    </>
  )
}
