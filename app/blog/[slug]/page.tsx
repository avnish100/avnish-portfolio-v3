import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/portfolio/theme-toggle"
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Avnish Jha`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <header className="z-50 nav-glass">
        <div className="px-6 h-11 flex items-center gap-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Writing
          </Link>
          <Link href="/" className="font-serif text-lg italic tracking-tight ml-auto">
            AJ
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <article className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground/60 mb-5 tracking-[0.02em]">
            <time className="tabular-nums">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="dot-separator">·</span>
            <div className="flex items-center gap-1">
              {post.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-1">
                  <span>{tag}</span>
                  {i < post.tags.length - 1 && (
                    <span className="dot-separator" style={{ animationDelay: `${i * 0.4}s` }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl italic tracking-tight mb-3">
            {post.title}
          </h1>
          <p className="text-[15px] text-muted-foreground/70 mb-12 leading-relaxed tracking-[0.01em]">
            {post.description}
          </p>

          {/* MDX Content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} />
          </div>

          {/* Back link */}
          <div className="mt-16 pt-6 border-t border-border">
            <Link
              href="/blog"
              className="text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors link-underline"
            >
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
