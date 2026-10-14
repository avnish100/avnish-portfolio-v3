import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/portfolio/theme-provider"
import { AppWrapper } from "@/components/portfolio/app-wrapper"
import { CursorWrapper } from "@/components/portfolio/cursor-wrapper"
import "./globals.css"

export const metadata: Metadata = {
  title: "Avnish Jha — Engineering, Data & Product",
  description: "Avnish Jha combines software engineering, data, and product thinking to turn ambiguous problems into useful digital products.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
          <CursorWrapper />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
