import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Magnolia OS | Allenix Agentic Platform',
  description: 'Internal workflow orchestration for Allenix Labs, Media, and Capital units.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${baskerville.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
