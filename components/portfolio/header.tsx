import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  return (
    <header className="z-50 nav-glass">
      <div className="px-6 h-11 flex items-center gap-6">
        <Link href="/" className="font-serif text-lg italic tracking-tight">
          AJ
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
