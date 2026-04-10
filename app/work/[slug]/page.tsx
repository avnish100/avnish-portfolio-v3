import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import { ContentRenderer } from "@/components/portfolio/content-renderer"
import { Filmstrip } from "@/components/portfolio/filmstrip"
import { ThemeToggle } from "@/components/portfolio/theme-toggle"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Avnish Jha`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const categoryLabels = {
    "case-study": "Case Study",
    "project": "Project",
    "experiment": "Experiment",
    "writing": "Writing"
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="z-50 nav-glass">
        <div className="px-6 h-11 flex items-center gap-6">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Work
          </Link>
          {project.links && project.links.length > 0 && (
            <div className="flex items-center gap-4 ml-auto">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
          <ThemeToggle className={project.links && project.links.length > 0 ? "" : "ml-auto"} />
        </div>
      </header>

      <article className="pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground/60 mb-5 tracking-[0.02em]">
            <span>{categoryLabels[project.category]}</span>
            <span className="dot-separator">·</span>
            <span className="tabular-nums">{project.year}</span>
            {project.duration && (
              <>
                <span className="dot-separator">·</span>
                <span>{project.duration}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl italic tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-[15px] text-muted-foreground/70 mb-8 leading-relaxed tracking-[0.01em]">
            {project.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-x-1 mb-12">
            {project.tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-1">
                <span className="text-[11px] text-muted-foreground/70 tracking-wide">
                  {tag}
                </span>
                {i < project.tags.length - 1 && (
                  <span className="text-muted-foreground/40 dot-separator text-[11px]" style={{ animationDelay: `${i * 0.4}s` }}>·</span>
                )}
              </span>
            ))}
          </div>

        </div>

        {project.showcase && project.showcase.length > 0 && (
          <Filmstrip items={project.showcase} title={project.title} />
        )}

        <div className="mx-auto max-w-3xl px-6">
          {/* Sidebar info */}
          {(project.client || project.role) && (
            <div className="flex gap-8 text-[13px] mb-12 pb-8 border-b border-border">
              {project.client && (
                <div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/50 block mb-1">Client</span>
                  <span className="font-medium">{project.client}</span>
                </div>
              )}
              {project.role && (
                <div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/50 block mb-1">Role</span>
                  <span className="font-medium">{project.role}</span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            <ContentRenderer blocks={project.content} />
          </div>

          {/* Back link */}
          <div className="mt-16 pt-6 border-t border-border">
            <Link
              href="/#work"
              className="text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors link-underline"
            >
              Back to all work
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
