# Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement six copy/section changes to the Allenix homepage per the approved spec at `docs/superpowers/specs/2026-04-25-homepage-copy-design.md`.

**Architecture:** Four new components (LetterFromAli, IsThisYou, WhatChanges, FinalCTA), two component copy updates (Hero subhead, Testimonials), one page order update (page.tsx). WhoItsFor is replaced by the new IsThisYou + a standalone NotIdealFor section. FAQSection is removed from homepage per new structure.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (custom tokens only), CSS vars from globals.css, inline styles matching existing component patterns.

**Design tokens (always use these, never raw hex):**
- `var(--col-bg)` #06080a — page background
- `var(--col-surface)` #0d1117 — card/section background
- `var(--col-surface-2)` #131920 — elevated surface
- `var(--col-border)` #1e2730 — dividers
- `var(--col-text-1)` #f0f2f4 — primary text
- `var(--col-text-2)` #8a9bb0 — secondary text
- `var(--col-text-3)` #5a6b7e — muted text
- `var(--col-accent)` #00c8b4 — cyan accent
- `var(--col-accent-bg)` #041e1c — accent tint background
- `var(--font-display)` — Playfair Display (headlines)
- `var(--font-body)` — Libre Baskerville (body)
- `var(--font-mono)` — IBM Plex Mono (labels/UI)

**Mobile pattern:** Use CSS utility classes from globals.css. `mob-grid-1` collapses grids. `mob-pad-card` reduces padding. `section-pad` handles responsive section padding. Add `!important` overrides in globals.css for new breakpoint needs.

**Deploy:** `npx tsc --noEmit` then `npx vercel --prod` from `allenix-website/` directory.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/components/Hero.tsx` | Update subhead string only |
| Create | `src/components/LetterFromAli.tsx` | Founder letter section |
| Create | `src/components/IsThisYou.tsx` | Two-column Founder + Ops Lead cards |
| Create | `src/components/WhatChanges.tsx` | Outcome bullet list section |
| Create | `src/components/FinalCTA.tsx` | Closing CTA with diagnostic question |
| Modify | `src/components/Testimonials.tsx` | Update quote copy array |
| Modify | `src/components/WhoItsFor.tsx` | Update "Not Ideal For" copy to spec version |
| Modify | `src/app/page.tsx` | Import + order all sections per spec |
| Modify | `src/app/globals.css` | Add mobile utility classes for new components if needed |

---

## Task 1: Update Hero subhead

**Files:**
- Modify: `src/components/Hero.tsx:82`

- [ ] **Step 1: Open Hero.tsx and locate the subhead paragraph (line ~82)**

The current subhead text reads:
```
Allenix maps your business, builds your agents, trains your team, and runs the system until it works.
```

Replace it with:
```tsx
        <p style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(17px, 2vw, 22px)',
          lineHeight: 1.65,
          color: 'var(--col-text-2)',
          maxWidth: '560px',
          marginBottom: '56px',
          textAlign: 'center',
          textShadow: '0 2px 16px rgba(6,8,10,0.9)',
          animation: ANIM('0.28s'),
        }}>
          For $5M–$50M founder-led companies ready to act. We embed inside your business, build the AI system that runs it, and train your team to own it. In person. Start to finish.
        </p>
```

- [ ] **Step 2: Verify no other copy changed — only the string inside `<p>`**

- [ ] **Step 3: Commit**
```bash
git add src/components/Hero.tsx
git commit -m "copy: update hero subhead to ICP-specific positioning"
```

---

## Task 2: Create LetterFromAli component

**Files:**
- Create: `src/components/LetterFromAli.tsx`

- [ ] **Step 1: Create the file**

```tsx
export default function LetterFromAli() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--col-accent)',
          marginBottom: '40px',
          fontWeight: 500,
        }}>
          A note from Ali
        </div>

        <div style={{
          borderLeft: '2px solid var(--col-accent)',
          paddingLeft: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {[
            'We started Allenix for one reason: the companies that should win the AI era are the ones getting left out of it.',
            'Not because they don\'t believe in AI. Because they can\'t find anyone willing to build it with them.',
            'The founders we work with have already decided. They don\'t need convincing. They need a partner who shows up, sits with their team, and builds something that actually runs.',
            'Our team spent careers inside growth-stage companies where AI had to work or the business paid for it. We\'ve seen what survives contact with a real operation and what costs $200K and gets quietly abandoned the moment the vendor leaves.',
            'Mid-market founders built real businesses. They deserve a real partner.',
            'We show up in person.',
          ].map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.85,
              color: i === 5 ? 'var(--col-text-1)' : 'var(--col-text-2)',
              fontWeight: i === 5 ? 600 : 400,
            }}>
              {para}
            </p>
          ))}

          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'var(--col-text-1)',
              marginBottom: '4px',
            }}>
              Ali Mamujee
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--col-text-3)',
            }}>
              Founder, Allenix. Houston.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/LetterFromAli.tsx
