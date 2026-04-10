import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { ThemeToggle } from "@/components/portfolio/theme-toggle"

export const metadata = {
  title: "Writing | Avnish Jha",
  description: "Writing about engineering, product management, and building software.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen">
      <header className="z-50 nav-glass">
        <div className="px-6 h-11 flex items-center gap-6">
          <Link href="/" className="font-serif text-lg italic tracking-tight">
            AJ
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/#work" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline">Work</Link>
            <Link href="/blog" className="text-[13px] text-foreground link-underline">Blog</Link>
            <Link href="/#about" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline">About</Link>
            <Link href="/#contact" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline">Contact</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Writing
          </h1>

          <div className="divide-y divide-border">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-medium text-[15px] group-hover:text-fun-coral transition-colors link-underline">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-1 leading-relaxed tracking-[0.01em]">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-x-1 mt-2">
                      {post.tags.map((tag, i) => (
                        <span key={tag} className="flex items-center gap-1">
                          <span className="text-[11px] text-muted-foreground/70 tracking-wide">
                            {tag}
                          </span>
                          {i < post.tags.length - 1 && (
                            <span
                              className="text-muted-foreground/40 dot-separator text-[11px]"
                              style={{ animationDelay: `${i * 0.4}s` }}
                            >
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <time className="shrink-0 text-[13px] text-muted-foreground/60 tabular-nums">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
