"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Preloader } from "./preloader"
import { PageTransitionProvider } from "./page-transition"
import { SmoothScroll } from "./smooth-scroll"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showPreloader, setShowPreloader] = useState(true)
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
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <SmoothScroll>
        <PageTransitionProvider>
          <div className="gradient-mesh">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>

          <motion.div
            initial={showPreloader ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: showPreloader ? 0 : 1 }}
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
