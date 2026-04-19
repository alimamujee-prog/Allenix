# Allenix Website Design Spec

This document describes the Allenix website as it should be built. It covers the current state, the target state, and the implementation plan.

---

## Project overview

Allenix is a Houston-built firm that helps Gulf South mid-market operators ($10M-$100M revenue) win the AI era. Three units: Labs (agentic growth services), Studios (brand and audience engine), and Capital (acquisition compounding arm). The underlying platform is Magnolia.

Founder: Ali Mamujee. Houston, Ion District. Former Mercatus operator.

### Site purpose

The home page is a **conversion landing page**. Its job is to move a visitor from "just heard about Allenix" to "booked a call" or "signed up for the newsletter." Everything on the page serves that funnel.

Primary audience: mentors, investors, potential co-founders, and mid-market CEOs who have been referred to Allenix.

The manifesto (`/manifesto`) is a separate editorial page that tells the founding story and vision. It is the emotional hook. The home page links to it prominently.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animation | CSS transitions only. No animation library. |
| Icons | lucide-react (minimal, structural use only) |
| Utilities | class-variance-authority, clsx, tailwind-merge |
| Fonts | Google Fonts via next/font: Playfair Display, Libre Baskerville, IBM Plex Mono |
| Backend | None. Static site. |
| Deploy | Vercel |
| Live URL | https://allenix.vercel.app |
| Vercel project | `allenix` under `alimamujee-3464s-projects` |

---

## Design system

### Theme

