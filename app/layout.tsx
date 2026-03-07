import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const _geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Axel Ramos — Full Stack Developer',
  description:
    'Full stack developer building scalable systems and modern web experiences. Specialized in React, Next.js, Node.js, and cloud technologies.',
  generator: 'v0.app',

  // ── WhatsApp / redes sociales ──
  openGraph: {
    title: 'Axel Ramos — Full Stack Developer',
    description:
      'Full stack developer building scalable systems and modern web experiences.',
    url: 'full-stack-developer-axel-ramos.vercel.app', // 👈 pon tu URL real aquí
    siteName: 'Axel Ramos',
    images: [
      {
        url: '/Ing.jpeg',
        width: 1200,
        height: 630,
        alt: 'Axel Ramos — Full Stack Developer',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axel Ramos — Full Stack Developer',
    description: 'Full stack developer building scalable systems and modern web experiences.',
    images: ['/Ing.jpeg'],
  },

  icons: {
    icon: [
      { url: '/Ing.jpeg', media: '(prefers-color-scheme: light)' },
      { url: '/Ing.jpeg', media: '(prefers-color-scheme: dark)' },
      { url: '/diamante.png', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased noise-bg">
        {children}
        <Analytics />
      </body>
    </html>
  )
}