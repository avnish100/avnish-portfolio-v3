"use client"

import { FadeIn } from "./fade-in"

const timeline = [
  { period: "2023–Now", role: "Software Engineer — Deloitte" },
  { period: "2023", role: "Software Engineer — Zebra Technologies" },
]

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "Python",
  "TailwindCSS", "GraphQL", "SQL", "Git",
]

export function About() {
  return (
    <section id="about" className="py-16 border-t border-border scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            About
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-2.5 text-[13px] mb-10">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-muted-foreground/60 w-24 shrink-0 tabular-nums">{item.period}</span>
                <span className="font-medium">{item.role}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-[13px] text-muted-foreground/70 flex flex-wrap items-center gap-x-1">
            {skills.map((skill, i) => (
              <span key={skill} className="flex items-center gap-1">
                <span>{skill}</span>
                {i < skills.length - 1 && (
                  <span
                    className="dot-separator"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
