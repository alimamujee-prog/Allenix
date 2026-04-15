# Allenix — Claude Code Project Context

## What this project is

Allenix is a Houston-built firm that helps Gulf South mid-market operators ($10M–$100M revenue) win the AI era. The firm has three units: Labs (agentic growth services), Studios (brand and audience engine), and Capital (acquisition compounding arm). The underlying platform that powers all three is called Magnolia.

The founder is Ali Mamujee, based in Houston, Ion District. Former Mercatus operator.

This website is a pitch and brand artifact. It is not a marketing site with generic copy. It is a visual and interactive representation of what Allenix is building. The primary audience is mentors, investors, and potential co-founders. The goal is for someone to land on this page, explore the flywheel, understand the three-unit structure, and feel like they are looking at a serious, founder-built firm.

---

## Tech stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- No component library. Custom components only.
- Google Fonts via next/font: Playfair Display, Libre Baskerville, IBM Plex Mono
- No animations library. CSS transitions only, 150–200ms ease-out.
- No backend. This is a static site for now.
- Deploy target: Vercel
- Live URL: https://allenix.vercel.app
- Vercel project: `allenix` under `alimamujee-3464s-projects`

---

## Brand system

### Colors

Use these as Tailwind CSS custom colors in `tailwind.config.ts`. Never use Tailwind's default color palette — only these.

```
accent:          #04CCBA  (cyan — the ONLY accent color)
accent-hover:    #029e90  (darker cyan for hover states)
accent-light:    #9eeee8  (teal tint for decorative borders)
accent-wash:     #edfaf9  (near-white teal for card/callout backgrounds)
bg-main:         #faf9f6  (warm off-white — always the page background)
bg-card:         #f2f0eb  (card surfaces, sidebar panels)
border-col:      #d4d0c8  (dividers, input borders)
text-primary:    #0d0d0d  (headlines, body copy)
text-secondary:  #1a1a1a  (subheadings, captions)
```

