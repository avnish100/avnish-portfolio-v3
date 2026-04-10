"use client"

import { FadeIn } from "./fade-in"

export function Hero() {
  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl italic tracking-tight">
            Avnish Jha
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
            Software developer interested in how the things on our screens actually work.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
