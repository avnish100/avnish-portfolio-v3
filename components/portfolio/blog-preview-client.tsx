"use client"

import Link from "next/link"
import { FadeIn } from "./fade-in"

interface Post {
  slug: string
  title: string
  description: string
  date: string
}

export function BlogPreviewClient({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" className="py-16 border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Writing
            </h2>
            <Link
              href="/blog"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              All posts
            </Link>
          </div>
        </FadeIn>

        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium text-[15px] group-hover:text-fun-coral transition-colors link-underline">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-1 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <time className="shrink-0 text-[13px] text-muted-foreground/60 tabular-nums">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
