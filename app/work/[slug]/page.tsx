import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import { ContentRenderer } from "@/components/portfolio/content-renderer"
import { Button } from "@/components/ui/button"

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
    title: `${project.title} | Portfolio`,
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
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link 
            href="/#work" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>
          
          {project.links && project.links.length > 0 && (
            <div className="flex gap-3">
              {project.links.map((link) => (
                <Button key={link.href} variant="outline" size="sm" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.color} text-background`}>
              {categoryLabels[project.category]}
            </span>
            <span>{project.year}</span>
            {project.duration && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{project.duration}</span>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-balance">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            {project.subtitle}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-secondary text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Hero Image */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Project Meta Sidebar + Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[240px_1fr] gap-16">
            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {project.client && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Client</h3>
                  <p className="font-medium">{project.client}</p>
                </div>
              )}
              {project.role && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Role</h3>
                  <p className="font-medium">{project.role}</p>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Team</h3>
                  <ul className="space-y-1">
                    {project.team.map((member) => (
                      <li key={member} className="font-medium">{member}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
            
            {/* Content */}
            <article className="min-w-0">
              <ContentRenderer blocks={project.content} />
            </article>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-muted-foreground mb-4">Interested in working together?</p>
          <Button asChild>
            <Link href="/#contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
