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
| Styling | Tailwind CSS v3 + CSS custom properties + inline styles |
| Animation | framer-motion (3D card tilt) |
| Icons | lucide-react |
| Utilities | class-variance-authority, clsx, tailwind-merge |
| Fonts | Google Fonts via next/font: Playfair Display, Libre Baskerville |
| Backend | None. Static site. |
| Deploy | Vercel |
| Live URL | https://allenix.vercel.app |
| Vercel project | `allenix` under `alimamujee-3464s-projects` |

---

## Design system

### Theme

Dark. Background is near-black (#06080a). All surfaces are dark grays. Text is light. Accent is cyan.

### Color palette

Two parallel token systems exist. Tailwind classes are used in `className` props. CSS custom properties are used in inline styles (especially manifesto page and unit cards).

**Tailwind classes** (defined in `tailwind.config.js`):

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-main` | `#06080a` | Page background |
| `bg-card` | `#0d1117` | Card surfaces |
| `border-col` | `#1e2730` | Dividers, borders |
| `text-primary` | `#f0f2f4` | Headlines, strong text |
| `text-secondary` | `#8a9bb0` | Body copy |
| `accent` | `#00c8b4` | Cyan. The ONLY accent color |
| `accent-hover` | `#007d74` | Darker cyan for hover |
| `accent-light` | `#9eeee8` | Teal tint for focus rings |
| `accent-wash` | `#041e1c` | Dark teal for active backgrounds |

**CSS custom properties** (defined in `globals.css`):

| Variable | Hex | Usage |
|----------|-----|-------|
| `--col-bg` | `#06080a` | Background |
| `--col-surface` | `#0d1117` | Surfaces |
| `--col-surface-2` | `#131920` | Elevated surfaces |
| `--col-border` | `#1e2730` | Borders |
| `--col-border-2` | `#2a3540` | Secondary borders |
| `--col-text-1` | `#f0f2f4` | Primary text |
| `--col-text-2` | `#8a9bb0` | Secondary text |
| `--col-text-3` | `#5a6b7e` | Muted labels |
| `--col-accent` | `#00c8b4` | Cyan accent |
| `--col-accent-dim` | `#007d74` | Dimmed accent |
| `--col-accent-bg` | `#041e1c` | Accent backgrounds |

**Rules:**
- Cyan (#00c8b4) is the only accent. No other hues.
- No pure white (#ffffff) as a background color.
- Manifesto body text uses elevated `#c0cdd8` for legibility.

### Typography

**Font loading** (in `layout.tsx`):
- Playfair Display: weights 600 (italic) and 900 (normal)
- Libre Baskerville: weights 400 and 700
- IBM Plex Mono: NOT currently loaded (removed)

**Type hierarchy:**

| Role | Font | Weight | Size | Tracking | Notes |
|------|------|--------|------|----------|-------|
| Manifesto year numbers | Playfair Display | 900 | 96px | -4px | White with text-shadow glow |
| Manifesto section titles | Playfair Display | 900 | 42px | -1px | White with glow |
| Unit names (panels) | Playfair Display | 900 | 40px | -1px | text-primary |
| Card titles | Playfair Display | 600 italic | clamp(22px, 3vw, 30px) | — | Accent when active |
| Manifesto blockquote | Playfair Display | 600 italic | 20px | -0.2px | text-1, left border |
| Body text | Libre Baskerville | 400 | 15-17px | — | line-height 1.8-1.85 |
| Manifesto lead sentences | Libre Baskerville | 700 | 17px | — | White |
| Section labels / chip labels | Libre Baskerville | 700 | 10-11.5px | 1.5-2.5px | Uppercase |
| Nav links | Libre Baskerville | 700 | 14px | 2.5px | Uppercase |

**Rules:**
- Playfair is for big moments only. Never for body text or UI labels.
- Libre Baskerville is the workhorse.
- Never mix more than two typefaces in one layout context.

### Spacing

- Base unit: 8px
- Max content width: 1100px
- Manifesto column: 640px
- Card grid: 3-column desktop, 1-column mobile
- Section gaps (manifesto): 64px+
- Card padding: 24-28px (p-6 sm:p-7)
- Panel padding: 32px

### Interaction patterns

| Element | Effect | Timing |
|---------|--------|--------|
| Unit cards | 3D perspective tilt via framer-motion (mouse tracking) | Spring: stiffness 300, damping 25 |
| Card hover | Scale 1.02, y-offset -6px, elevated shadow | Spring animation |
| Card active | Cyan border + accent-bg + bottom gradient line | 150ms ease-out |
| Panel expand | max-height + opacity transition | 200ms ease-out |
| Chip hover | Border color change, background shift | 120ms ease |
| Magnolia accordion | Toggle with +/- indicator, max-height transition | 200ms ease-out |
| Focus rings | 2px solid accent, offset 3px | — |

### Cursor effect

`CyanPixelTrail` component: renders animated cyan pixels following the cursor. Uses `requestAnimationFrame`. Hides OS cursor on mount (`cursor: none` on body). Fixed z-9999 overlay with `pointer-events: none`.

---

## Site structure

Single-page home (`/`) with manifesto as a separate route (`/manifesto`). The home page is one continuous scroll with distinct sections. No multi-page routing beyond these two routes.

### `/` — Home page sections (top to bottom)

#### Section 1: Hero

**Status: NEEDS REBUILD**

Current state: No hero exists. Visitors land directly on three cards with zero framing.

Target state:
- Allenix wordmark large in Playfair Display 900
- One-line positioning statement below the wordmark
- A sub-line identifying the market (Houston, Gulf South, mid-market, AI era)
- Two CTAs: "Book a Call" (primary) and "Read the Manifesto" (secondary/ghost)
- Generous vertical padding. The wordmark should be the first thing you see, centered.

Copy direction:
- Headline: The Allenix wordmark itself
- Subhead: One sentence that says what Allenix does and who it is for. Not clever. Clear.
- Avoid: "revolutionizing", "empowering", "transforming"

#### Section 2: What We Do (Three Units)

**Status: EXISTS, NEEDS REDESIGN**

Current state: Three identical `UnitCard` components in a grid with expand/collapse detail panels.

Target state:
- Keep the three-unit structure (Labs, Studios, Capital)
- Break the identical-card symmetry. Labs should be visually primary (it is the revenue engine). Studios and Capital are secondary.
- Consider a featured card for Labs with Studios and Capital as smaller companions, or a split layout instead of three equal cards.
- The expand/collapse interaction works well. Keep it.
- Capital needs more substance even at "Forming" stage: add a one-line vision or timeline placeholder.

Interaction changes:
- Remove the 3D tilt effect (framer-motion dependency). Replace with a simpler hover: border color shift + subtle y-offset via CSS transition.
- Remove the cyan glow on active cards. Use a cleaner active indicator.

#### Section 3: How It Works (The Flywheel)

**Status: NEW**

A visual representation of the Labs / Studios / Capital flywheel. Not the old SVG diagram. Something simpler and more editorial.

Options:
- A three-step horizontal flow with arrows: Studios (builds audience) -> Labs (validates companies) -> Capital (acquires them) -> back to Studios
- Or a simple statement + three connected icons, no SVG required
- Magnolia sits underneath all three as the platform layer

Purpose: Help visitors understand the three units are a single machine, not three separate businesses.

#### Section 4: Studios / Newsletter Signup

**Status: NEW**

A section that shows Studios is real, not just a concept.

Contents:
- A pull quote or teaser from the latest Allenix Letter
- "Subscribe to the Allenix Letter" email capture (newsletter waitlist)
- Links to podcast, LinkedIn, or wherever Studios content lives (even if just placeholder URLs)
- Keep it short. This section builds credibility, not conversion.

The email capture form:
- Single field: email address
- Submit button: "Subscribe" or "Join the waitlist"
- No backend yet. Wire to a free service (ConvertKit, Resend, or just a `mailto:` link for now) or collect to a Vercel KV store.
- Success state: A brief confirmation message inline

#### Section 5: CTA (Book a Call)

**Status: NEW**

The conversion point. This is the most important section on the page after the hero.

Contents:
- A headline that creates urgency or specificity (not "Contact Us")
- 1-2 sentences about what happens when you book a call (what to expect, who it is with, how long)
- Primary CTA button: "Book a Call" (links to Calendly, SavvyCal, or similar)
- Secondary option: email address for those who prefer it
- No form required. A calendar link is higher-conversion than a contact form.

Copy direction:
- "Let's talk" or "Book 30 minutes" or "See if Labs is right for your business"
- Not: "Reach out", "Get in touch", "Contact us"

#### Section 6: Footer

**Status: NEW**

Minimal footer.

Contents:
- Allenix wordmark (small)
- Location: "Houston, Texas"
- Links: The Manifesto, LinkedIn (Ali's profile), email
- Copyright line
- Nothing else. No social icons array, no newsletter signup repeat, no site map.

### `/manifesto` — Manifesto

**Status: EXISTS, NEEDS FIXES**

Full editorial page. Content is strong. Structural fixes needed:

1. Replace all div-based section titles with proper `<h2>` elements. The "1836" title block should be `<h1>`.
2. Wrap header navigation in `<nav>` with `aria-label`.
3. Add a skip-to-content link.
4. Remove the left-border stripe on the blockquote. Use indentation + italic + full border instead.
5. Migrate inline styles to Tailwind classes for consistency with the rest of the site.

Content stays the same. The writing is the site's strongest asset.

---

## Conversion funnel

The home page has one job: move visitors toward a call or newsletter signup.

```
Visitor lands
  -> Hero: understands what Allenix is (3 seconds)
  -> What We Do: sees the three units and clicks one (10 seconds)
  -> How It Works: understands the flywheel (optional, 5 seconds)
  -> Studios: sees there is real content, subscribes (optional)
  -> CTA: books a call (primary conversion)
```

Every section either moves the visitor down this funnel or provides enough credibility to justify taking the next step. Nothing decorative.

---

## Implementation plan

### Phase 1: Fix what is broken (audit findings)

These must happen before any new sections are built.

| Priority | Issue | Action | Files affected |
|----------|-------|--------|----------------|
| P0 | No semantic HTML on manifesto | Replace div titles with h1/h2, add nav landmark, add skip link | `manifesto/page.tsx` |
| P0 | No h1 on home page | Add h1 to hero section | `page.tsx` or new hero component |
| P1 | Touch targets too small (26px chips, 25px nav) | Increase chip and nav padding to meet 44px minimum | `AllenixHero.tsx`, `globals.css`, `page.tsx` |
| P1 | Accent color reads as AI-generated | Shift cyan (#00c8b4) to a more distinctive hue | `tailwind.config.js`, `globals.css`, all inline color refs |
| P1 | Left-stripe borders (banned pattern) | Replace with full border or background tint | `globals.css:110-118`, `manifesto/page.tsx:108` |
| P1 | Text-3 color fails WCAG AA (~2.7:1) | Raise `--col-text-3` to at least `#7a8d9f` | `globals.css`, `tailwind.config.js` |
| P2 | Three separate token systems | Consolidate to one source of truth | `tailwind.config.js`, `globals.css`, `manifesto/page.tsx` |
| P2 | Pixel cursor trail | Remove entirely or rebuild without hiding OS cursor | `pixel-trail.tsx`, `page.tsx`, `manifesto/page.tsx` |
| P2 | framer-motion for tilt only | Replace with CSS hover transforms, remove dependency | `unit-card.tsx`, `package.json` |
| P2 | Unused components | Delete: Flywheel.tsx, Navbar.tsx, unused ui/ files | 7 files |
| P2 | Manifesto all inline styles | Migrate to Tailwind classes | `manifesto/page.tsx` |
| P3 | No reduced motion support | Check prefers-reduced-motion, disable/simplify animations | `pixel-trail.tsx`, `unit-card.tsx` |
| P3 | Panel expand max-height hack | Replace with grid-template-rows transition | `AllenixHero.tsx` |

### Phase 2: Build new sections

Order matters. Each section builds on the previous.

| Step | Section | Description | Key decisions needed |
|------|---------|-------------|---------------------|
| 1 | Hero | Wordmark + positioning + dual CTAs | Final copy. CTA link destination (Calendly URL). |
| 2 | CTA (Book a Call) | Calendar link + email + copy | Calendly vs SavvyCal vs other. Ali's email. |
| 3 | Studios / Newsletter | Email capture + content teaser | Newsletter service (ConvertKit, Resend, etc). Which content to feature. |
| 4 | How It Works | Flywheel visual | Design approach (icons vs flow diagram vs text). |
| 5 | Footer | Wordmark + location + links | LinkedIn URL. Email address. |

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
│   │   ├── layout.tsx              # Root layout: fonts, metadata, dark body
│   │   ├── page.tsx                # Home: all sections composed here
│   │   ├── globals.css             # Single source of truth for design tokens
│   │   ├── opengraph-image.tsx     # OG image
│   │   └── manifesto/
│   │       └── page.tsx            # Manifesto (Tailwind classes, semantic HTML)
│   ├── components/
│   │   ├── Hero.tsx                # New: hero section with CTAs
│   │   ├── UnitExplorer.tsx        # Renamed from AllenixHero: three units + panels
│   │   ├── FlywheelFlow.tsx        # New: how it works visual
│   │   ├── StudiosSection.tsx      # New: newsletter + content teaser
│   │   ├── CTASection.tsx          # New: book a call
│   │   ├── Footer.tsx              # New: minimal footer
│   │   └── ui/
│   │       ├── unit-card.tsx       # Simplified (no framer-motion)
│   │       ├── chip.tsx            # Extracted from AllenixHero
│   │       └── callout.tsx         # Extracted from AllenixHero
│   ├── data/
│   │   └── flywheel.ts            # Unit data (unchanged)
│   └── lib/
│       └── utils.ts                # cn() utility
├── tailwind.config.js              # Consolidated tokens only
├── tsconfig.json
├── next.config.mjs
├── postcss.config.js
└── package.json                    # Slimmed: remove framer-motion, lucide-react
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

## Current state pages (for reference)

### `/` — Home (as built)

**Header:** Fixed top bar. Allenix wordmark (Playfair 900, 31px) on left. "The Manifesto" nav link on right. Background: gradient from rgba(6,8,10,0.95) to transparent, with backdrop blur.

**Hero (`AllenixHero` component):**

Three `UnitCard` components in a responsive grid:

| Card | Icon | Tagline | Forming |
|------|------|---------|---------|
| Labs | Zap | Agentic growth services. We go deep, find the highest-ROI levers, and execute alongside you. | No |
| Studios | Mic | Brand and audience engine. The trade publication of operator-led growth in the Gulf South. | No |
| Capital | TrendingUp | Acquisition compounding arm. Labs validates companies. Capital acquires them. | Yes |

Clicking a card expands a detail panel below:

**Labs panel:**
1. Unit name + description
2. Strategy and Training concept boxes (expandable)
3. Growth section with two-column grid: Go-to-Market (8 chips) and Operations (4 chips)
4. Chip callout descriptions
5. "Powered by Magnolia" glow bar
6. Magnolia expandable accordion

**Studios panel:**
1. Unit name + description
2. Six chips: Editorial, Podcast, Video, Social, Events, Research
3. Chip callout descriptions

**Capital panel:**
1. Unit name + description
2. No chips or sub-components (forming stage)

### `/manifesto` — Manifesto (as built)

Full editorial page with fixed header (Allenix links home, "The Manifesto" as current indicator).

**Sections in order:**
1. Title block: "1836" (large glowing number), "A manifesto for Houston" (subtitle), "By Ali Mamujee" (label)
2. The Stakes
3. 1836 (Allen brothers origin story, includes blockquote of founding ad)
4. 2026 (Houston's current rising moment)
5. The Bet (three-unit structure, includes a card showing "Allenix in 2036" with Labs/Studios/Capital columns and outcome)
6. 2036 (vision)
7. The Invitation (closing)
8. Signature: "Ali Mamujee" + "Back to Allenix" link

All styles are inline (no Tailwind classes on this page). Uses local `SectionBlock` and `BodyP` sub-components.

---

## File structure (current, for reference)

```
allenix-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, metadata, dark body
│   │   ├── page.tsx                # Home: header + AllenixHero
│   │   ├── globals.css             # CSS variables, base styles, overrides
│   │   ├── opengraph-image.tsx     # OG image
│   │   └── manifesto/
│   │       └── page.tsx            # Manifesto (all inline styles)
│   ├── components/
│   │   ├── AllenixHero.tsx         # Main interactive: cards + panels
│   │   ├── Flywheel.tsx            # SVG flywheel (UNUSED)
│   │   ├── Navbar.tsx              # (UNUSED, not imported)
│   │   └── ui/
│   │       ├── badge.tsx           # (UNUSED)
│   │       ├── blur-fade.tsx       # (UNUSED)
│   │       ├── button.tsx          # (UNUSED)
│   │       ├── card.tsx            # (UNUSED)
│   │       ├── pixel-trail.tsx     # CyanPixelTrail cursor effect
│   │       ├── radial-orbital-timeline.tsx  # (UNUSED)
│   │       └── unit-card.tsx       # 3D tilt card (framer-motion)
│   ├── data/
│   │   └── flywheel.ts            # All unit data
│   └── lib/
│       └── utils.ts                # cn() utility
├── tailwind.config.js
├── tsconfig.json
├── next.config.mjs
├── postcss.config.js
└── package.json
```

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

## Audit findings (8.5/20 — Poor)

Full audit run on 2026-04-16. Score breakdown:

| Dimension | Score | Key finding |
|-----------|-------|-------------|
| Accessibility | 1.5/4 | Zero headings on manifesto. No h1 on home. No skip nav. |
| Performance | 2/4 | Pixel trail RAF loop. framer-motion for tilt only. |
| Theming | 2/4 | Three separate token systems. Manifesto duplicates all colors. |
| Responsive | 2/4 | Chips 26px tall. Nav link 25px. No tablet breakpoint. |
| Anti-Patterns | 1/4 | Cyan-on-dark AI palette. Three-card grid. Glow effects. Left-stripe borders. |

### AI slop assessment

The site fails the AI slop test. Seven specific tells:

1. **Cyan-on-dark (#00c8b4 on #06080a).** The default AI website palette.
2. **Three identical cards with icons.** Labs (Zap), Studios (Mic), Capital (TrendingUp).
3. **Glow effects on text and elements.** text-shadow, box-shadow glow on Magnolia bar and active cards.
4. **Left-stripe borders.** `border-left: 2px solid` on active chips and manifesto blockquote.
5. **Playfair Display.** AI reflex font for "elegant" projects.
6. **3D tilt cards.** Common AI "wow" effect that adds complexity without meaning.
7. **Pixel cursor trail.** Hides OS cursor. Party trick, not design.

These are integrated into the implementation plan above. Fix the accent color, remove the glow effects, replace the left-stripe borders, and the site will immediately look more intentional.

### Contrast failures

| Color | Context | Ratio | Passes? |
|-------|---------|-------|---------|
| `#5a6b7e` (--col-text-3) on `#06080a` | Muted labels, "Forming" badge | ~2.7:1 | FAILS AA (needs 4.5:1) |
| `#6a7a8a` on `#06080a` | Manifesto muted text | ~3.5:1 | FAILS AA |
| `#8a9bb0` (--col-text-2) on `#06080a` | Body copy | ~5.0:1 | Passes AA, fails AAA |
| `#c0cdd8` on `#06080a` | Manifesto body (elevated) | ~10.7:1 | Passes AAA |

Minimum fix: raise `--col-text-3` to `#7a8d9f` (~4.5:1).

---

## Voice

- Short sentences. Active voice.
- Numbers over adjectives.
- Never use em dashes. Use periods or colons.
- Banned phrases: "journey", "ecosystem", "synergy", "cutting-edge".
- Houston references must be specific and real: the Ion District, the Ship Channel, the Medical Center, Buffalo Bayou.
- Write for a 50-year-old Gulf South founder-CEO, not a tech buyer.

---

## Open questions (need Ali's input)

Before building, these need answers:

1. **Book a Call link.** What calendar service? (Calendly, SavvyCal, Cal.com, Google Calendar link?) What is the URL?
2. **Email address.** What email should appear on the site for contact? (ali@allenix.com? Something else?)
3. **Newsletter service.** What email platform for the Allenix Letter? (ConvertKit, Resend, Mailchimp, Buttondown?) Or should we just collect emails to a list for now?
4. **LinkedIn URL.** Ali's LinkedIn profile URL for the footer and Studios section.
5. **Accent color direction.** The audit flagged cyan-on-dark as an AI tell. Open to shifting the accent? If so, toward what? (warmer teal, green, amber, or keep cyan and fix the other tells instead?)
6. **Hero copy.** What is the one-line positioning statement that goes below the wordmark? Need Ali's input or approval on draft copy.

---

## Process

Before generating code, ask one specific question if anything is unclear. Do not make assumptions about scope, design, or copy. When in doubt, do less and ask.
