# Allenix — Codex Project Context

## What this project is

Allenix is a Houston-built firm that helps American mid-market operators ($5M–$50M revenue) win the AI era. Three units: Labs (agentic growth services, active), Media (brand and audience engine, building), Capital (acquisition arm, third act). The underlying platform is Magnolia — internal name only, use "the system" in client copy.

Founder: Ali Mamujee, Houston Ion District.

**Site:** allenix.com is a client acquisition tool targeting $5M–$50M professional services founder-CEOs. `/manifesto` serves investors and co-founders. Do not conflate the two audiences. Memory files have live build state. This file is the canonical brand reference.

---

## Tech stack

### Website
- Next.js 14 App Router, TypeScript, Tailwind CSS
- No component library. Custom components only.
- Fonts: Playfair Display, Libre Baskerville, IBM Plex Mono (via next/font)
- No animation library. CSS transitions only, 150–200ms ease-out.
- No backend. Static site.
- Deploy: `npx vercel --prod` — Vercel project `allenix` under `alimamujee-3464s-projects`
- Live: https://allenix.vercel.app

### Business tools
- Google Studio · HubSpot · Zoom · Resend · LinkedIn Sales Navigator · Calendly · Codex

---

## Brand system

### Colors
Defined as Tailwind custom colors in `tailwind.config.ts`. Never use Tailwind defaults.

```
accent:        #04CCBA  (cyan — ONLY accent color)
accent-hover:  #029e90  (hover states)
accent-light:  #9eeee8  (decorative borders)
accent-wash:   #edfaf9  (card/callout backgrounds — never for text)
bg-main:       #faf9f6  (page background — always)
bg-card:       #f2f0eb  (card surfaces)
border-col:    #d4d0c8  (dividers, input borders)
text-primary:  #0d0d0d  (headlines, body)
text-secondary:#1a1a1a  (subheadings, captions)
```

Rules: No pure white (#fff). Cyan is the only accent. No other hues.

### Typography — Web

| Role | Font | Weight | Size | Notes |
|------|------|--------|------|-------|
| H1 | Playfair Display | 900 | 48–64px | tracking -1px |
| H2 | Playfair Display | 900 | 32–40px | tracking -0.5px |
| H3 | Playfair Display | 600 italic | 22–26px | |
| H4 | Libre Baskerville | 700 | 18px | |
| Body | Libre Baskerville | 400 | 16–18px | line-height 1.75 |
| Labels | IBM Plex Mono | 400 | 20px | tracking 0.5px, uppercase |

Rules: Playfair for big moments only. Baskerville is the prose workhorse. Mono for labels/tags/metadata. Never mix more than two typefaces in one layout context.

### Typography — Documents (Word, PDF, presentations)

Georgia exclusively — universally available, renders correctly everywhere.

| Role | Style | Size |
|------|-------|------|
| Title | Georgia Bold | 24pt |
| Doc label | Georgia Bold | 13pt |
| Section header | Georgia Bold | 14pt |
| Subtitle | Georgia Bold | 11pt |
| Body | Georgia Regular | 10pt, line-height 16pt |

Rules: All text #0D0D0D black. No colour text of any kind. No all-caps. No dates or "Confidential" label. Cyan (#04CCBA) only for graphic divider lines — never text.

### Spacing and layout
- Base unit: 8px
- Max content width: `max-w-[1100px] mx-auto`
- Section padding: 80–120px desktop, 48px mobile
- Card padding: 32px
- Grid: 12-column, 24px gutters

### Interaction
- Hover transitions: 150ms ease-out
- Focus/hover glow: `box-shadow: 0 0 0 3px #9eeee8`
- No parallax. No scroll animations. Motion is functional only.

---

## Flywheel component

Interactive SVG + HTML. Three nodes (Labs, Media, Capital) in a triangular flywheel. Data lives in `src/data/flywheel.ts`. Component at `src/components/Flywheel.tsx` and `src/components/UnitExplorer.tsx`. Read those files before editing — do not reconstruct data here.

Active node state: border `#04CCBA` stroke-width 1.5, fill `#edfaf9`.

---

## Voice rules

- Short sentences. Active voice.
- Numbers over adjectives.
- No em dashes. Use periods or colons.
- Never: "journey", "ecosystem", "synergy", "cutting-edge".
- Houston references must be specific: Ion District, Ship Channel, Medical Center, Buffalo Bayou.
- Write for a 50-year-old Gulf South founder-CEO, not a tech buyer.
