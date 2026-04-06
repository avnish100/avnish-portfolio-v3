// Flexible content block types for case studies, portfolio projects, etc.

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
  color: string // Tailwind class e.g. "bg-fun-coral"
  heroImage: string
  client?: string
  role?: string
  year: string
  duration?: string
  team?: string[]
  links?: Array<{ label: string; href: string }>
  content: ContentBlock[]
}

export const projects: Project[] = [
  {
    slug: "shopify-checkout-optimization",
    title: "Checkout Optimization",
    subtitle: "Reducing cart abandonment for a D2C brand",
    description: "Led the redesign of a Shopify checkout flow that increased conversion by 23% through strategic UX improvements and performance optimization.",
    category: "case-study",
    tags: ["Shopify", "E-commerce", "UX Research", "A/B Testing"],
    color: "bg-fun-coral",
    heroImage: "/projects/ecommerce.jpg",
    client: "Confidential D2C Brand",
    role: "Lead Developer",
    year: "2024",
    duration: "3 months",
    team: ["1 Designer", "1 Developer (me)", "1 PM"],
    links: [
      { label: "View Live", href: "#" }
    ],
    content: [
      { type: "heading", content: "The Challenge", level: 2 },
      { type: "text", content: "The client was experiencing a 67% cart abandonment rate, significantly higher than the industry average. Through user research and analytics, we identified friction points in the checkout process that were causing users to drop off." },
      { type: "stats", items: [
        { label: "Cart Abandonment", value: "67%" },
        { label: "Mobile Users", value: "73%" },
        { label: "Avg. Checkout Time", value: "4.2 min" }
      ]},
      { type: "heading", content: "Research & Discovery", level: 2 },
      { type: "text", content: "We conducted user interviews, heatmap analysis, and funnel analytics to understand where users were dropping off. Key insights emerged around mobile experience, payment options, and perceived security." },
      { type: "list", items: [
        "Users struggled with form input on mobile devices",
        "Lack of payment options frustrated international customers",
        "Security badges were not visible above the fold",
        "Progress indication was unclear"
      ]},
      { type: "heading", content: "Solution", level: 2 },
      { type: "text", content: "We implemented a simplified single-page checkout with auto-advancing sections, added Apple Pay and Google Pay integration, and redesigned the mobile experience with larger touch targets and clearer CTAs." },
      { type: "image", src: "/projects/ecommerce.jpg", alt: "Checkout redesign mockup", caption: "The new checkout flow with progress indicators" },
      { type: "heading", content: "Results", level: 2 },
      { type: "stats", items: [
        { label: "Conversion Increase", value: "+23%" },
        { label: "Mobile Conversion", value: "+31%" },
        { label: "Checkout Time", value: "2.1 min" }
      ]},
      { type: "quote", content: "This redesign fundamentally changed how we think about our checkout experience. The data speaks for itself.", author: "Head of E-commerce", role: "Client" }
    ]
  },
  {
    slug: "product-discovery-framework",
    title: "Product Discovery Framework",
    subtitle: "Building a repeatable process for product teams",
    description: "Developed a comprehensive product discovery framework that helped teams validate ideas faster and reduce wasted development effort.",
    category: "case-study",
    tags: ["Product Management", "Discovery", "Framework", "Process"],
    color: "bg-fun-blue",
    heroImage: "/projects/taskmanager.jpg",
    role: "Product Manager",
    year: "2024",
    duration: "Ongoing",
    content: [
      { type: "heading", content: "Context", level: 2 },
      { type: "text", content: "As I transitioned into product management, I noticed teams often jumped straight into building without proper validation. This led to wasted resources and features that didn't move metrics." },
      { type: "heading", content: "The Framework", level: 2 },
      { type: "text", content: "I developed a lightweight framework that balances speed with rigor, allowing teams to validate assumptions before committing significant engineering resources." },
      { type: "callout", title: "Key Principle", content: "Every feature should have a clear hypothesis that can be invalidated before development begins.", variant: "info" },
      { type: "list", items: [
        "Problem Definition: What user problem are we solving?",
        "Assumption Mapping: What must be true for this to succeed?",
        "Risk Assessment: Which assumptions are riskiest?",
        "Validation Plan: How do we test the riskiest assumptions?",
        "Success Criteria: What metrics indicate success?"
      ], ordered: true },
      { type: "heading", content: "Impact", level: 2 },
      { type: "stats", items: [
        { label: "Ideas Validated", value: "40+" },
        { label: "Dev Time Saved", value: "~60%" },
        { label: "Teams Adopted", value: "5" }
      ]}
    ]
  },
  {
    slug: "shopify-app-development",
    title: "Shopify App Suite",
    subtitle: "Custom apps for merchant operations",
    description: "Built a suite of Shopify apps that automated inventory management, order routing, and customer segmentation for mid-market merchants.",
    category: "project",
    tags: ["Shopify", "Node.js", "GraphQL", "React"],
    color: "bg-fun-green",
    heroImage: "/projects/aiwriter.jpg",
    role: "Full Stack Developer",
    year: "2023",
    duration: "6 months",
    links: [
      { label: "GitHub", href: "#" }
    ],
    content: [
      { type: "heading", content: "Overview", level: 2 },
      { type: "text", content: "Mid-market Shopify merchants often outgrow basic apps but can't justify enterprise solutions. I built a suite of focused tools that solve specific operational pain points." },
      { type: "heading", content: "Technical Implementation", level: 2 },
      { type: "text", content: "The apps are built on Shopify's App Bridge using React for the frontend and Node.js for the backend. We leverage Shopify's GraphQL Admin API for efficient data fetching and webhooks for real-time updates." },
      { type: "code", content: `// Webhook handler for order creation
app.post('/webhooks/orders/create', async (req, res) => {
  const order = req.body;
  await routeOrder(order);
  await updateInventory(order.line_items);
  res.status(200).send('OK');
});`, language: "javascript" },
      { type: "heading", content: "Key Features", level: 2 },
      { type: "columns", columns: [
        [
          { type: "heading", content: "Inventory Sync", level: 3 },
          { type: "text", content: "Real-time inventory synchronization across multiple locations and sales channels." }
        ],
        [
          { type: "heading", content: "Order Routing", level: 3 },
          { type: "text", content: "Intelligent order routing based on inventory availability, shipping costs, and fulfillment capacity." }
        ]
      ]}
    ]
  },
  {
    slug: "design-system-documentation",
    title: "Design System Docs",
    subtitle: "Component library documentation site",
    description: "Created an interactive documentation site for a design system, making it easier for developers to implement components correctly.",
    category: "project",
    tags: ["React", "Next.js", "MDX", "Documentation"],
    color: "bg-fun-yellow",
    heroImage: "/projects/designsystem.jpg",
    role: "Frontend Developer",
    year: "2023",
    duration: "2 months",
    content: [
      { type: "heading", content: "The Problem", level: 2 },
      { type: "text", content: "Design systems are only useful if developers can easily understand and implement them. The existing Figma-based documentation wasn't translating well to code." },
      { type: "heading", content: "Solution", level: 2 },
      { type: "text", content: "Built a Next.js-based documentation site with live code examples, copy-paste snippets, and visual regression testing baked in." },
      { type: "image", src: "/projects/designsystem.jpg", alt: "Documentation site screenshot", caption: "Interactive component playground" },
      { type: "link-card", title: "View Documentation", description: "Explore the live component library", href: "#", external: true }
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug)
}
