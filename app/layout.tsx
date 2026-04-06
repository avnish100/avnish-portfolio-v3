import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppWrapper } from '@/components/portfolio/app-wrapper'
import { CursorWrapper } from '@/components/portfolio/cursor-wrapper'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Portfolio | Software Engineer & Product Manager',
  description: 'Software engineer turned product manager. Previously a Shopify developer and freelancer. Building products that matter.',
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppWrapper>
          {children}
        </AppWrapper>
        <CursorWrapper />
        <Analytics />
      </body>
    </html>
  )
}
