export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string; level?: 2 | 3 | 4 }
  | { type: "image"; src: string; alt: string; caption?: string; fullWidth?: boolean }
  | { type: "gallery"; images: Array<{ src: string; alt: string }> }
  | { type: "stats"; items: Array<{ label: string; value: string }> }
  | { type: "quote"; content: string; author?: string; role?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title: string; content: string; variant?: "info" | "success" | "warning" }
  | { type: "video"; src: string; poster?: string }
  | { type: "code"; content: string; language?: string }
  | { type: "divider" }
  | { type: "spacer"; size?: "sm" | "md" | "lg" }
  | { type: "columns"; columns: ContentBlock[][] }
  | { type: "link-card"; title: string; description: string; href: string; external?: boolean }

export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  category: "case-study" | "project" | "experiment" | "writing"
  tags: string[]
  color: string
  heroImage: string
  client?: string
  role?: string
  year: string
  duration?: string
  team?: string[]
  links?: Array<{ label: string; href: string }>
  showcase?: Array<{
    src: string
    type: "image" | "video"
    caption?: string
  }>
  content: ContentBlock[]
}

export const projects: Project[] = [
  {
    slug: "letterboxd-rss",
    title: "Letterboxd RSS Service",
    subtitle: "RSS feed service for Letterboxd data",
    description: "A simple service to pull RSS data from Letterboxd. Perfect for personal websites and automations.",
    category: "project",
    tags: ["Node.js", "Express", "RSS"],
    color: "bg-fun-coral",
    heroImage: "/projects/letterboxd-rss.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/avnish100/letterboxd-rss" }
    ],
    showcase: [
      { src: "/projects/letterboxd-rss.jpg", type: "image" },
    ],
    content: [
      { type: "heading", content: "What it does", level: 2 },
      { type: "text", content: "Letterboxd doesn't offer a public API, but it does expose RSS feeds. This service wraps those feeds into a clean JSON API you can consume from any website or automation tool." },
      { type: "heading", content: "How it works", level: 2 },
      { type: "list", items: [
        "Fetches and parses Letterboxd RSS feeds for any public user",
        "Returns structured JSON with film title, rating, review, and poster data",
        "Lightweight Express server with caching to avoid hammering Letterboxd",
        "Easy to self-host or deploy to any Node.js platform"
      ]},
      { type: "heading", content: "Why I built it", level: 2 },
      { type: "text", content: "I wanted to show my recent watches on my personal site. The existing solutions were either over-engineered or unreliable. This does one thing well — pulls your Letterboxd activity into a format you can use anywhere." },
      { type: "link-card", title: "View on GitHub", description: "Source code and setup instructions", href: "https://github.com/avnish100/letterboxd-rss", external: true }
    ]
  },
  {
    slug: "financial-analyst-agent",
    title: "Multi Agent Financial Analyst",
    subtitle: "AI-powered financial analysis using multiple agents",
    description: "Proof of concept for a multi-agent financial analyst that gives quick summaries of financial data.",
    category: "experiment",
    tags: ["Python", "AI Agents", "Finance"],
    color: "bg-fun-blue",
    heroImage: "/projects/financial-agent.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/avnish100/financial-analyst-agent" }
    ],
    showcase: [
      { src: "/projects/financial-agent.jpg", type: "image" },
    ],
    content: [
      { type: "heading", content: "The idea", level: 2 },
      { type: "text", content: "Financial analysis involves pulling data from multiple sources, running calculations, and synthesizing it into something actionable. This project explores whether multiple AI agents, each specialized in a different task, can collaborate to produce useful financial summaries." },
      { type: "heading", content: "Architecture", level: 2 },
      { type: "list", items: [
        "Multiple specialized agents handling different aspects of analysis",
        "Agents communicate and share context to build a complete picture",
        "Python-based with a focus on quick, readable summaries",
        "Designed as a proof of concept to explore multi-agent patterns"
      ]},
      { type: "callout", title: "Proof of Concept", content: "This is an exploration of multi-agent architectures, not a production financial tool. The goal was to learn how agents can be composed together effectively.", variant: "info" },
      { type: "link-card", title: "View on GitHub", description: "Source code and documentation", href: "https://github.com/avnish100/financial-analyst-agent", external: true }
    ]
  },
  {
    slug: "bel-bullets",
    title: "BEL Bullets",
    subtitle: "Website for a running community",
    description: "Website for BEL Bullets — a running community. Built with Next.js and TailwindCSS.",
    category: "project",
    tags: ["Next.js", "TailwindCSS"],
    color: "bg-fun-green",
    heroImage: "/projects/belbullets.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "Live Site", href: "https://belbullets.run/" },
      { label: "GitHub", href: "https://github.com/avnish100/belbullets-website" }
    ],
    showcase: [
      { src: "/projects/belbullets.jpg", type: "image" },
    ],
    content: [
      { type: "heading", content: "About the project", level: 2 },
      { type: "text", content: "BEL Bullets is a running community that needed a web presence. I built them a clean, fast site using Next.js and TailwindCSS that serves as their main hub for information and community updates." },
      { type: "heading", content: "Technical details", level: 2 },
      { type: "list", items: [
        "Built with Next.js for static generation and fast page loads",
        "Styled with TailwindCSS for a responsive, clean design",
        "Optimized for mobile since most runners check on their phones",
        "Deployed and live at belbullets.run"
      ]},
      { type: "link-card", title: "Visit BEL Bullets", description: "See the live site", href: "https://belbullets.run/", external: true }
    ]
  },
  {
    slug: "the-altarasa",
    title: "The Altarasa",
    subtitle: "Custom Shopify store for a brand",
    description: "A fully customized Shopify store built on the Dawn theme with custom features like wishlists, product bundles, bookmarks, and a mobile-first navigation experience.",
    category: "project",
    tags: ["Shopify", "Liquid", "JavaScript", "Vercel"],
    color: "bg-fun-yellow",
    heroImage: "/projects/designsystem.jpg",
    client: "The Altarasa",
    role: "Developer",
    year: "2025",
    links: [
      { label: "Live Site", href: "https://thealtarasa.com" }
    ],
    showcase: [
      { src: "/projects/designsystem.jpg", type: "image" },
      { src: "/projects/aiwriter.jpg", type: "image" },
      { src: "/projects/ecommerce.jpg", type: "image" },
      {src: "/projects/taskmanager.jpg", type:"image"}
    ],
    content: [
      { type: "heading", content: "About the project", level: 2 },
      { type: "text", content: "Built a fully customized Shopify storefront for The Altarasa from the ground up using Shopify's Dawn theme as a base. The store needed to go well beyond a standard template — with custom interactive features, mobile-first UX, and serverless backend integrations." },
      { type: "heading", content: "Custom features", level: 2 },
      { type: "list", items: [
        "WhatsApp chat integration with pre-filled messages and price inquiry support",
        "Sticky mobile navigation bar with quick access to key store areas",
        "Article bookmarks system with a serverless Vercel backend for persistence",
        "Wishlist feature for saving favorite products",
        "Product bundles for curated multi-item offers",
        "Promotional popups and sticky information bar",
        "Expert/team section and flexi layout system for rich content pages",
        "Social sharing across product and article pages"
      ]},
      { type: "heading", content: "Technical highlights", level: 2 },
      { type: "list", items: [
        "Customized Shopify Dawn theme using Liquid, JavaScript, and CSS",
        "Serverless backend on Vercel for the bookmarks system",
        "Mobile-first design with a bottom tab bar navigation",
        "Fully configurable via Shopify's theme editor — no code changes needed for the client"
      ]},
      { type: "link-card", title: "Visit The Altarasa", description: "See the live store", href: "https://thealtarasa.in", external: true }
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug)
}
