import './globals.css'
import ApolloProvider from './components/providers/ApolloProvider'
// DEMO MODE: Remove this import and <DemoModeBanner /> below for production-only builds
import { DemoModeBanner } from './components/DemoModeBanner'
import { Viewport, type Metadata } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

function getSiteUrl(): string {
  // Prefer an explicit site URL when provided.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  // Vercel environment provides VERCEL_URL without protocol.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Fallback to localhost using detected PORT or default 3000.
  const port = process.env.PORT || '3000'
  const host = process.env.HOST || 'localhost'
  return `http://${host}:${port}`
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Decoupled University',
    template: '%s | Decoupled University'
  },
  description: 'Empowering minds and shaping futures. Discover world-class academic programs, distinguished faculty, and a vibrant campus community.',
  keywords: ['University', 'Higher Education', 'Academic Programs', 'Faculty', 'Research', 'Campus Events', 'Drupal', 'Next.js'],
  authors: [{ name: 'Decoupled University' }],
  creator: 'Decoupled University',
  publisher: 'Decoupled University',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <DemoModeBanner />
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
