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
  // Base para que las imágenes de la vista previa (WhatsApp, LinkedIn) salgan con URL absoluta
  metadataBase: new URL('https://full-stack-developer-axel-ramos.vercel.app'),
  title: 'Axel Ramos — Desarrollador Full Stack',
  description:
    'Full stack developer enfocado en frontend y diseño web. Sitios y aplicaciones web rápidos, claros y bien hechos con React, Next.js y NestJS.',

  // ── WhatsApp / redes sociales ──
  openGraph: {
    title: 'Axel Ramos — Desarrollador Full Stack',
    description:
      'Full stack developer enfocado en frontend y diseño web: sitios y aplicaciones web rápidos, claros y bien hechos.',
    url: '/',
    siteName: 'Axel Ramos',
    images: [
      {
        url: '/Ing.jpeg',
        width: 1200,
        height: 630,
        alt: 'Axel Ramos — Desarrollador Full Stack',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axel Ramos — Desarrollador Full Stack',
    description: 'Full stack developer enfocado en frontend y diseño web: sitios y aplicaciones web rápidos, claros y bien hechos.',
    images: ['/Ing.jpeg'],
  },

  icons: {
    icon: [
      { url: '/Ing.jpeg', media: '(prefers-color-scheme: light)' },
      { url: '/Ing.jpeg', media: '(prefers-color-scheme: dark)' },
      { url: '/diamante.png', type: 'image/png' },
    ],
    apple: '/Ing.jpeg',
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
    <html lang="es-CR" className={`${_inter.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased noise-bg">
        {children}
        <Analytics />
      </body>
    </html>
  )
}