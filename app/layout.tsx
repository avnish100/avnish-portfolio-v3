import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/portfolio/theme-provider'
import { AppWrapper } from '@/components/portfolio/app-wrapper'
import { CursorWrapper } from '@/components/portfolio/cursor-wrapper'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: 'Avnish Jha',
  description: 'Software developer. Building things and writing about how they work.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased`}>
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