Rules:
- Never use pure white (#ffffff) anywhere.
- Cyan (#04CCBA) is the only accent. No other hues.
- Accent wash (#edfaf9) is for surfaces only. Never for text.

### Typography

**Web (Next.js)**
```typescript
// In layout.tsx
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

Web type hierarchy:
- H1: Playfair Display 900, 48-64px, tracking -1px
- H2: Playfair Display 900, 32-40px, tracking -0.5px
- H3: Playfair Display 600 italic, 22-26px
- H4: Libre Baskerville 700, 18px
- Body: Libre Baskerville 400, 16-18px, line-height 1.75
- Labels/caps: IBM Plex Mono 400, 20px, tracking 0.5px, uppercase

Web rules:
- Playfair is for big moments only. Not for body text or UI labels.
- Libre Baskerville is the workhorse for editorial and prose.
- IBM Plex Mono is for labels, tags, metadata, captions.
- Never mix more than two typefaces in one layout context.

**Documents (Word, PDF, presentations)**

Use Georgia exclusively. It is universally available across Mac, Windows, and all Office applications. Do not use Libre Baskerville or IBM Plex Mono in documents — they are not system fonts and may not render correctly.

Document type hierarchy:
- Title (H1): Georgia Bold, 24pt, #0D0D0D (black)
- Document label e.g. "Strategy Document": Georgia Bold, 13pt, #0D0D0D (black)
- Section header e.g. "1. Strategy Argument": Georgia Bold, 14pt, #0D0D0D (black)
- Subtitle e.g. "Status Quo": Georgia Bold, 11pt, #0D0D0D (black)
- Body: Georgia Regular, 10pt, #0D0D0D (black), line-height 16pt

Document rules:
- Georgia only. No other typefaces in any document.
- All text is black (#0D0D0D). No grey, no colour text.
- Never use all-caps or uppercase styling on any text. Use title case only.
- Section headers must be larger than subtitles. Subtitles must be larger than body.
- No dates, no "Confidential" label. Keep documents minimal.
- Cyan (#04CCBA) may be used only for graphic elements such as divider lines. Never for text.
- No coloured text of any kind in documents.

### Spacing and layout

- Base unit: 8px
- Max content width: 1100px (`max-w-[1100px] mx-auto`)
- Section vertical padding: 80–120px desktop, 48px mobile
- Card padding: 32px
- Grid: 12-column, 24px gutters

### Interaction

- Hover transitions: 150ms ease-out
- Focus/hover glow: `box-shadow: 0 0 0 3px #9eeee8`
- No parallax. No scroll animations. Motion is functional.

---

## Site structure

For now, build a single page (`/`). It has two sections:

### Section 1: Hero

Simple. The Allenix wordmark large in Playfair Display 900. Below it, one line of copy in IBM Plex Mono caps:

```
HOUSTON · GULF SOUTH · AI ERA
```

Below that, a single sentence in Libre Baskerville body:

```
Three units. One platform. Built for the operators the coasts underestimated.
```

No CTA button yet. No hero image. Generous white space. Warm off-white background.

### Section 2: The Flywheel (the main interactive component)

This is the core of the page. See the component specification below.

---

## The Flywheel component

This is an interactive SVG + HTML component. It shows Labs, Studios, and Capital as three nodes connected by curved arrows in a triangular flywheel. Clicking a node expands a panel below showing that unit's description and sub-components. Clicking a sub-component chip shows a one-line description.

### Layout

```
[Studios — top center]
      /              \
[Capital — bottom left]  [Labs — bottom right]
```

Arrows (clockwise):
- Studios → Labs: "builds the audience"
- Labs → Capital: "validates companies"
- Capital → Studios: "amplifies the win"

The SVG flywheel sits above the expansion panel. When no unit is selected, the panel area is empty. When a unit is clicked, the panel fades in below the flywheel.

### Node active state

When a node is active:
- Border changes to `#04CCBA`, stroke-width 1.5
- Fill changes to `#edfaf9`

### Component file location

`src/components/Flywheel.tsx`

### Data structure

```typescript
// src/data/flywheel.ts

export interface ConceptItem {
  key: string
  name: string
  desc: string
}

export interface TrackItem {
  key: string
  name: string
  desc: string
}

export interface UnitData {
  name: string
  forming: boolean
  desc: string
  type: 'labs' | 'studios' | 'capital' | 'magnolia'
  concepts?: ConceptItem[]
  items?: ConceptItem[]
  gtm?: TrackItem[]
  ops?: TrackItem[]
}

export const flywheelData: Record<string, UnitData> = {
  labs: {
    name: 'Labs',
    forming: false,
    type: 'labs',
    desc: 'We go deep inside your business, identify the highest-ROI opportunities, and deploy the tools, people, and platform that execute alongside you. Labs is the engine. It is how Allenix delivers measurable revenue growth and operational efficiency to every client we take on.',
    concepts: [
      {
        key: 'strategy',
        name: 'Strategy',
        desc: 'A two-week diagnostic that maps every revenue workflow and produces a prioritized AI Opportunity Map with dollar-quantified levers. The entry point for every Labs engagement. We tell you what to build and what to stop building.',
      },
      {
        key: 'training',
        name: 'Training',
        desc: 'In-person workshops and team cohorts that meet your operators where they are. We upskill the people who have to run the system after we leave. Includes an online academy for ongoing learning at scale.',
      },
    ],
    gtm: [
      { key: 'positioning', name: 'Positioning', desc: 'We define exactly who you are for, what you do for them, and why you win. The foundation every other growth activity is built on.' },
      { key: 'messaging', name: 'Messaging', desc: 'We translate your positioning into words that land with your actual buyer. Pitch language, proposal language, website copy, and sales scripts.' },
      { key: 'website', name: 'Website', desc: 'We rebuild or redesign your web presence to convert the traffic you are already getting. Built for the operator buyer, not the general market.' },
      { key: 'sales-enablement', name: 'Sales Enablement', desc: 'We build the tools your sales team needs to close faster. Pitch decks, one-pagers, case studies, proposal templates, and objection guides.' },
      { key: 'crm', name: 'CRM Optimization', desc: 'We rebuild your pipeline stages to match how deals actually move, automate the follow-up no one remembers, and create dashboards the CEO actually reads.' },
      { key: 'content-strategy', name: 'Content Strategy', desc: 'We design the content system that keeps you visible between sales calls. Every piece has a job: attract, educate, or convert.' },
      { key: 'seo', name: 'SEO / AEO', desc: 'We optimize your digital presence for both search engines and AI answer engines. Your buyers are searching. We make sure you show up.' },
      { key: 'outbound', name: 'Outbound', desc: 'We build and run the outbound motion that finds your next ten clients before they find you. Sequences, targeting, messaging, and follow-up — automated by Magnolia.' },
    ],
    ops: [
      { key: 'proposal-automation', name: 'Proposal Automation', desc: 'An agent that generates first-draft proposals in minutes from a short intake form. Cuts proposal time from hours to minutes. One of the fastest ROI wins in any engagement.' },
      { key: 'reporting', name: 'Reporting', desc: 'We design and automate the dashboards your leadership team actually uses. Real-time P&L impact, pipeline health, and growth OS performance in one view.' },
      { key: 'document-processing', name: 'Document Processing', desc: 'Agents that read, classify, and extract data from documents that slow your team down. RFPs, contracts, submittals, invoices. The manual work disappears.' },
      { key: 'workflow-automation', name: 'Workflow Automation', desc: 'We identify the five workflows eating the most time and build agents that handle them without a human in the loop. The starting point for everything Magnolia does.' },
    ],
  },
  studios: {
    name: 'Studios',
    forming: false,
    type: 'studios',
    desc: 'Studios makes Allenix the trade publication of operator-led growth in the Gulf South. It is the brand that brings every Labs client to the door. Every piece of content we publish makes the next client conversation easier. Studios is not marketing. It is distribution.',
    items: [
      { key: 'editorial', name: 'Editorial', desc: 'The weekly Allenix Letter and longform operator content that establishes what we believe. The intellectual foundation that gives operators a reason to follow us before they are ready to buy.' },
      { key: 'podcast', name: 'Podcast', desc: 'Long-form conversations with Gulf South founder-CEOs. Our guest is our warm prospect. Nothing builds trust faster than a real conversation that does not feel like a sales call.' },
      { key: 'video', name: 'Video', desc: 'Short-form clips distributed on LinkedIn and YouTube. The amplification layer that takes Editorial and Podcast content to people who do not read or listen.' },
      { key: 'social', name: 'Social', desc: "Ali's personal brand and Allenix distribution on LinkedIn. The channel where the founder-CEO buyer lives. Every piece of content flows through here first." },
      { key: 'events', name: 'Events', desc: 'Operator dinners, roundtables, and eventually an annual conference. The highest-trust, highest-conversion channel we have. The room closes relationships that content cannot.' },
      { key: 'research', name: 'Research', desc: 'The annual State of the Gulf South Operator report. Primary data that press, policy, and investors cite. This is what makes Allenix the source of record for its market.' },
    ],
  },
  capital: {
    name: 'Capital',
    forming: true,
    type: 'capital',
    desc: 'Labs validates companies. Capital acquires them. The same platform that made them more valuable runs inside from day one of the deal. We are not a private equity firm. We are the operator buyer that understands the Gulf South better than anyone — because we built it. Allenix Capital turns one great firm into a portfolio of compounding ones, each running on Magnolia, each amplified by Studios. The third act of the machine.',
    items: [],
  },
  magnolia: {
    name: 'Magnolia',
    forming: false,
    type: 'magnolia',
    desc: 'The agentic operating system that runs underneath Labs, Studios, and Capital. Magnolia is what turns a services firm into a platform company. Every Labs engagement adds to it. Every acquisition runs on it. Every piece of Studios content trains it. It is the nervous system of Allenix — the connective tissue that makes all three units stronger together than apart.',
    items: [],
  },
}
```

### Interaction behavior

State: `activeUnit: string | null` and `activeItem: string | null`

- Click a flywheel node: sets activeUnit, clears activeItem, shows panel
- Click same node again: clears activeUnit, hides panel
- Click a chip in the panel: sets activeItem, shows description callout
- Click same chip again: clears activeItem, hides description callout
- Switching units: clears activeItem

Labs panel layout (in order):
1. Unit name + description
2. Concept chips (Strategy, Training) with description callout below
3. Growth section header with sub-label
4. Two-column track layout: Go-to-Market (8 chips) and Operations (4 chips)
5. Track description callout below tracks
6. Magnolia bar at the bottom (click to expand Magnolia description inline)

Studios panel layout:
1. Unit name + description
2. Six chips (Editorial, Podcast, Video, Social, Events, Research)
3. Description callout below

Capital panel layout:
1. Unit name + "Forming" badge + description
2. No chips (Capital is not yet defined at service level)

---

## What to build now

1. `src/app/layout.tsx` — root layout with fonts, metadata, warm background
2. `src/app/page.tsx` — single page with Hero and Flywheel sections
3. `src/components/Flywheel.tsx` — the interactive flywheel component (client component)
4. `src/data/flywheel.ts` — the data file above
5. `tailwind.config.ts` — with the custom Allenix color tokens
6. `src/app/globals.css` — base styles, CSS custom properties

## What NOT to build yet

- Navigation / header / footer
- Contact form
- Blog or editorial section
- Any backend, API routes, or database
- Authentication
- Multi-page routing beyond the single index page
- Mobile-specific breakpoints beyond basic responsiveness (desktop-first for now)

---

## File structure

```
allenix-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── Flywheel.tsx
│   └── data/
│       └── flywheel.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── CLAUDE.md
```

---

## Voice rules for any copy Claude writes

- Short sentences. Active voice.
- Numbers over adjectives.
- Never use em dashes. Use periods or colons.
- Do not use the phrase "journey", "ecosystem", "synergy", or "cutting-edge".
- Houston is specific. If referencing the city, reference something real: the Ion District, the Ship Channel, the Medical Center, Buffalo Bayou.
- Write for a 50-year-old Gulf South founder-CEO, not a tech buyer.

---

## Questions to ask before generating code

If anything in this brief is unclear, ask one specific question before writing code. Do not make assumptions about scope, design, or copy. When in doubt, do less and ask.
