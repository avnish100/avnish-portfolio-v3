import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Info, CheckCircle, AlertTriangle } from "lucide-react"
import type { ContentBlock } from "@/lib/projects"

interface ContentRendererProps {
  blocks: ContentBlock[]
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-lg leading-relaxed text-muted-foreground">
          {block.content}
        </p>
      )

    case "heading":
      const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
      const headingClasses = {
        2: "text-2xl font-medium mt-12 first:mt-0 mb-3",
        3: "text-xl font-medium mt-8 mb-2",
        4: "text-lg font-medium mt-6 mb-2"
      }
      return (
        <HeadingTag className={headingClasses[block.level || 2]}>
          {block.content}
        </HeadingTag>
      )

    case "image":
      return (
        <figure className={block.fullWidth ? "-mx-6 md:-mx-12" : ""}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case "gallery":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.images.map((image, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )

    case "stats":
      return (
        <div className="grid grid-cols-3 gap-8 py-8 border-y border-border">
          {block.items.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-medium text-fun-coral">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )

    case "quote":
      return (
        <blockquote className="border-l-4 border-fun-coral pl-6 py-4">
          <p className="text-xl italic text-foreground">
            {`"${block.content}"`}
          </p>
          {block.author && (
            <footer className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{block.author}</span>
              {block.role && <span>, {block.role}</span>}
            </footer>
          )}
        </blockquote>
      )

    case "list":
      const ListTag = block.ordered ? "ol" : "ul"
      return (
        <ListTag className={`space-y-2 text-lg text-muted-foreground ${block.ordered ? "list-decimal" : "list-disc"} pl-6`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      )

    case "callout":
      const variants = {
        info: { icon: Info, color: "border-fun-blue bg-fun-blue/5" },
        success: { icon: CheckCircle, color: "border-fun-green bg-fun-green/5" },
        warning: { icon: AlertTriangle, color: "border-fun-yellow bg-fun-yellow/10" }
      }
      const variant = variants[block.variant || "info"]
      const Icon = variant.icon
      return (
        <div className={`rounded-lg border-l-4 p-6 ${variant.color}`}>
          <div className="flex gap-3 items-start">
            <Icon className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-medium mb-1">{block.title}</div>
              <p className="text-muted-foreground">{block.content}</p>
            </div>
          </div>
        </div>
      )

    case "code":
      return (
        <pre className="bg-secondary rounded-lg p-6 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">
            {block.content}
          </code>
        </pre>
      )

    case "divider":
      return <hr className="border-border" />

    case "spacer":
      const sizes = { sm: "h-4", md: "h-8", lg: "h-16" }
      return <div className={sizes[block.size || "md"]} />

    case "columns":
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {block.columns.map((column, i) => (
            <div key={i} className="space-y-4">
              {column.map((innerBlock, j) => (
                <Block key={j} block={innerBlock} />
              ))}
            </div>
          ))}
        </div>
      )

    case "link-card":
      return (
        <Link
          href={block.href}
          target={block.external ? "_blank" : undefined}
          rel={block.external ? "noopener noreferrer" : undefined}
          className="block p-6 rounded-lg border border-border hover:border-foreground/20 hover:bg-secondary/50 transition-all group"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium group-hover:text-fun-coral transition-colors">
                {block.title}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {block.description}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        </Link>
      )

    default:
      return null
  }
}