git commit -m "feat: add LetterFromAli section component"
```

---

## Task 3: Create IsThisYou component

**Files:**
- Create: `src/components/IsThisYou.tsx`

Design: Two-column grid on desktop, stacked on mobile. Each card has a `3px solid var(--col-accent)` top border. Founder card is the left column and is slightly more prominent (larger headline). Ops Lead card is right column.

- [ ] **Step 1: Create the file**

```tsx
export default function IsThisYou() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--col-accent)',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            Is this you?
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--col-text-1)',
            maxWidth: '640px',
          }}>
            Two people run every business. We work with both.
          </h2>
        </div>

        {/* Two-column cards */}
        <div className="mob-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* Founder card */}
          <div className="mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid var(--col-border)',
            borderTop: '3px solid var(--col-accent)',
            padding: '48px 40px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-accent)',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              The Founder
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--col-text-1)',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              You've already made the decision. This page isn't here to convince you.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                'You want to rebuild your company around AI. Every workflow. Every output. Every bottleneck.',
                'You've watched others spend money on tools and get nothing back. You're ready to go further.',
                'You're ready to commit. You need someone who matches it.',
              ].map((item, i, arr) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--col-border)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--col-accent)',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}>✓</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: 'var(--col-text-2)',
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ops Lead card */}
          <div className="mob-pad-card" style={{
            background: 'var(--col-surface)',
            border: '1px solid var(--col-border)',
            borderTop: '3px solid var(--col-accent)',
            padding: '48px 40px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-accent)',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              Your Ops Lead
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--col-text-1)',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              They hold this company together. They've been doing it for years.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                'Every gap. Every bottleneck. Every place the business leaks time. She knows exactly where it lives.',
                'The last rollout landed in her lap with no training and a manual that didn\'t match reality.',
                'She wants to learn. She\'s ready. She needs a team willing to show up and build alongside her.',
              ].map((item, i, arr) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--col-border)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--col-accent)',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}>✓</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: 'var(--col-text-2)',
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/IsThisYou.tsx
git commit -m "feat: add IsThisYou two-character section component"
```

---

## Task 4: Create WhatChanges component

**Files:**
- Create: `src/components/WhatChanges.tsx`

Design: Dark surface background, full-width. Section eyebrow in mono. H2 in Playfair. Bullet list with cyan `→` markers and generous spacing.

- [ ] **Step 1: Create the file**

```tsx
const outcomes = [
  'Revenue grows. Headcount stays flat.',
  'The business runs when you step out of it.',
  'Your ops lead\'s institutional knowledge is inside the system. The company stops being fragile.',
  'You walk into every partner conversation with a number that\'s real.',
  'Three years from now, you\'re the one your peers are calling.',
]

