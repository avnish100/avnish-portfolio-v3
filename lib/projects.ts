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
  body?: unknown[]
  content: ContentBlock[]
}

export const projects: Project[] = [
  {
    slug: "job-tracker-extension",
    title: "Job Tracker Extension",
    subtitle: "A browser extension that turns job listings into structured Excel rows",
    description: "A product case study for reducing the repetitive work of tracking applications while keeping the spreadsheet people already use.",
    category: "case-study",
    tags: ["Product Discovery", "Browser Extension", "Excel", "Workflow Design"],
    color: "bg-fun-yellow",
    heroImage: "",
    role: "Solo PM / Builder",
    year: "2026",
    content: [
      { type: "callout", title: "Product principle", content: "The extension should remove administrative work without asking candidates to abandon the Excel workflow they already understand and control.", variant: "success" },
      { type: "heading", content: "The problem", level: 2 },
      { type: "text", content: "Job discovery happens in the browser, but tracking usually happens somewhere else. Every application creates a small copy-and-paste task, and those small tasks compound during an already demanding search." },
      { type: "heading", content: "Pain points", level: 2 },
      { type: "list", items: [
        "Re-entering the company, role, location, URL, and application date for every listing",
        "Switching between a job board, application form, and spreadsheet breaks focus",
        "Inconsistent row formats make the sheet harder to filter and review",
        "Duplicate listings are easy to save when the same role appears on several boards",
        "Application status and follow-up dates become stale after the initial entry",
        "A long list of rows does not clearly show where the job-search funnel is breaking"
      ]},
      { type: "heading", content: "The product bet", level: 2 },
      { type: "text", content: "If a candidate can capture a listing at the moment they decide it is worth pursuing, with the important fields already extracted, they will maintain a more complete and useful record with less effort." },
      { type: "heading", content: "Pain point → feature", level: 2 },
      { type: "columns", columns: [
        [
          { type: "heading", content: "Repetitive data entry", level: 3 },
          { type: "text", content: "Extract company, title, location, source URL, and date from the active listing, then show a preview before saving." },
          { type: "heading", content: "Messy spreadsheet rows", level: 3 },
          { type: "text", content: "Map captured information into a stable Excel table schema with normalized dates and statuses." },
          { type: "heading", content: "Duplicate applications", level: 3 },
          { type: "text", content: "Check the workbook for the same company, role, or listing URL before creating a new row." }
        ],
        [
          { type: "heading", content: "Lost follow-ups", level: 3 },
          { type: "text", content: "Let candidates set a next-action date while saving and surface applications that need attention." },
          { type: "heading", content: "Stale statuses", level: 3 },
          { type: "text", content: "Provide a small extension view for moving an application through saved, applied, interviewing, offer, and closed." },
          { type: "heading", content: "No funnel visibility", level: 3 },
          { type: "text", content: "Summarize applications, response rate, stage conversion, and time in stage from the same workbook data." }
        ]
      ]},
      { type: "heading", content: "MVP scope", level: 2 },
      { type: "list", ordered: true, items: [
        "Connect one Excel workbook and select the destination table",
        "Capture the active listing and allow the candidate to correct extracted fields",
        "Append a normalized row with a default status and application date",
        "Warn about likely duplicates before saving",
        "Confirm success and link directly to the new spreadsheet row"
      ]},
      { type: "callout", title: "What I would not build first", content: "A proprietary job database, résumé generator, social network, or full CRM. Those ideas increase scope before the core capture-to-Excel workflow has proved useful.", variant: "warning" },
      { type: "heading", content: "Success measures", level: 2 },
      { type: "list", items: [
        "Activation: a connected user successfully saves their first listing",
        "Core value: percentage of captured listings saved without manual re-entry",
        "Reliability: extraction and Excel-write success rates by job board",
        "Retention: candidates who save or update applications in later weeks",
        "Quality signal: duplicate warnings accepted and fields corrected before save"
      ]},
      { type: "heading", content: "Tradeoffs", level: 2 },
      { type: "text", content: "Automatic extraction makes the workflow fast, but job boards use inconsistent markup and change frequently. A preview step adds one click, yet preserves trust by letting the user correct mistakes before anything reaches their workbook. Excel also limits the experience compared with a custom backend, but it gives users ownership, portability, and an immediately familiar data model." },
      { type: "heading", content: "Next experiments", level: 2 },
      { type: "list", items: [
        "Test whether candidates prefer one-click capture or a short editable preview",
        "Measure which extracted fields are corrected most often and improve those parsers first",
        "Compare follow-up reminders with a simple overdue view before building notifications",
        "Interview users who stop updating statuses to learn whether the problem is friction or low perceived value"
      ]}
    ]
  },
  {
    slug: "markov-chains-heavy-tails",
    title: "Markov Chains & Heavy Tails",
    subtitle: "Modeling repeat behavior and rare, high-impact outcomes",
    description: "An in-progress case study on using state transitions and heavy-tail distributions to reason about risk beyond the average.",
    category: "case-study",
    tags: ["Python", "Probability", "Markov Chains", "Heavy-Tail Analysis"],
    color: "bg-fun-coral",
    heroImage: "",
    role: "Data Scientist",
    year: "2026",
    content: [
      { type: "callout", title: "Case study in progress", content: "This is a placeholder for the full analysis. The final version will include the dataset, assumptions, evaluation, and decision implications.", variant: "info" },
      { type: "heading", content: "The question", level: 2 },
      { type: "text", content: "Averages can make a system look predictable even when a small number of extreme events drive most of the outcome. This study asks how state transitions and heavy-tail behavior can produce a more decision-useful picture of that risk." },
      { type: "heading", content: "Working hypothesis", level: 2 },
      { type: "text", content: "Modeling how observations move between states—and treating extreme values as a feature rather than noise—should reveal patterns that a single aggregate forecast misses." },
      { type: "heading", content: "Planned approach", level: 2 },
      { type: "list", items: [
        "Define meaningful states and estimate transition probabilities",
        "Test whether the observed tail is better explained by power-law or alternative distributions",
        "Compare results with a simpler baseline model",
        "Translate model behavior into thresholds and decisions a stakeholder could use"
      ]},
      { type: "heading", content: "Product notes", level: 2 },
      { type: "text", content: "The goal is not to use a sophisticated model for its own sake. The final case will explain when the added complexity changes a decision, when a simpler baseline is enough, and how uncertainty should be communicated." }
    ]
  },
  {
    slug: "advanced-ml",
    title: "Advanced ML, Applied Deliberately",
    subtitle: "Choosing model complexity only when the problem earns it",
    description: "An in-progress machine-learning case study focused on baselines, model selection, interpretability, and production tradeoffs.",
    category: "case-study",
    tags: ["Python", "Machine Learning", "Model Evaluation", "Explainability"],
    color: "bg-fun-blue",
    heroImage: "",
    role: "Machine Learning Engineer",
    year: "2026",
    content: [
      { type: "callout", title: "Case study in progress", content: "This placeholder defines the story and evaluation plan. Results and model claims will be added only after the experiment is complete.", variant: "info" },
      { type: "heading", content: "The problem", level: 2 },
      { type: "text", content: "The case begins with a prediction problem where a transparent baseline establishes the minimum useful performance. More advanced methods are introduced only if they create a meaningful improvement." },
      { type: "heading", content: "How it will be evaluated", level: 2 },
      { type: "list", items: [
        "Start with a simple, explainable baseline",
        "Select metrics based on the cost of different errors",
        "Compare performance, inference cost, interpretability, and maintenance burden",
        "Document feature importance, failure modes, drift, and monitoring needs"
      ]},
      { type: "heading", content: "The decision", level: 2 },
      { type: "text", content: "The final recommendation will answer a product question, not just report a score: is the incremental model quality worth the additional operational and interpretability cost?" },
      { type: "heading", content: "What comes next", level: 2 },
      { type: "text", content: "Add the real dataset, baseline results, candidate models, error analysis, and a concise deployment recommendation." }
    ]
  },
  {
    slug: "marketing-analytics",
    title: "Marketing Analytics",
    subtitle: "Connecting acquisition activity to retained value",
    description: "An in-progress measurement case study spanning funnels, cohorts, attribution, and experiments that inform budget decisions.",
    category: "case-study",
    tags: ["SQL", "Cohort Analysis", "Experimentation", "Attribution"],
    color: "bg-fun-green",
    heroImage: "",
    role: "Product Analyst",
    year: "2026",
    content: [
      { type: "callout", title: "Case study in progress", content: "This is a placeholder structure. Real campaign data, findings, and impact will replace the examples when the analysis is ready.", variant: "info" },
      { type: "heading", content: "The business question", level: 2 },
      { type: "text", content: "Which acquisition efforts create durable customer value, and which only make the top of the funnel look busy? The analysis is designed around the budget or product decision it needs to support." },
      { type: "heading", content: "Measurement plan", level: 2 },
      { type: "list", items: [
        "Define the acquisition-to-retention funnel and its decision points",
        "Compare channel cohorts using activation, retention, and value—not signups alone",
        "Document attribution assumptions and known blind spots",
        "Propose experiments for the highest-leverage uncertainties"
      ]},
      { type: "heading", content: "Product thinking", level: 2 },
      { type: "text", content: "A useful dashboard is not the finish line. The case will show which decision each metric supports, what action a change should trigger, and which measurements can safely be left out." },
      { type: "heading", content: "What comes next", level: 2 },
      { type: "text", content: "Add the real funnel, cohort views, campaign comparison, experiment proposal, and the resulting recommendation." }
    ]
  },
  {
    slug: "letterboxd-rss",
    title: "Letterboxd RSS Service",
    subtitle: "RSS feed service for Letterboxd data",
    description: "A simple service to pull RSS data from Letterboxd. Perfect for personal websites and automations.",
    category: "project",
    tags: ["Node.js", "Express", "RSS"],
    color: "bg-fun-coral",
    heroImage: "/projects/taskmanager.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/avnish100/letterboxd-rss" }
    ],
    showcase: [
      { src: "/projects/taskmanager.jpg", type: "image" },
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
    heroImage: "/projects/aiwriter.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/avnish100/financial-analyst-agent" }
    ],
    showcase: [
      { src: "/projects/aiwriter.jpg", type: "image" },
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
    heroImage: "/projects/ecommerce.jpg",
    role: "Developer",
    year: "2024",
    links: [
      { label: "Live Site", href: "https://belbullets.run/" },
      { label: "GitHub", href: "https://github.com/avnish100/belbullets-website" }
    ],
    showcase: [
      { src: "/projects/ecommerce.jpg", type: "image" },
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
