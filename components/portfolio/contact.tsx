"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Copy, Check } from "lucide-react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
]

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "hello@alexchen.design"
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 border-t border-border" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <RevealText>
              <h2 className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Contact</h2>
            </RevealText>

            {/* Big animated heading */}
            <div className="space-y-2">
              {["If you'd like to discuss", "a project or just say hi,", "I'm always down to chat."].map((line, i) => (
                <RevealText key={i} delay={0.1 + i * 0.1}>
                  <p className="text-2xl md:text-3xl font-normal leading-relaxed">
                    {line}
                  </p>
                </RevealText>
              ))}
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <MagneticButton>
                <Button
                  className="rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-fun-coral transition-all duration-300"
                  data-cursor="Mail"
                  asChild
                >
                  <Link href={`mailto:${email}`}>
                    Get in Touch
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Mail</h3>
              <motion.button
                onClick={copyEmail}
                className="group flex items-center gap-3 text-lg hover:text-fun-coral transition-colors"
                data-cursor="Copy"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {email}
                {copied ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-4 h-4 text-fun-green" />
                  </motion.span>
                ) : (
                  <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Socials</h3>
              <div className="flex flex-col gap-3">
                {socials.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 hover:text-fun-coral transition-all duration-300 w-fit text-lg"
                      data-cursor="Open"
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {social.label}
                      </motion.span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-sm text-muted-foreground">
            2026. Crafted by Alex
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Imprint</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
