import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Allenix — AI Growth Services for Gulf South Operators',
  description: 'We find the constraint in your business and remove it. AI-powered growth services for mid-market operators in Houston and the Gulf South. Built by operators, for operators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${baskerville.variable} ${mono.variable}`}
    >
      <body className="bg-bg-main text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  )
}
