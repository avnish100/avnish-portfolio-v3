"use client"

import Link from "next/link"
// eslint-disable-next-line @typescript-eslint/no-deprecated
import { Mail, Github, Linkedin, Twitter, Check } from "lucide-react"
import { useState } from "react"
import { FadeIn } from "./fade-in"

const socials = [
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { label: "GitHub", href: "https://github.com/avnish100", icon: Github },
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { label: "LinkedIn", href: "https://www.linkedin.com/in/avnish-jha-875ba120b", icon: Linkedin },
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { label: "Twitter", href: "https://x.com/avnisharyanjha", icon: Twitter },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "avnishjha1005@gmail.com"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
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
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={copyEmail}
              className="text-foreground hover:text-muted-foreground transition-colors"
              title={copied ? "Copied!" : "Copy email"}
            >
              {copied ? (
                <Check className="w-5 h-5" strokeWidth={1.25} />
              ) : (
                <Mail className="w-5 h-5" strokeWidth={1.25} />
              )}
            </button>

            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground transition-colors"
                title={social.label}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.25} />
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.15}>
          <footer className="mt-16 pt-6 border-t border-border flex justify-between items-center text-[12px] text-muted-foreground/50">
            <p>{new Date().getFullYear()}. Avnish Jha</p>
          </footer>
        </FadeIn>
      </div>
    </section>
  )
}
