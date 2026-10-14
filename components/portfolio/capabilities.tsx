"use client"

import { FadeIn } from "./fade-in"

const capabilities = [
  {
    title: "Data science",
    description: "Models and analysis that make uncertainty easier to reason about.",
  },
  {
    title: "Product analytics",
    description: "Measurement, funnels, and experiments tied to an actual decision.",
  },
  {
    title: "Product engineering",
    description: "Useful, maintainable experiences built from idea through delivery.",
  },
]

const process = ["Frame the question", "Define success", "Build the smallest useful thing", "Learn and iterate"]

export function Capabilities() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="eyebrow mb-8">What I do</p>
        </FadeIn>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {capabilities.map((capability, index) => (
            <FadeIn key={capability.title} delay={index * 0.06}>
              <div className="h-full bg-background p-6">
                <h2 className="text-[15px] font-medium">{capability.title}</h2>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-[12px] text-muted-foreground">
            {process.map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span>{step}</span>
                {index < process.length - 1 && <span aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
