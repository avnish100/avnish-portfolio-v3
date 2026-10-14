import Link from "next/link"
import { CheckCircle, ExternalLink, Info, AlertTriangle } from "lucide-react"
import { PortableText } from "next-sanity"

type CalloutValue = {
  title: string
  content: string
  variant?: "info" | "success" | "warning"
}

type LinkValue = {
  title: string
  description?: string
  href: string
}

const calloutVariants = {
  info: { icon: Info, color: "border-fun-blue bg-fun-blue/5" },
  success: { icon: CheckCircle, color: "border-fun-green bg-fun-green/5" },
  warning: { icon: AlertTriangle, color: "border-fun-yellow bg-fun-yellow/10" },
}

const components = {
  types: {
    caseCallout: ({ value }: { value: CalloutValue }) => {
      const variant = calloutVariants[value.variant ?? "info"]
      const Icon = variant.icon

      return (
        <div className={`border-l-4 p-6 ${variant.color}`}>
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">{value.title}</p>
              <p className="mt-1 text-muted-foreground">{value.content}</p>
            </div>
          </div>
        </div>
      )
    },
    caseLink: ({ value }: { value: LinkValue }) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-border p-6 transition-colors hover:bg-secondary/50"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-foreground group-hover:text-fun-coral">{value.title}</p>
            {value.description && <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>}
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </Link>
    ),
  },
}

export function SanityPortableText({ value }: { value: unknown[] }) {
  return <PortableText value={value as never[]} components={components} />
}
