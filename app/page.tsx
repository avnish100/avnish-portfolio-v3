import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { Capabilities } from "@/components/portfolio/capabilities"
import { Work } from "@/components/portfolio/work"
import { BlogPreview } from "@/components/portfolio/blog-preview"
import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"
import { getProjects } from "@/lib/sanity.queries"

export default async function Home() {
  const projects = await getProjects()
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Capabilities />
      <Work projects={projects} />
      <BlogPreview />
      <About />
      <Contact />
    </main>
  )
}
