"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Shopify", "GraphQL",
  "Product Discovery", "User Research", "Roadmapping", "Analytics",
  "A/B Testing", "SQL", "Figma", "Linear", "Notion", "Amplitude",
  "GitHub", "Vercel", "System Design", "CI/CD",
]

export function Marquee() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const x2 = useTransform(scrollYProgress, [0, 1], [-150, 0])

  const renderSkills = () =>
    [...skills, ...skills].map((skill, i) => (
      <span
        key={`${skill}-${i}`}
        className="text-2xl md:text-4xl lg:text-5xl font-light whitespace-nowrap px-4 md:px-8 text-foreground/10 hover:text-foreground/30 transition-colors duration-500"
      >
        {skill}
        <span className="mx-3 md:mx-6 text-foreground/5 select-none">·</span>
      </span>
    ))

  return (
    <section ref={containerRef} className="py-12 overflow-hidden border-t border-border">
      <motion.div className="marquee-track" style={{ x: x1 }}>
        {renderSkills()}
      </motion.div>
      <motion.div className="marquee-track mt-3" style={{ x: x2 }}>
        {renderSkills()}
      </motion.div>
    </section>
  )
}