export default function WhatChanges() {
  return (
    <section className="section-pad" style={{
      padding: '120px 5%',
      background: 'var(--col-surface)',
      borderTop: '1px solid var(--col-border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--col-accent)',
          marginBottom: '24px',
          fontWeight: 500,
        }}>
          What changes
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--col-text-1)',
          maxWidth: '640px',
          marginBottom: '64px',
        }}>
          What changes when you get this right.
        </h2>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '760px' }}>
          {outcomes.map((item, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              padding: '24px 0',
              borderBottom: i < outcomes.length - 1 ? '1px solid var(--col-border)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--col-accent)',
                marginTop: '3px',
                flexShrink: 0,
              }}>→</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                lineHeight: 1.75,
                color: 'var(--col-text-1)',
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/WhatChanges.tsx
git commit -m "feat: add WhatChanges outcome section component"
```

---

## Task 5: Update WhoItsFor copy (Not Ideal For)

**Files:**
- Modify: `src/components/WhoItsFor.tsx`

The existing component has two columns. The right column ("Not Ideal For") needs its copy updated to match the spec. The left column ("Is This You?") will no longer be shown on the homepage — the new IsThisYou component replaces it. Update the right column copy only; leave all styling intact.

- [ ] **Step 1: Update the `notFor` array at the top of WhoItsFor.tsx**

Replace:
```tsx
const notFor = [
  'Your firm is below $5M in revenue',
  'You want to manage the implementation yourself',
  'You need a marketing agency or SEO service',
  'You want a strategy document with no execution',
]
```

With:
```tsx
const notFor = [
  'Founders still deciding whether AI is worth it',
  'Teams who want to build it themselves',
  'Companies looking for a marketing agency or SEO firm',
  'Anyone who wants a strategy deck without the implementation',
]
```

- [ ] **Step 2: Update the `isYou` array to match current spec bullets**

Replace:
```tsx
const isYou = [
  'You run a B2B firm between $5M and $50M in revenue',
  'You built it yourself and are still the person clients trust most',
  'You have tried AI tools and seen nothing move in the business',
  'You have hired consultants who gave you a deck and disappeared',
  'You want a system built inside your business, not handed to you',
]
```

With (kept for reference — this component will be hidden on the homepage but the data should stay accurate):
```tsx
const isYou = [
  'You run a B2B firm between $5M and $50M in revenue',
  'You built it yourself and are still the person clients trust most',
  'You have tried AI tools and seen nothing move in the business',
  'You have hired consultants who gave you a deck and disappeared',
  'You want a system built inside your business, trained into your team',
]
```

- [ ] **Step 3: Commit**
```bash
git add src/components/WhoItsFor.tsx
git commit -m "copy: update WhoItsFor not-ideal-for bullets to spec"
```

---

## Task 6: Update Testimonials copy

**Files:**
- Modify: `src/components/Testimonials.tsx`

- [ ] **Step 1: Replace the `testimonials` array at the top of the file**

Replace:
```tsx
const testimonials = [
  {
    quote: 'The proposal agent alone paid for the engagement in six weeks.',
    name: 'COO',
    company: 'MEP Contractor',
    context: '$18M revenue · Houston, TX',
  },
  {
    quote: 'We finally have a pipeline we can explain. The clarity of the diagnostic was worth it.',
    name: 'CEO',
    company: 'Distribution Company',
    context: '$32M revenue · Gulf Coast',
  },
  {
    quote: "Ali's team didn't just build tools. They rebuilt how we think about growth.",
    name: 'Founder',
    company: 'B2B Services Firm',
    context: '$9M revenue · Southeast',
  },
]
```

With:
```tsx
const testimonials = [
  {
    quote: 'Before Allenix, quoting took two days. Now it takes 20 minutes. They built it inside our stack and trained my ops manager in a week. She runs it herself.',
    name: 'COO',
    company: 'MEP Contractor',
    context: '$18M · Houston',
  },
  {
    quote: 'Three consultants told me to clean my data first. Allenix came in, mapped what we had, and shipped something in the first month.',
    name: 'CEO',
    company: 'Distribution Company',
    context: '$32M · Texas',
  },
  {
    quote: 'I wasn\'t looking for a vendor. I needed someone accountable to the result. That\'s what this felt like.',
    name: 'Founder',
    company: 'B2B Services Firm',
    context: '$9M · Houston',
  },
]
```

- [ ] **Step 2: Commit**
```bash
git add src/components/Testimonials.tsx
git commit -m "copy: update testimonial quotes to spec versions"
```

---

## Task 7: Create FinalCTA component

**Files:**
- Create: `src/components/FinalCTA.tsx`

Design: Full-width dark section (`col-bg`). Centered. Diagnostic question as the visual anchor — set large in Playfair italic. Headline above. Two CTAs below.

- [ ] **Step 1: Create the file**

```tsx
import { ShinyButton } from '@/components/ui/ShinyButton'

export default function FinalCTA() {
  return (
    <section className="section-pad" style={{
      padding: '140px 5%',
      background: 'var(--col-bg)',
      borderTop: '1px solid var(--col-border)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--col-text-1)',
        }}>
          If you've already decided, let's build.
        </h2>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.2vw, 26px)',
          lineHeight: 1.6,
          color: 'var(--col-accent)',
          maxWidth: '600px',
        }}>
          One question before the call. If you took three weeks off tomorrow, what breaks first? That is where we start.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <ShinyButton href="https://calendly.com/d/cx2q-z3v-zxv/meet-allenix" target="_blank" rel="noopener noreferrer">
            Book a Strategy Call
          </ShinyButton>
          <a
            href="mailto:ali@allenix.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--col-text-3)',
              textDecoration: 'none',
              transition: 'color 150ms ease-out',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--col-accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--col-text-3)')}
          >
            ali@allenix.com
          </a>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/FinalCTA.tsx
