import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
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
  title: 'Allenix — We slingshot your firm into the new AI era',
  description: 'Allenix maps your workflows, builds your agents, and runs the system until it works. Done for you. Not delegated to you.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${baskerville.variable} ${mono.variable}`}>
      <body style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
