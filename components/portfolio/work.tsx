"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TransitionLink } from "./page-transition"
import { projects } from "@/lib/projects"
import { useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXVal = ((y - centerY) / centerY) * -8
    const rotateYVal = ((x - centerX) / centerX) * 8
    setRotateX(rotateXVal)
    setRotateY(rotateYVal)
  }, [])

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
    >
      {children}
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        className="group block"
        data-cursor="View"
      >
        <TiltCard>
          <article>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-secondary">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute top-4 right-4 p-2.5 rounded-full ${project.color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50`}>
                <ArrowUpRight className="w-4 h-4 text-background" />
              </div>
              {/* Category badge */}
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.color} text-background backdrop-blur-sm`}>
                  {project.category === "case-study" ? "Case Study" :
                   project.category === "project" ? "Project" :
                   project.category === "experiment" ? "Experiment" : "Writing"}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg mb-1 group-hover:text-fun-coral transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
              <motion.span
                className="text-sm text-muted-foreground shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                {project.year}
              </motion.span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-fun-coral/30 group-hover:text-foreground transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + tagIndex * 0.05 + 0.3 }}
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2.5 py-1 text-muted-foreground">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </article>
        </TiltCard>
      </TransitionLink>
    </motion.div>
  )
}

export function Work() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="work" className="py-24 border-t border-border" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading with reveal */}
        <div ref={headingRef} className="flex items-center justify-between mb-16">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isHeadingInView ? { opacity: 1 } : {}}
          >
            <motion.h2
              className="text-sm text-muted-foreground uppercase tracking-widest"
              initial={{ y: 30 }}
              animate={isHeadingInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Selected work
            </motion.h2>
          </motion.div>
          <motion.span
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {projects.length} projects
          </motion.span>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
