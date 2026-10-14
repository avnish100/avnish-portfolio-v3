"use client"

import { FadeIn } from "./fade-in"

const timeline = [
  { period: "2023–Now", role: "Software Engineer — Deloitte" },
  { period: "2023", role: "Software Engineer — Zebra Technologies" },
]

const skills = [
  "Product discovery", "Experimentation", "Python", "SQL", "React",
  "Next.js", "TypeScript", "Node.js", "GraphQL",
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
          <p className="mb-10 max-w-2xl font-serif text-xl italic leading-relaxed tracking-tight md:text-2xl">
            I like problems that start with an unclear question and end with a
            shipped change, a useful answer, or a better decision.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mb-10 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
            My work sits between engineering, data, and product. I spend time
            clarifying what success means, understanding the tradeoffs, and
            making the result useful to the people who need to act on it.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="space-y-2.5 text-[13px] mb-10">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-muted-foreground/60 w-24 shrink-0 tabular-nums">{item.period}</span>
                <span className="font-medium">{item.role}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
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
