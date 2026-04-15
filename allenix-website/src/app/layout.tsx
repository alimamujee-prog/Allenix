import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville } from 'next/font/google'
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


export const metadata: Metadata = {
  title: 'Allenix',
  description: 'Three units. One platform. Built for the operators the coasts underestimated.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${baskerville.variable}`}
    >
      <body className="bg-bg-main text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  )
}