Light. Background is warm off-white (#faf9f6). All surfaces are warm neutrals. Text is dark. Accent is teal (#04CCBA). The palette is intentionally restrained: one accent hue, warm neutrals, high contrast.

This is an editorial aesthetic. Think newspaper meets modern design studio. Warm paper surfaces, strong serif typography, restrained color. The site should feel like a well-printed broadsheet, not a dark-mode SaaS dashboard.

### Color palette

**Single token system** — CSS custom properties are the source of truth. Tailwind classes reference these variables. No duplicated color definitions.

| Variable | Hex | Tailwind class | Usage |
|----------|-----|----------------|-------|
| `--col-bg` | `#faf9f6` | `bg-main` | Page background (warm off-white) |
| `--col-surface` | `#f2f0eb` | `bg-card` | Card surfaces, sidebar panels |
| `--col-surface-2` | `#e8e5de` | — | Elevated surfaces, hover states |
| `--col-border` | `#d4d0c8` | `border-col` | Dividers, borders, input borders |
| `--col-border-2` | `#c4bfb5` | — | Secondary borders |
| `--col-text-1` | `#0d0d0d` | `text-primary` | Headlines, strong text |
| `--col-text-2` | `#1a1a1a` | `text-secondary` | Body copy, subheadings |
| `--col-text-3` | `#6b6560` | — | Muted labels, captions |
| `--col-accent` | `#04CCBA` | `accent` | Teal. The ONLY accent color |
| `--col-accent-dim` | `#029e90` | `accent-hover` | Darker teal for hover states |
| `--col-accent-light` | `#9eeee8` | `accent-light` | Teal tint for focus rings |
| `--col-accent-wash` | `#edfaf9` | `accent-wash` | Near-white teal for backgrounds |

**Rules:**
- Teal (#04CCBA) is the only accent. No other hues anywhere.
- No pure white (#ffffff) as a background. Always use #faf9f6.
- No pure black (#000000). Always use #0d0d0d.
- Accent wash (#edfaf9) is for surfaces only. Never for text.
- Accent-light (#9eeee8) is for focus rings and subtle highlights only. Never for text or large areas.

### Typography

**Font loading** (in `layout.tsx`):
```typescript
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google'

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
```

**Type hierarchy:**

| Role | Font | Weight | Size | Tracking | Notes |
|------|------|--------|------|----------|-------|
| Hero wordmark | Playfair Display | 900 | 64-80px | -2px | The signature moment. Massive. |
| Section titles | Playfair Display | 900 | 32-40px | -1px | Major section headers |
| Unit names (panels) | Playfair Display | 900 | 32px | -0.5px | Inside expand panels |
| Card titles | Playfair Display | 600 italic | clamp(22px, 3vw, 28px) | — | Unit card titles |
| Body text | Libre Baskerville | 400 | 16-18px | — | line-height 1.75 |
| Section labels | IBM Plex Mono | 500 | 11px | 2px | Uppercase. Section markers. |
| Nav links | IBM Plex Mono | 500 | 12px | 2px | Uppercase. Navigation. |
| Chip labels | Libre Baskerville | 700 | 11.5px | 1.5px | Uppercase. Interactive chips. |

**Rules:**
- Playfair is for big moments only. Never for body text, UI labels, or chips.
- Libre Baskerville is the workhorse for editorial and body text.
- IBM Plex Mono is for structural labels: navigation, section markers, metadata.
- Never mix more than two typefaces in one layout context.
- No glow effects, text-shadow, or gradient text. Ever.

### Spacing

- Base unit: 8px
- Max content width: 1100px (`max-w-[1100px] mx-auto`)
- Section vertical padding: 96-120px desktop, 64px mobile
- Card padding: 28-32px
- Grid: flexible, not forced 3-column
- Gaps: 24px between major elements

### Interaction patterns

| Element | Effect | Timing |
|---------|--------|--------|
| Card hover | Border color shift to accent-dim + 2px y-offset | 150ms ease-out |
| Card active | Accent border + accent-wash background | 150ms ease-out |
| Panel expand | grid-template-rows transition | 200ms ease-out |
| Chip hover | Border color shift + background tint | 120ms ease |
| Chip active | Accent-wash background + accent border | 120ms ease |
| Magnolia accordion | grid-template-rows transition | 200ms ease-out |
| Focus rings | 2px solid accent, offset 3px | — |
| Links | Color shift to accent on hover | 150ms ease-out |

**Banned effects:**
- No 3D tilt, perspective transforms, or parallax
- No glow, box-shadow glow, text-shadow glow
- No pixel trails, particle effects, or cursor modifications
- No framer-motion or animation libraries
- No gradient text or background-clip: text
- No left-stripe borders (border-left > 1px as colored accent)
- No glassmorphism or backdrop blur effects

### Responsive

- Desktop-first, with mobile breakpoints at 768px and 480px
- Touch targets: minimum 44px height on all interactive elements
- Card grid: 3-column desktop, 1-column mobile
- Type sizes: use clamp() for headings, fixed rem for body

---

## Site structure

Single-page home (`/`) with manifesto as a separate route (`/manifesto`). The home page is one continuous scroll with distinct sections. No multi-page routing beyond these two routes.

### `/` — Home page sections (top to bottom)

#### Section 1: Hero

**Status: NEEDS BUILD**

The signature moment. Visitors land here and understand Allenix in 3 seconds.

Layout:
- Allenix wordmark in Playfair Display 900, massive (64-80px)
- Mono label above wordmark in IBM Plex Mono caps
- Subhead in Libre Baskerville body below the wordmark
- Single CTA: "Book a Discovery Call" (primary, filled accent button). No secondary CTA.
- Generous vertical padding (120px+ top, 96px bottom)
- Everything centered, max-width constrained
- Warm off-white background
- Typography-only for now. Texture or image from 21st dev to come later.

Copy:
- Mono label: "HOUSTON · GULF SOUTH · AI ERA"
- Headline: The Allenix wordmark itself
- Subhead: "We sit down with you. We find the constraint costing you the most time or money. We fix it in 90 days."
- CTA: "Book a Discovery Call" → Calendly embed (placeholder until Ali shares his Calendly URL)
- Manifesto link is in the footer only. Not in the hero.

#### Section 2: What We Do (Three Units)

**Status: EXISTS, NEEDS REDESIGN**

Current state: Three identical `UnitCard` components in a grid with expand/collapse detail panels.

Target state:
- Keep the three-unit structure (Labs, Studios, Capital)
- Break the identical-card symmetry. Labs is visually primary (the revenue engine). Studios and Capital are secondary.
- Labs gets a featured position: larger card or split layout. Studios and Capital as smaller companions.
- The expand/collapse interaction works well. Keep it.
- Capital is "Forming." Brief and honest. No need to over flesh out at this stage.
- Cards use warm surface (#f2f0eb) background with border (#d4d0c8). Active state uses accent-wash background + accent border.
- No icons on cards. The typography is the design. Playfair Display italic for card titles is sufficient visual distinction.

Copy:
- Section label: "WHAT WE DO"
- Section headline: "Three units. One machine."
- Intro: "Each unit feeds the next. Studios builds the audience. Labs sells into it and delivers. Capital acquires what Labs has proven. The wheel spins faster every quarter."

Labs card:
- Title: "Labs" (Playfair Display 600 italic)
- Role label: "THE ENGINE"
- One-line: "We go deep inside your business. Find the highest-ROI opportunities. Deploy the tools, people, and platform that execute alongside you. Labs is where revenue growth becomes measurable."
- Expanded: "Every Labs engagement starts the same way. A four-week diagnostic that maps every revenue workflow and produces a prioritized list of opportunities, each one with a dollar number attached. Then we pick the highest-impact one and build it. No theory. Just execution."

Studios card:
- Title: "Studios" (Playfair Display 600 italic)
- Role label: "THE AUDIENCE"
- One-line: "Editorial, podcast, video, and events that make Allenix the trade publication for operator-led growth. Studios builds the brand that brings every client to the door. It is not marketing. It is distribution."
- Expanded: "Every piece of content we produce makes the next client conversation easier. Studios is how we make Houston louder to a country that has not been paying attention. The Allenix Letter, the podcast, the operator dinners. All of it compounds."

Capital card:
- Title: "Capital" (Playfair Display 600 italic)
- Role label: "THE COMPOUNDER · FORMING"
- One-line: "Labs validates companies. Capital acquires them. The same platform that made them more valuable runs inside from day one. We are building this now."

Interaction:
- Hover: border color shift to accent-dim + 2px y-offset. CSS transition 150ms.
- Active: accent border + accent-wash background. No glow.
- Panel expand: grid-template-rows transition (not max-height hack).

#### Section 3: How It Works

**Status: NEW**

Simple, editorial 3-step process. Matches the $5K workshop positioning.

Copy:
- Section label: "HOW IT WORKS"
- Section headline: "From first call to first result."
- Step 1 "Deep Discovery": "We sit down with you and your team. We map every revenue workflow, every bottleneck, every place time or money is leaking. Two to four weeks. The output is a single document: every opportunity ranked by ROI, each with a dollar number attached."
- Step 2 "Identify the Constraint": "Not ten problems. One. The single constraint that, if removed, unlocks the most growth. We quantify it. We prove it. Then we agree on the fix."
- Step 3 "Resolve It": "We build the solution using the latest AI tools and workflows. We train your team. We stay until it runs without us. Then we move to the next constraint."
- Closing line: "This is not a transformation roadmap. It is one problem, one fix, one result. Then the next one."
- Soft CTA: "Ready to find your constraint?" + "Book a Discovery Call" button

Design:
- Three steps displayed as a numbered horizontal flow or stacked editorial blocks
- Each step has a number/label in IBM Plex Mono + body in Libre Baskerville
- Background: surface color (#f2f0eb) to visually separate from sections above/below
- No complex SVG. Keep it typographic and structural.

Purpose: Help visitors understand what actually happens when they engage Allenix. Tangible, specific, no ambiguity.

#### Section 4: Studios / Newsletter

**Status: NEW**

Simple email capture. Builds credibility and stays in touch with early followers.

Copy:
- Section label: "STAY AHEAD"
- Section headline: "Stay in the loop."
- Body: "Updates from Allenix. What we are building, what we are learning, and what is coming next. No spam. No fluff. Just a note when there is something worth sharing."

The email capture form:
- Single field: email address
- Submit button: "Subscribe"
- Backend: Vercel KV (see Newsletter email storage section below)
- Success state: inline "You are on the list." confirmation
- Background: warm off-white (bg) to transition back from the surface section above

#### Section 5: CTA (Book a Call)

**Status: NEW**

The conversion point. The most important section after the hero.

Copy:
- Section label: "NEXT STEP"
- Section headline: "See if Labs is right for your business."
- Body: "One hour. No pitch deck. No commitment. Just a conversation about where your business is today, where the biggest constraint is hiding, and whether Allenix is the right team to remove it."
- Primary CTA: "Book a Discovery Call"
- Calendly embed widget (inline, not external link. Placeholder until Ali shares his Calendly URL.)
- Secondary option: "Prefer email? ali@allenix.com"
- No form. A calendar embed is higher-conversion than a contact form.
- Background: surface color (#f2f0eb) for visual emphasis

Note: This is a free one-hour discovery call. Not the paid workshop. The workshop conversation happens on the call.

#### Section 6: Footer

**Status: NEW**

Minimal footer.

Contents:
- Allenix wordmark (small, Playfair 900)
- Location: "Houston, Texas" in IBM Plex Mono
- Links: The Manifesto, LinkedIn ([placeholder]), Email ([placeholder])
- Copyright line
- Nothing else. No social icons array, no newsletter signup repeat, no site map.
- Border-top separator from the content above

Note: The manifesto link lives here. It was removed from the hero to keep a single CTA.

### `/manifesto` — Manifesto

**Status: EXISTS, NEEDS FIXES**

Full editorial page. Content is strong. Structural fixes needed:

1. Replace all div-based section titles with proper `<h2>` elements. The "1836" title block should be `<h1>`.
2. Wrap header navigation in `<nav>` with `aria-label`.
3. Add a skip-to-content link.
4. Replace the left-border stripe on the blockquote with indentation + italic + full border.
5. Migrate inline styles to Tailwind classes for consistency.
6. Update color tokens from dark theme to light warm theme.

Content stays the same. The writing is the site's strongest asset.

---

## Conversion funnel

The home page has one job: move visitors toward a call or newsletter signup.

```
Visitor lands
  -> Hero: understands what Allenix does for them (3 seconds)
  -> What We Do: sees the three units and the flywheel (10 seconds)
  -> How It Works: understands the process, soft CTA available (optional)
  -> Studios: signs up for updates (optional)
  -> CTA: books a discovery call (primary conversion)
```

Every section either moves the visitor down this funnel or provides enough credibility to justify taking the next step. Nothing decorative.

---

## Implementation plan

### Phase 1: Foundation (theme + cleanup)

These must happen before any new sections are built.

| Priority | Issue | Action | Files affected |
|----------|-------|--------|----------------|
| P0 | Dark theme → light theme | Replace all color tokens with warm light palette | `globals.css`, `tailwind.config.js` |
| P0 | No h1 on home page | Add h1 to hero section | `page.tsx` or new `Hero.tsx` |
| P0 | No semantic HTML on manifesto | Replace div titles with h1/h2, add nav landmark, add skip link | `manifesto/page.tsx` |
| P0 | IBM Plex Mono missing | Re-add to layout.tsx font loading | `layout.tsx` |
| P1 | Pixel cursor trail | Delete entirely | `pixel-trail.tsx`, `page.tsx` |
| P1 | framer-motion for tilt only | Replace with CSS hover transforms, remove dependency | `unit-card.tsx`, `package.json` |
| P1 | Left-stripe borders (banned) | Replace with full border or background tint | `globals.css` |
| P1 | Touch targets too small | Increase chip and nav padding to meet 44px minimum | `globals.css`, components |
| P1 | Three separate token systems | Consolidate to one: CSS custom properties | `globals.css`, `tailwind.config.js`, all components |
| P2 | Glow effects on text and elements | Remove all text-shadow, box-shadow glow | `unit-card.tsx`, `AllenixHero.tsx` |
| P2 | Unused components | Delete: `Flywheel.tsx`, `Navbar.tsx`, `badge.tsx`, `blur-fade.tsx`, `button.tsx`, `card.tsx`, `radial-orbital-timeline.tsx` | 7 files |
| P2 | Manifesto all inline styles | Migrate to Tailwind classes | `manifesto/page.tsx` |
| P2 | Panel expand max-height hack | Replace with grid-template-rows transition | `AllenixHero.tsx` |
| P3 | No reduced motion support | Check prefers-reduced-motion, disable animations | `globals.css` |

### Phase 2: Build new sections

Order matters. Each section builds on the previous.

| Step | Section | Component | Key decisions |
|------|---------|-----------|---------------|
| 1 | Hero | `Hero.tsx` | Wordmark size. Single CTA. Typography-only. |
| 2 | Unit Explorer | `UnitExplorer.tsx` (renamed from `AllenixHero.tsx`) | Labs featured layout. Card asymmetry. |
| 3 | How It Works | `HowItWorks.tsx` | 3-step numbered flow. Soft CTA at bottom. |
| 4 | Studios / Newsletter | `StudiosSection.tsx` | Email capture. Vercel KV backend. |
| 5 | CTA | `CTASection.tsx` | Calendly embed widget. Free discovery call. |
| 6 | Footer | `Footer.tsx` | Manifesto link (moved from hero). LinkedIn, email placeholders. |

### Phase 3: Polish and ship

| Step | Action |
|------|--------|
| 1 | Responsive QA at 375px, 768px, 1280px |
| 2 | Accessibility audit (keyboard nav, screen reader, contrast) |
| 3 | Performance check (Lighthouse, bundle size) |
| 4 | OG image and meta tags for social sharing |
| 5 | Deploy to Vercel |

---

## File structure (target)

```
allenix-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: all three fonts, metadata, warm background
│   │   ├── page.tsx                # Home: all sections composed here
│   │   ├── globals.css             # Single source of truth for design tokens
│   │   ├── opengraph-image.tsx     # OG image
│   │   └── manifesto/
│   │       └── page.tsx            # Manifesto (Tailwind classes, semantic HTML)
│   ├── components/
│   │   ├── Header.tsx              # Fixed header: logo + CTA
│   │   ├── Hero.tsx                # Hero: wordmark + subhead + CTA
│   │   ├── UnitExplorer.tsx        # Three units + expand panels
│   │   ├── HowItWorks.tsx          # 3-step process + soft CTA
│   │   ├── StudiosSection.tsx      # Newsletter email capture
│   │   ├── CTASection.tsx          # Calendly embed + copy
│   │   ├── Footer.tsx              # Minimal footer with manifesto link
│   │   └── ui/
│   │       ├── unit-card.tsx       # Simplified: CSS transitions only, no framer-motion
│   │       ├── chip.tsx            # Extracted from AllenixHero
│   │       └── callout.tsx         # Extracted from AllenixHero
│   ├── data/
│   │   └── flywheel.ts            # Unit data (unchanged)
│   └── lib/
│       └── utils.ts                # cn() utility
├── public/
│   ├── logo.png                    # Allenix Logo.png from vault
│   └── favicon.png                 # Allenix Favicon.png from vault
├── tailwind.config.js              # References CSS custom properties only
├── tsconfig.json
├── next.config.mjs
├── postcss.config.js
└── package.json                    # Slimmed: no framer-motion
```

Deleted files:
- `Flywheel.tsx` (unused legacy)
- `Navbar.tsx` (unused)
- `ui/badge.tsx` (unused)
- `ui/blur-fade.tsx` (unused)
- `ui/button.tsx` (unused)
- `ui/card.tsx` (unused)
- `ui/pixel-trail.tsx` (removed)
- `ui/radial-orbital-timeline.tsx` (unused)

---

## Data model

Source: `src/data/flywheel.ts`

```typescript
type FlywheelUnit = 'labs' | 'studios' | 'capital'

interface ConceptItem { key: string; name: string; desc: string }
interface TrackItem { key: string; name: string; desc: string }

interface UnitData {
  name: string
  forming: boolean
  desc: string
  type: 'labs' | 'studios' | 'capital' | 'magnolia'
  concepts?: ConceptItem[]   // Labs: Strategy, Training
  items?: ConceptItem[]      // Studios: 6 content channels
  gtm?: TrackItem[]          // Labs: 8 go-to-market services
  ops?: TrackItem[]          // Labs: 4 operations services
}

const flywheelData: Record<string, UnitData>
// Keys: labs, studios, capital, magnolia
```

---

## Document formatting (Word, PDF, presentations)

Separate from the website. Documents in this vault use:

- Georgia exclusively (system font)
- All text black (#0D0D0D)
- Title (H1): Georgia Bold, 24pt
- Section header: Georgia Bold, 14pt
- Subtitle: Georgia Bold, 11pt
- Body: Georgia Regular, 10pt, line-height 16pt
- Title case only. No all-caps.
- Cyan (#04CCBA) for graphic elements only (dividers). Never for text.

---

## Audit findings (pre-redesign, dark theme)

Full audit run on 2026-04-16. Score: **8.5/20 — Poor**

This audit reflects the **old dark-theme implementation**. The redesign to light + warm addresses the root causes.

| Dimension | Score | Key finding | Fix |
|-----------|-------|-------------|-----|
| Accessibility | 1.5/4 | Zero headings on manifesto. No h1 on home. No skip nav. | Add h1/h2, skip link, nav landmarks |
| Performance | 2/4 | Pixel trail RAF loop. framer-motion for tilt only. | Delete pixel trail, remove framer-motion |
| Theming | 2/4 | Three separate token systems. Manifesto duplicates all colors. | Single CSS custom property system |
| Responsive | 2/4 | Chips 26px tall. Nav link 25px. No tablet breakpoint. | 44px min touch targets. Proper breakpoints |
| Anti-Patterns | 1/4 | Cyan-on-dark AI palette. Three identical cards. Glow effects. Left-stripe borders. | Light theme. Asymmetric cards. No glow. No left-stripes. |

### AI slop patterns (all resolved by redesign)

1. ~~Cyan-on-dark (#00c8b4 on #06080a)~~ → Teal on warm off-white (#04CCBA on #faf9f6)
2. ~~Three identical cards with icons~~ → Asymmetric layout, Labs featured, no decorative icons
3. ~~Glow effects on text and elements~~ → No glow anywhere. Clean surfaces.
4. ~~Left-stripe borders~~ → Full border or background tint only
5. ~~3D tilt cards~~ → CSS-only hover transitions
6. ~~Pixel cursor trail~~ → Deleted
7. ~~Playfair Display as AI reflex~~ → Retained but used with intentionality: wordmark only, not decorative headings everywhere

---

## Voice

- Short sentences. Active voice.
- Numbers over adjectives.
- Never use em dashes. Use periods or colons.
- Banned phrases: "journey", "ecosystem", "synergy", "cutting-edge".
- Houston references must be specific and real: the Ion District, the Ship Channel, the Medical Center, Buffalo Bayou.
- Write for a 50-year-old Gulf South founder-CEO, not a tech buyer.

---

## Placeholders (to be replaced with real values)

| Item | Placeholder | Real value needed |
|------|-------------|-------------------|
| Discovery Call link | Calendly embed placeholder | Ali's Calendly URL (e.g. calendly.com/ali-mamujee/60min) |
| Contact email | `ali@allenix.com` | Confirmed email address |
| LinkedIn URL | `#linkedin` | Ali's LinkedIn profile URL |
| Logo image | `Allenix Logo.png` from vault | Final logo file (currently in vault root) |
| Favicon | `Allenix Favicon.png` from vault | Final favicon file |

### SEO / Meta

- **Page title**: "Allenix — AI Growth Services for Gulf South Operators"
- **Meta description**: "We find the constraint in your business and remove it. AI-powered growth services for mid-market operators in Houston and the Gulf South. Built by operators, for operators."

### Header (fixed, global)

- **Left**: Allenix Logo.png as `<Image>` component
- **Right**: "Book a Discovery Call" in IBM Plex Mono (link to Calendly)
- On scroll: subtle warm off-white background so CTA remains clickable over content
- One job: keep the CTA visible at all times

### Newsletter email storage: Vercel KV (free tier)

Newsletter signups are stored in **Vercel KV**. No external newsletter service needed at this stage.

**Setup:**
1. Install: `npm install @vercel/kv`
2. Create KV store in Vercel dashboard (free tier: 30K commands/day, 256MB storage)
3. Environment variables auto-injected on deploy: `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`

**API route:**
```
POST /api/subscribe
Body: { email: string }
Response: { ok: true } | { error: string }
```

**Implementation:**
- Store emails as `subscriber:<timestamp>` keys in a KV set called `subscribers`
- Basic validation: must contain `@`, not empty
- Deduplication: check if email exists before adding
- Rate limiting: max 3 submissions per IP per hour (Vercel middleware or KV-based)
- No double opt-in yet. Add when migrating to a real newsletter service later.
- Success state: inline confirmation message "You are on the list."
- Error state: inline error message, no alerts

**Data model:**
```typescript
// KV key: set "subscribers"
// KV command: SADD subscribers <email>
// Check exists: SISMEMBER subscribers <email>
```

**Migration path** (when ready for a real newsletter service):
- Export all emails from KV via a simple script
- Import into ConvertKit, Resend, Buttondown, etc.
- Swap the API route to call the new service instead

---

## Process

Before generating code, ask one specific question if anything is unclear. Do not make assumptions about scope, design, or copy. When in doubt, do less and ask.
