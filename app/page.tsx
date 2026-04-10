import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { Work } from "@/components/portfolio/work"
import { BlogPreview } from "@/components/portfolio/blog-preview"
import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Work />
      <BlogPreview />
      <About />
      <Contact />
    </main>
  )
}
