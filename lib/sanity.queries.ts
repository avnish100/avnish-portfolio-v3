import { hasSanityConfig, sanityClient } from "./sanity.client"
import { projects, type Project } from "./projects"

const projectListQuery = `*[_type == "project" && featured != false] | order(order asc, year desc) {
  "slug": slug.current, title, "subtitle": coalesce(subtitle, summary), "description": summary, category,
  "tags": coalesce(technologies, services, []), year: string(year), duration, client, role,
  "color": coalesce(accent, "bg-fun-coral"), "heroImage": cover.asset->url, "links": externalLinks[]{label, "href": url},
  "showcase": media[]{"src": coalesce(image.asset->url, video.asset->url, embedUrl), "type": kind, caption}
}`

const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  "slug": slug.current, title, "subtitle": coalesce(subtitle, summary), "description": summary, category,
  "tags": coalesce(technologies, services, []), year: string(year), duration, client, role,
  "color": coalesce(accent, "bg-fun-coral"), "heroImage": cover.asset->url, "links": externalLinks[]{label, "href": url},
  "showcase": media[]{"src": coalesce(image.asset->url, video.asset->url, embedUrl), "type": kind, caption}, body
}`

export async function getProjects(): Promise<Project[]> {
  if (!hasSanityConfig) return projects
  try { return await sanityClient.fetch<Project[]>(projectListQuery, {}, { next: { revalidate: 60 } }) } catch { return projects }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const fallback = projects.find((project) => project.slug === slug)
  if (!hasSanityConfig) return fallback
  try {
    const project = await sanityClient.fetch<Omit<Project, "content"> | null>(projectQuery, { slug }, { next: { revalidate: 60 } })
    return project ? { ...project, content: fallback?.content ?? [{ type: "text", content: project.description }] } : fallback
  } catch { return fallback }
}
