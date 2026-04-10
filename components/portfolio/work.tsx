"use client"

import Link from "next/link"
import { projects } from "@/lib/projects"
import { FadeIn } from "./fade-in"

export function Work() {
  return (
    <section id="work" className="py-16 border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Selected work
          </h2>
        </FadeIn>

        <div className="divide-y divide-border">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.05}>
              <Link
                href={`/work/${project.slug}`}
                className="group block py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium text-[15px] group-hover:text-fun-coral transition-colors link-underline">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-1 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-1 mt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tag} className="flex items-center gap-1">
                          <span className="text-[11px] text-muted-foreground/70 tracking-wide">
                            {tag}
                          </span>
                          {tagIndex < project.tags.length - 1 && (
                            <span
                              className="text-muted-foreground/40 dot-separator text-[11px]"
                              style={{ animationDelay: `${tagIndex * 0.4}s` }}
                            >
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-[13px] text-muted-foreground/60 tabular-nums">
                    {project.year}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
