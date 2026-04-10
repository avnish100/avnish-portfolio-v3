"use client"

import Link from "next/link"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { FadeIn } from "./fade-in"

const socials = [
  { label: "GitHub", href: "https://github.com/avnish100" },
  { label: "LinkedIn", href: "https://linkedin.com/in/avnisharyan" },
  { label: "Twitter", href: "https://twitter.com/avnisharyan" },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "avnishjha1005@gmail.com"

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-16 border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="text-[15px] mb-6 leading-relaxed">
            {"If you'd like to discuss a project or just say hi, I'm always down to chat."}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-3 text-[13px]">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/60 w-16 shrink-0">Mail</span>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 hover:text-fun-coral transition-colors link-underline"
              >
                {email}
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-fun-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground/40" />
                )}
              </button>
            </div>

            {socials.map((social) => (
              <div key={social.label} className="flex items-center gap-3">
                <span className="text-muted-foreground/60 w-16 shrink-0">{social.label}</span>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fun-coral transition-colors link-underline"
                >
                  {social.href.replace("https://", "")}
                </Link>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.15}>
          <footer className="mt-16 pt-6 border-t border-border flex justify-between items-center text-[12px] text-muted-foreground/50">
            <p>2026. Avnish Jha</p>
          </footer>
        </FadeIn>
      </div>
    </section>
  )
}
