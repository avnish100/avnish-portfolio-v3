"use client"

import Link from "next/link"
import { FadeIn } from "./fade-in"

export function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="eyebrow mb-5">Software engineering · Data · Product</p>
          <h1 className="max-w-4xl font-serif text-4xl italic tracking-[-0.045em] leading-[1.02] text-balance md:text-6xl">
            I turn ambiguous problems into useful digital products.
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            I combine software engineering, data, and product judgment to frame
            the problem, decide what matters, and ship the solution.
          </p>
        </FadeIn>
        <FadeIn delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
            <Link href="#work" className="link-underline font-medium">
              View selected work ↓
            </Link>
            <Link href="#contact" className="link-underline text-muted-foreground hover:text-foreground">
              Start a conversation
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
