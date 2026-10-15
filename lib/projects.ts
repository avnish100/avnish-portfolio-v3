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
    subtitle: "Capturing job listings in Excel without the copy-and-paste routine",
    description: "A proposal for turning Excel from a passive application log into a job-search system that captures context, preserves momentum, and helps people decide what to do next.",
    category: "case-study",
    tags: ["Product Discovery", "Browser Extension", "Excel", "Workflow Design"],
    color: "bg-fun-yellow",
    heroImage: "",
    role: "Solo PM / Builder",
    year: "2026",
    content: [
      { type: "callout", title: "The product thesis", content: "The spreadsheet is not the problem. The real problem is that the moment of discovery and the system of record live in different places. The product should close that gap without taking ownership of the user's data.", variant: "success" },
      { type: "heading", content: "A job search loses value in the handoff", level: 2 },
      { type: "text", content: "A candidate finds a role in the browser, forms an opinion about it, and then leaves that context behind to document the opportunity somewhere else. The obvious cost is repeated data entry. The more important cost is decay: useful details disappear, follow-ups slip, statuses stop reflecting reality, and the spreadsheet becomes an archive of intentions rather than a tool for making decisions." },
      { type: "text", content: "Most products respond by replacing the spreadsheet with a proprietary dashboard. That solves the vendor's data-model problem, but asks the candidate to adopt another destination during an already fragmented process. I took the opposite position: keep Excel as the durable personal layer and make the browser extension the connective tissue around it." },
      { type: "heading", content: "From form filler to decision infrastructure", level: 2 },
      { type: "text", content: "The first interaction is deliberately modest. On a listing page, the extension extracts the company, role, location, source, and date; the candidate reviews the capture; a normalized row is written to a table they control. Duplicate detection prevents the same opportunity from quietly entering twice. The value is not the saved typing by itself. It is the creation of clean, trustworthy data at the exact moment the opportunity still has context." },
      { type: "text", content: "Once that foundation is reliable, the workbook can become more than a ledger. Status changes reveal where applications stall. Time-in-stage exposes slow processes. Follow-up dates turn passive rows into commitments. Response and conversion patterns can help a candidate distinguish productive effort from activity that only feels productive." },
      { type: "heading", content: "Trust is part of the interface", level: 2 },
      { type: "text", content: "Job boards are inconsistent and their markup changes without warning, so fully automatic capture would create a fast but untrustworthy product. The editable preview is therefore not a concession; it is the trust boundary. It makes the system's interpretation visible before any data is written and creates a feedback signal about which fields and sources fail most often." },
      { type: "text", content: "The same principle governs the Excel integration. A custom backend would make richer automation easier, but it would also turn a personal job-search history into product-owned data. Writing to the user's workbook preserves portability, makes the data legible outside the extension, and gives the product a clear reason to exist without manufacturing lock-in." },
      { type: "heading", content: "The first release", level: 2 },
      { type: "text", content: "The smallest credible release connects one workbook, captures and previews one active listing, writes a normalized row, warns about likely duplicates, and links back to the saved record. Its success should be judged by whether people continue to maintain a more complete record with less correction—not by the raw number of fields extracted or notifications sent." },
      { type: "heading", content: "A larger opportunity", level: 2 },
      { type: "text", content: "The long-term opportunity is a personal decision layer for the job search: one that learns which sources produce interviews, shows where momentum is being lost, and helps candidates allocate their limited attention. That future only becomes credible if the quiet foundational work—capture quality, transparent correction, dependable writes, and user ownership—is excellent first." },
      { type: "callout", title: "Current status", content: "This is a product case study and implementation direction, not a claim of shipped outcomes. The next proof point is a working capture-to-Excel loop tested across real job boards and real search behavior.", variant: "info" }
    ]
  },
  {
    slug: "markov-chains-heavy-tails",
    title: "Markov Chains & Heavy Tails",
    subtitle: "Looking past the average to model movement, extremes, and risk",
    description: "A study of systems where history matters and rare events dominate—combining state transitions with tail analysis to make risk visible before the average becomes misleading.",
    category: "case-study",
    tags: ["Python", "Probability", "Markov Chains", "Heavy-Tail Analysis"],
    color: "bg-fun-coral",
    heroImage: "",
    role: "Data Scientist",
    year: "2026",
    content: [
      { type: "callout", title: "The premise", content: "A system can look stable in aggregate while quietly moving toward a state from which recovery is unlikely. It can also appear low-risk until one extreme event overwhelms years of ordinary behavior.", variant: "success" },
      { type: "heading", content: "The average describes neither memory nor consequence", level: 2 },
      { type: "text", content: "Many forecasts compress a changing system into a central tendency. That is useful when observations are independent and extremes are genuinely exceptional. It is dangerous when today's condition changes the probability of tomorrow's condition, or when a small number of outcomes carry most of the total cost." },
      { type: "text", content: "This study brings those two failures together. A Markov model represents the system's memory through transitions: where it tends to remain, which paths are reversible, and which states behave like traps. Heavy-tail analysis asks a different question: whether the largest observations belong to the same world as the rest of the data, or whether risk grows faster than familiar assumptions allow." },
      { type: "heading", content: "Two models, one decision surface", level: 2 },
      { type: "text", content: "The interesting work is not fitting the models independently. It is connecting them. If extreme outcomes become more likely after a particular sequence of state changes, a decision-maker needs an early-warning threshold, not merely a better estimate of the mean. If the tail is heavy but state transitions add no useful signal, the simpler intervention may be to build more resilience rather than predict the next event." },
      { type: "text", content: "That framing shifts the output from 'what will happen?' to three more useful questions: which state are we in, how easily can we leave it, and how much loss must the system be able to absorb if the rare outcome arrives?" },
      { type: "heading", content: "The analytical discipline", level: 2 },
      { type: "text", content: "States must be defined from meaningful behavior rather than convenient bins. Transition estimates need uncertainty, especially where observations are sparse. Candidate tail distributions must be compared rather than declared from a straight line on a log-log plot. Both models need a simpler baseline so that added sophistication earns its place through a changed decision." },
      { type: "heading", content: "What a useful result would look like", level: 2 },
      { type: "text", content: "A successful analysis would produce a map of risk, not a decorative model: the states that deserve attention, the transitions that signal deterioration or recovery, the plausible scale of extreme loss, and the intervention point at which waiting becomes more expensive than acting." },
      { type: "callout", title: "Current status", content: "The conceptual model is defined; the empirical case is not complete. Results will be published with the dataset, state definitions, distribution comparisons, sensitivity analysis, and the decision each result is meant to inform.", variant: "info" }
    ]
  },
  {
    slug: "advanced-ml",
    title: "Advanced ML, Applied Deliberately",
    subtitle: "Testing whether model complexity earns its operational cost",
    description: "A decision framework for choosing machine-learning complexity by the value of the errors it prevents—not by leaderboard performance alone.",
    category: "case-study",
    tags: ["Python", "Machine Learning", "Model Evaluation", "Explainability"],
    color: "bg-fun-blue",
    heroImage: "",
    role: "Machine Learning Engineer",
    year: "2026",
    content: [
      { type: "callout", title: "The governing idea", content: "The best model is not the most sophisticated one. It is the least complicated system that changes the decision enough to justify its ongoing cost.", variant: "success" },
      { type: "heading", content: "Model selection is an operating decision", level: 2 },
      { type: "text", content: "Machine-learning work is often narrated as a climb from baseline to higher score. Production systems live with a different reality. Every improvement arrives with inference cost, data dependencies, monitoring obligations, explanation burden, and new ways to fail. A model can win the benchmark and still be the wrong product choice." },
      { type: "text", content: "This case study starts by assigning value and consequence to the prediction itself. Which mistakes cause lost revenue, unfair treatment, wasted attention, or irreversible action? Which errors can be reviewed by a person, and which happen at a scale where review is impossible? Those answers determine the metric, the threshold, and eventually whether machine learning belongs in the workflow at all." },
      { type: "heading", content: "A baseline is a competing product", level: 2 },
      { type: "text", content: "The baseline is not a box to check before using a more impressive model. It is a credible alternative with advantages: it is cheaper, easier to explain, faster to debug, and often more stable under change. A complex candidate must beat it where the decision is expensive, not merely improve an average score by a small amount." },
      { type: "heading", content: "Evaluation beyond a single number", level: 2 },
      { type: "text", content: "The comparison will examine error slices, calibration, behavior on unfamiliar data, inference latency, feature availability, and sensitivity to drift. Interpretability will be treated as a product requirement rather than a post-hoc chart: can the people affected by the decision understand the relevant reason, and can the team diagnose a failure quickly enough to operate the system responsibly?" },
      { type: "text", content: "The deployment recommendation should therefore look more like an investment case than a model report. It must show the incremental value created, the infrastructure and oversight required to sustain it, the conditions under which the model should abstain, and the point at which the simpler system becomes preferable again." },
      { type: "heading", content: "The broader ambition", level: 2 },
      { type: "text", content: "The aim is a reusable way to decide how much intelligence a product actually needs. In mature systems, restraint is not a lack of ambition; it is the ability to spend complexity only where it compounds into better decisions." },
      { type: "callout", title: "Current status", content: "This is the evaluation thesis. The empirical study still requires a selected dataset, published baseline, candidate models, error analysis, operating-cost comparison, and a final deploy-or-decline recommendation.", variant: "info" }
    ]
  },
  {
    slug: "marketing-analytics",
    title: "Marketing Analytics",
    subtitle: "Finding which acquisition channels create customers who stay",
    description: "A marketing measurement system designed to connect acquisition spend with retained customer value—and make uncertainty explicit enough to guide the next investment.",
    category: "case-study",
    tags: ["SQL", "Cohort Analysis", "Experimentation", "Attribution"],
    color: "bg-fun-green",
    heroImage: "",
    role: "Product Analyst",
    year: "2026",
    content: [
      { type: "callout", title: "The measurement thesis", content: "Marketing should not receive credit for creating a lead if the product cannot turn that lead into durable value. Acquisition and retention belong in the same economic story.", variant: "success" },
      { type: "heading", content: "The top of the funnel can hide a weak business", level: 2 },
      { type: "text", content: "Campaign dashboards are very good at showing activity. Impressions, clicks, and sign-ups arrive quickly, carry precise timestamps, and make performance feel observable. The outcomes that matter—activation, repeat behavior, margin, and retention—arrive later and are shared with the product itself. That delay encourages teams to optimize the part of the customer journey that is easiest to count." },
      { type: "text", content: "This project reframes marketing analytics around capital allocation. The central question is not which channel generated the most customers, but which source produced customers whose behavior justified what it cost to acquire them—and how confident we are that the channel deserves the credit." },
      { type: "heading", content: "One journey, several clocks", level: 2 },
      { type: "text", content: "The measurement model connects acquisition source to meaningful activation and then follows cohorts long enough to observe retention and value. That requires respecting time. A young cohort should not be penalized for having fewer opportunities to return, and a fast-converting channel should not automatically outrank one that produces slower but more durable customers." },
      { type: "text", content: "The funnel is therefore paired with cohort curves and payback windows. Together they show not only where customers disappear, but whether the economics improve as a cohort matures. Segmenting those views by channel, campaign, and customer type creates a more useful picture of quality than blended conversion rates." },
      { type: "heading", content: "Attribution is an assumption, not a fact", level: 2 },
      { type: "text", content: "A touchpoint receiving credit is not the same as that touchpoint causing the outcome. Last-click attribution rewards proximity; multi-touch rules distribute confidence without necessarily creating it. Rather than hide that uncertainty inside a model, the analysis will state the attribution rule, show how conclusions change under plausible alternatives, and identify where an experiment is worth more than another layer of reporting." },
      { type: "heading", content: "From dashboard to operating rhythm", level: 2 },
      { type: "text", content: "The final product should be a recurring decision process. A change in acquisition quality should lead to a budget review. A drop between sign-up and activation should create a product question. A wide confidence interval should trigger patience or an experiment, not a confident recommendation. Metrics that do not change an action do not earn permanent space." },
      { type: "heading", content: "The larger opportunity", level: 2 },
      { type: "text", content: "When acquisition and product behavior share the same measurement language, growth stops being a contest between teams. Marketing can optimize for customers the product is equipped to serve, product can see where expectations break after acquisition, and finance can evaluate growth as an investment with a time horizon rather than a stream of clicks." },
      { type: "callout", title: "Current status", content: "The decision framework is defined. The finished case still needs the underlying campaign data, explicit cohort definitions, attribution sensitivity, uncertainty estimates, and an experiment or budget recommendation supported by the evidence.", variant: "info" }
    ]
  },
  {
    slug: "letterboxd-rss",
    title: "Letterboxd RSS Service",
    subtitle: "Turning public Letterboxd activity into useful JSON",
    description: "A lightweight interoperability layer that turns Letterboxd's public activity feeds into dependable data for websites, archives, and personal automations.",
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
      { type: "heading", content: "Personal data should be able to travel", level: 2 },
      { type: "text", content: "I wanted my recent film activity to appear on my own site, in my own visual language, without manually publishing it twice. Letterboxd does not expose a general public API for that workflow, but it does publish RSS feeds. The data was available; it simply was not shaped for the places I wanted to use it." },
      { type: "text", content: "The service treats RSS as a quiet interoperability layer. It fetches a public profile feed, parses the film and review metadata, normalizes inconsistent fields, and returns a predictable JSON representation. A website or automation can then work with the activity without knowing anything about XML, feed conventions, or Letterboxd's markup." },
      { type: "heading", content: "A narrow service with a clear boundary", level: 2 },
      { type: "text", content: "The temptation was to imitate the API Letterboxd does not provide. That would create a larger surface area built on an unstable foundation. Instead, the service remains an adapter: it exposes only what the public feed reliably contains and makes the absence of data explicit rather than inventing completeness." },
      { type: "text", content: "Caching protects the upstream service and makes repeat requests inexpensive. The Express implementation keeps deployment ordinary and self-hosting realistic. If the feed changes, the parsing logic can evolve behind a stable response contract, so every consumer does not need to solve the same integration problem again." },
      { type: "heading", content: "The idea beyond a film feed", level: 2 },
      { type: "text", content: "The project is small, but the principle is broader: activity created on a platform should not be trapped in that platform's interface. A dependable adapter gives personal websites, archives, recommendation experiments, and automations a way to build on the record people have already created." },
      { type: "link-card", title: "View on GitHub", description: "Read the implementation and run the service yourself", href: "https://github.com/avnish100/letterboxd-rss", external: true }
    ]
  },
  {
    slug: "financial-analyst-agent",
    title: "Multi-Agent Financial Analyst",
    subtitle: "Testing whether specialist agents produce better financial summaries",
    description: "A research prototype for financial analysis that makes each agent's responsibility, evidence, and handoff inspectable instead of hiding the work behind one confident answer.",
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
      { type: "callout", title: "The research question", content: "Can an agent system produce analysis that is easier to inspect and challenge—not merely faster to generate—than a single model answering an open-ended financial prompt?", variant: "success" },
      { type: "heading", content: "The problem is not a shortage of fluent answers", level: 2 },
      { type: "text", content: "Financial analysis combines evidence gathering, calculation, interpretation, and synthesis. A general model can collapse those activities into one polished response, but fluency makes it difficult to see where a weak source, incorrect calculation, or unsupported inference entered the chain. In a consequential domain, the hidden path to the answer matters as much as the answer itself." },
      { type: "heading", content: "Separating responsibility", level: 2 },
      { type: "text", content: "The prototype decomposes the work into bounded roles. One agent gathers source material, another performs structured analysis, and another challenges or synthesizes the result. Their intermediate outputs remain visible and are passed forward as explicit context. The architecture is designed less like a panel of personalities and more like a traceable research process with named responsibilities." },
      { type: "text", content: "That separation creates useful failure boundaries. A missing fact can be traced to research. A numerical inconsistency can be isolated from narrative interpretation. A final summary can cite the evidence it inherited rather than producing authority from tone. It also exposes disagreements that a single pass might smooth over." },
      { type: "heading", content: "Coordination creates its own risk", level: 2 },
      { type: "text", content: "Multiple agents are not automatically a stronger system. They can amplify the same false premise, strip nuance during a handoff, or spend more time and money producing a longer route to the same error. The right comparison is therefore not multi-agent versus no automation; it is this explicit workflow versus a carefully prompted single-agent baseline under the same evidence and evaluation criteria." },
      { type: "heading", content: "What serious evaluation requires", level: 2 },
      { type: "text", content: "The prototype should be judged on factual accuracy, calculation correctness, source traceability, internal consistency, latency, and cost. It should also be tested adversarially: conflicting sources, missing data, stale information, and prompts that invite false certainty. An agent should be rewarded for identifying an unresolved question or abstaining when the evidence cannot support a conclusion." },
      { type: "heading", content: "The larger direction", level: 2 },
      { type: "text", content: "The more interesting future is not an autonomous analyst that replaces judgment. It is a research environment that makes judgment better: collecting evidence, preserving provenance, surfacing disagreement, and letting a person inspect the route from source to conclusion before acting." },
      { type: "callout", title: "Research prototype, not financial advice", content: "The current system explores orchestration and traceability. Its output is not verified investment research and should not be used to make financial decisions.", variant: "info" },
      { type: "link-card", title: "View on GitHub", description: "Explore the prototype and orchestration code", href: "https://github.com/avnish100/financial-analyst-agent", external: true }
    ]
  },
  {
    slug: "bel-bullets",
    title: "BEL Bullets",
    subtitle: "A fast, mobile-first home for a running community",
    description: "A digital home for BEL Bullets that turns scattered community information into a clear invitation to understand the group, show up, and belong.",
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
      { type: "heading", content: "A community is understood before it is joined", level: 2 },
      { type: "text", content: "BEL Bullets already existed through people, runs, and shared routines. What it lacked was a dependable public front door. New runners needed to understand what the group stood for, whether they would feel welcome, and how to take the first step without piecing the story together from scattered updates." },
      { type: "text", content: "That made the website less of a publishing project and more of an orientation tool. The hierarchy had to answer human questions before organizational ones: Who is this for? What happens when I arrive? Where and when do people meet? What kind of commitment is expected?" },
      { type: "heading", content: "Designing for the moment of intent", level: 2 },
      { type: "text", content: "Running communities are encountered on the move—through a message, a social post, or a recommendation from a friend. The mobile experience therefore carries the main design, not a reduced version of the desktop site. Essential information stays close, typography does the navigational work, and the interface avoids standing between curiosity and participation." },
      { type: "text", content: "Next.js static generation keeps the site quick and resilient, while a restrained Tailwind CSS system makes new pages and updates feel like part of the same place. The technical choices are intentionally quiet; the community, not the framework, should be what visitors remember." },
      { type: "heading", content: "Growth without turning community into software", level: 2 },
      { type: "text", content: "The site can grow into a richer record of the group—routes, stories, recurring events, and guidance for first-time runners—without becoming another social network the community must maintain. Its role is to make the real-world experience more legible and accessible, then get out of the way." },
      { type: "heading", content: "The result", level: 2 },
      { type: "text", content: "BEL Bullets now has a clear, fast public home that can welcome someone before their first run and remain useful after it. The value is not a long feature list; it is a more coherent path from hearing about the community to feeling able to join it." },
      { type: "link-card", title: "Visit BEL Bullets", description: "See the community's live website", href: "https://belbullets.run/", external: true }
    ]
  },
  {
    slug: "the-altarasa",
    title: "The Altarasa",
    subtitle: "Extending Shopify around a brand's real shopping experience",
    description: "A custom commerce and editorial system for The Altarasa—extending Shopify so discovery, expertise, and purchase feel like one coherent brand experience.",
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
      { type: "heading", content: "The store had to carry more than inventory", level: 2 },
      { type: "text", content: "The Altarasa combines products with editorial knowledge and a point of view. A conventional Shopify theme could process the transaction, but it separated discovery, expertise, and purchase into different kinds of pages. The central design challenge was to make those modes feel like one brand experience without sacrificing the operational strengths that made Shopify the right foundation." },
      { type: "heading", content: "Building a layer around consideration", level: 2 },
      { type: "text", content: "Not every visitor is ready to buy in one session. Wishlists preserve product intent. Editorial bookmarks let someone return to useful guidance. Curated bundles turn the brand's expertise into a shoppable recommendation. WhatsApp enquiries carry product and price context into a conversation instead of making the customer restate what they were viewing." },
      { type: "text", content: "Together, those features create continuity across a longer decision. They treat reading, saving, asking, and purchasing as connected behaviors rather than unrelated page events." },
      { type: "heading", content: "Mobile navigation as a product decision", level: 2 },
      { type: "text", content: "On a catalogue with both commerce and editorial content, a generic collapsed menu makes important destinations feel equally distant. The persistent mobile navigation gives the most-used parts of the store a stable place and reduces the cost of moving between discovery and intent. Promotional surfaces and sharing actions support that journey without becoming the architecture of the site." },
      { type: "heading", content: "Customization the client can still operate", level: 2 },
      { type: "text", content: "I extended Dawn through Liquid, JavaScript, and CSS rather than replacing its conventions wholesale. Flexible sections expose layout, expert, team, and promotional content through the theme editor, allowing routine changes without developer intervention. The only custom backend responsibility—persistent editorial bookmarks—lives in a small serverless service on Vercel." },
      { type: "text", content: "That boundary matters. Deep theme customization creates upgrade pressure, and every external service adds another place the store can fail. Keeping most behavior inside Shopify and isolating the exceptional stateful feature makes the maintenance burden visible and contained." },
      { type: "heading", content: "A platform for the brand, not just the launch", level: 2 },
      { type: "text", content: "The resulting storefront can support a richer relationship than browse-and-buy. Products, expert guidance, saved intent, bundles, and direct conversation now sit inside the same system. The long-term opportunity is to use that continuity to understand how customers move from curiosity to confidence—while keeping the experience recognizably The Altarasa and the operation manageable by the team behind it." },
      { type: "link-card", title: "Visit The Altarasa", description: "Explore the live commerce experience", href: "https://thealtarasa.in", external: true }
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug)
}