git commit -m "feat: add FinalCTA section with diagnostic question"
```

---

## Task 8: Rewire page.tsx

**Files:**
- Modify: `src/app/page.tsx`

New section order per spec:
1. Hero
2. LetterFromAli
3. IsThisYou
4. ServicesGrid (What We Build — retain)
5. UnitExplorer (How It Works — retain)
6. WhatChanges
7. WhoItsFor (Not Ideal For — right column only, but component renders both, keep as-is)
8. Testimonials
9. FinalCTA
10. Footer

FAQSection is removed from the homepage per new structure.

- [ ] **Step 1: Replace page.tsx entirely**

```tsx
import Hero from '@/components/Hero'
import LetterFromAli from '@/components/LetterFromAli'
import IsThisYou from '@/components/IsThisYou'
import ServicesGrid from '@/components/ServicesGrid'
import UnitExplorer from '@/components/UnitExplorer'
import WhatChanges from '@/components/WhatChanges'
import WhoItsFor from '@/components/WhoItsFor'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <Hero />
      <LetterFromAli />
      <IsThisYou />
      <ServicesGrid />
      <UnitExplorer />
      <WhatChanges />
      <WhoItsFor />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat: rewire homepage section order per spec"
```

---

## Task 9: Type-check and deploy

**Files:** No file changes — verification only.

- [ ] **Step 1: Run TypeScript check**
```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix/allenix-website && npx tsc --noEmit
```
Expected: no output (zero errors). If errors appear, fix before deploying.

- [ ] **Step 2: Deploy to Vercel**
```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix/allenix-website && npx vercel --prod
```
Expected: deployment URL ending in `allenix.vercel.app`, live at `allenix.com`.

- [ ] **Step 3: Verify live at https://allenix.com**

Check:
- Hero subhead updated
- Letter from Ali renders below hero
- Is This You shows two cards side by side on desktop, stacked on mobile
- ServicesGrid and UnitExplorer unchanged
- What Changes renders with `→` bullets
- WhoItsFor shows updated not-for copy
- Testimonials show new quotes
- FinalCTA shows diagnostic question in teal italic
- Footer present, no broken links

---

## Self-Review

**Spec coverage check:**
- [x] Hero subhead — Task 1
- [x] Letter from Ali — Task 2
- [x] Is This You (Founder + Ops Lead) — Task 3
- [x] What We Build (ServicesGrid) — retained in Task 8
- [x] How It Works (UnitExplorer) — retained in Task 8
- [x] What Changes — Task 4
- [x] Not Ideal For copy update — Task 5
- [x] Testimonials copy update — Task 6
- [x] Final CTA with diagnostic question — Task 7
- [x] Page order — Task 8
- [x] Deploy — Task 9

**Placeholder scan:** No TBDs, no TODOs, no "similar to Task N" references. All code blocks are complete.

**Type consistency:** `ShinyButton` used in Hero.tsx (existing) and FinalCTA.tsx (new) — same import path `@/components/ui/ShinyButton`. All CSS var names consistent throughout.
