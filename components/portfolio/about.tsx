"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const skills = [
  {
    category: "Engineering",
    items: ["React", "Next.js", "TypeScript", "Node.js", "Shopify", "GraphQL"],
  },
  {
    category: "Product",
    items: ["Discovery", "User Research", "Roadmapping", "Analytics", "A/B Testing", "SQL"],
  },
  {
    category: "Tools",
    items: ["Figma", "Linear", "Notion", "Amplitude", "GitHub", "Vercel"],
  },
]

const timeline = [
  {
    period: "Now",
    role: "Product Manager",
    company: "Building what matters",
    color: "bg-fun-coral",
    textColor: "text-fun-coral",
  },
  {
    period: "2020-2024",
    role: "Freelance Developer",
    company: "Shopify & Web Apps",
    color: "bg-fun-blue",
    textColor: "text-fun-blue",
  },
  {
    period: "2018-2020",
    role: "Software Engineer",
    company: "Various Startups",
    color: "bg-fun-green",
    textColor: "text-fun-green",
  },
]

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className="counter-number"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CountUp target={value} />
          {suffix}
        </motion.span>
      )}
    </motion.span>
  )
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={0}
      animate={isInView ? target : 0}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      onUpdate={(latest) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest as number).toString()
        }
      }}
    >
      0
    </motion.span>
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

export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 border-t border-border scroll-mt-20" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16">
          <RevealText>
            <h2 className="text-sm text-muted-foreground uppercase tracking-widest">About</h2>
          </RevealText>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          {/* Left: Bio and skills */}
          <div>
            <div className="space-y-6 text-lg leading-relaxed mb-16">
              <RevealText delay={0.1}>
                <p>
                  {"I've spent the last 6+ years building software—from e-commerce storefronts to complex web applications. As a Shopify developer and freelancer, I shipped dozens of projects and learned what separates products that succeed from those that don't."}
                </p>
              </RevealText>
              <RevealText delay={0.2}>
                <p className="text-muted-foreground">
                  {"That experience led me to product management, where I now focus on understanding user problems deeply before writing a single line of code. My engineering background means I can speak both languages—translating user needs into technical requirements and vice versa."}
                </p>
              </RevealText>
              <RevealText delay={0.3}>
                <p className="text-muted-foreground">
                  {"I'm particularly interested in developer tools, B2B SaaS, and anything that makes complex systems more accessible."}
                </p>
              </RevealText>
            </div>

            {/* Skills with staggered reveal */}
            <div className="space-y-10">
              <RevealText delay={0.1}>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest">Skills & Tools</h3>
              </RevealText>
              {skills.map((skillGroup, groupIndex) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + groupIndex * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h4 className="text-sm font-medium mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        className="px-4 py-2 rounded-full bg-secondary text-sm hover:bg-fun-coral hover:text-background transition-all duration-300 cursor-default hover:scale-105"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + groupIndex * 0.15 + itemIndex * 0.04,
                        }}
                        whileHover={{
                          y: -2,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div>
            <RevealText delay={0.2}>
              <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-8">Experience</h3>
            </RevealText>

            <div className="relative">
              {/* Animated line */}
              <motion.div
                className="absolute left-[3px] top-2 w-[2px] bg-border origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "calc(100% - 16px)" }}
              />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-5 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full ${item.color} mt-2 shrink-0 relative z-10`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.8 + index * 0.2,
                        type: "spring",
                        stiffness: 300,
                      }}
                    />
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{item.period}</div>
                      <div className={`font-medium ${item.textColor}`}>{item.role}</div>
                      <div className="text-sm text-muted-foreground">{item.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick stats with animated counters */}
            <motion.div
              className="mt-16 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-medium text-fun-coral">
                    <AnimatedCounter value={6} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Years building</div>
                </div>
                <div>
                  <div className="text-3xl font-medium text-fun-blue">
                    <AnimatedCounter value={40} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Projects shipped</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
