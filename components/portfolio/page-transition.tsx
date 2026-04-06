"use client"

import { useEffect, useState, createContext, useContext, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

interface TransitionContextType {
  isTransitioning: boolean
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  navigateTo: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetHref, setTargetHref] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = useCallback((href: string) => {
    if (href === pathname) return
    setIsTransitioning(true)
    setTargetHref(href)
  }, [pathname])

  useEffect(() => {
    if (isTransitioning && targetHref) {
      const timeout = setTimeout(() => {
        router.push(targetHref)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isTransitioning, targetHref, router])

  // Reset transition state when pathname changes
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setTargetHref(null)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigateTo }}>
      {/* Transition overlay */}
      <div 
        className={`fixed inset-0 z-[100] pointer-events-none transition-transform duration-500 ease-in-out ${
          isTransitioning ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-fun-coral" />
        <div className="absolute inset-0 bg-fun-blue translate-y-1/3" />
        <div className="absolute inset-0 bg-fun-green translate-y-2/3" />
      </div>
      
      {/* Page content with exit animation */}
      <div className={`transition-all duration-400 ease-out ${
        isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}>
        {children}
      </div>
    </TransitionContext.Provider>
  )
}

// Transition Link component
interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const { navigateTo } = usePageTransition()
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow normal behavior for external links or anchor links
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
      return
    }
    e.preventDefault()
    navigateTo(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
