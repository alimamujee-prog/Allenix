"use client"

import { BlurFade } from "@/components/ui/blur-fade"

const NAV_LINKS = [
  { label: "Solution", href: "#solution" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main border-b border-border-col">
      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Wordmark */}
        <BlurFade delay={0.1} duration={0.5}>
          <a
            href="/"
            className="font-display font-black text-[20px] tracking-[-0.5px] text-text-primary hover:text-accent transition-colors duration-150"
          >
            Allenix
          </a>
        </BlurFade>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <BlurFade key={link.href} delay={0.1 + i * 0.06} duration={0.4}>
              <a
                href={link.href}
                className="font-body text-[13px] uppercase tracking-[0.5px] text-text-secondary hover:text-accent transition-colors duration-150"
              >
                {link.label}
              </a>
            </BlurFade>
          ))}
        </nav>

      </div>
    </header>
  )
}
