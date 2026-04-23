# Manifesto Page Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the manifesto page title, add a reader summary, wire up a copy-link share button, fix below-minimum font sizes, and add page-level SEO metadata.

**Architecture:** The manifesto page (`page.tsx`) is currently a server component, which enables `export const metadata`. The share button requires client-side state (`useState`, clipboard API), so it is extracted as a separate `ShareButton` client component. The page itself stays a server component — no `'use client'` added to it.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (custom tokens), `navigator.clipboard` API, React `useState`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `allenix-website/src/components/ShareButton.tsx` | Client component: copy-link button with 2s "Copied" feedback |
| Modify | `allenix-website/src/app/manifesto/page.tsx` | Title rename, reader summary, ShareButton import, metadata export, font size fixes |

---

### Task 1: Create ShareButton client component

**Files:**
- Create: `allenix-website/src/components/ShareButton.tsx`

- [ ] **Step 1: Create the file with the complete implementation**

```tsx
'use client'

import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: copied ? 'var(--col-accent)' : 'var(--col-text-3)',
        border: '1px solid',
        borderColor: copied ? 'var(--col-accent)' : 'var(--col-border)',
        borderRadius: '3px',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'color 150ms ease-out, border-color 150ms ease-out',
        whiteSpace: 'nowrap',
      }}
      aria-label="Copy link to manifesto"
    >
      <svg
        width="12" height="12" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      {copied ? 'Copied' : 'Copy link'}
    </button>
  )
}
```

- [ ] **Step 2: Verify the file saved correctly**

```bash
cat allenix-website/src/components/ShareButton.tsx | head -5
```

Expected output starts with: `'use client'`

- [ ] **Step 3: Commit**

```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix
git add allenix-website/src/components/ShareButton.tsx
git commit -m "feat: add ShareButton client component with clipboard copy"
```

---

### Task 2: Update manifesto page.tsx

**Files:**
- Modify: `allenix-website/src/app/manifesto/page.tsx`

This task covers all page changes in one commit: title rename, metadata export, reader summary, ShareButton placement, and font size fixes.

- [ ] **Step 1: Add metadata export and import ShareButton**

Replace the top of the file (lines 1–3) with:

```tsx
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export const metadata = {
  title: 'The Allenix Manifesto',
  description:
    'Allenix is a Houston-built firm installing agentic operating systems inside $5M–$50M professional services businesses. This document explains why it was built here, what we are building toward, and the ten-year bet behind it.',
}

export default function ManifestoPage() {
```

- [ ] **Step 2: Replace the title block**

Find this exact block (lines 14–32):

```tsx
          {/* ── Title block ── */}
          <div style={{ marginBottom: '16px' }}>
            <h1 className="font-display" style={{
              fontWeight: 900,
              fontSize: '96px', lineHeight: 1, letterSpacing: '-4px',
              color: 'var(--col-text-1)',
              marginBottom: '16px',
            }}>
              1836
            </h1>
            <div className="font-display" style={{
              fontWeight: 600, fontStyle: 'italic',
              fontSize: '24px', color: 'var(--col-text-3)', letterSpacing: '-0.3px', marginBottom: '14px',
            }}>
              A manifesto for Houston
            </div>
            <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--col-text-3)' }}>
              By Ali Mamujee
            </div>
          </div>
```

Replace with:

```tsx
          {/* ── Title block ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <h1 className="font-display" style={{
                fontWeight: 900,
                fontSize: 'clamp(52px, 10vw, 96px)', lineHeight: 1, letterSpacing: '-4px',
                color: 'var(--col-text-1)',
                margin: 0,
              }}>
                The Allenix Manifesto
              </h1>
              <div style={{ flexShrink: 0, paddingBottom: '4px' }}>
                <ShareButton />
              </div>
            </div>
            <div className="font-display" style={{
              fontWeight: 600, fontStyle: 'italic',
              fontSize: '24px', color: 'var(--col-text-3)', letterSpacing: '-0.3px', marginBottom: '14px',
            }}>
              A manifesto for Houston
            </div>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '20px' }}>
              By Ali Mamujee
            </div>
            {/* Reader summary */}
            <p className="font-body" style={{
              fontSize: '15px',
              color: 'var(--col-text-3)',
              lineHeight: 1.75,
              fontStyle: 'italic',
              margin: '0',
            }}>
              Allenix is a Houston-built firm installing agentic operating systems inside
              $5M&ndash;$50M professional services businesses. This document explains why it was built
              here, what we are building toward, and the ten-year bet behind it. Written for the
              people who might want to build it with us.
            </p>
          </div>
```

- [ ] **Step 3: Fix below-minimum font sizes in the three-unit card**

Find the three-unit card label (inside the card, around line 184):

```tsx
              <div className="font-display" style={{ fontWeight: 900, fontSize: '13px', letterSpacing: '0.5px', color: 'var(--col-text-1)', textAlign: 'center', marginBottom: '4px' }}>
                Allenix in 2036
              </div>
              <div className="font-mono" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', textAlign: 'center', marginBottom: '28px' }}>
                Three units. One brand. Built in Houston.
              </div>
```

Replace with:

```tsx
              <div className="font-display" style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.5px', color: 'var(--col-text-1)', textAlign: 'center', marginBottom: '4px' }}>
                Allenix in 2036
              </div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', textAlign: 'center', marginBottom: '28px' }}>
                Three units. One brand. Built in Houston.
              </div>
```

Find the unit role labels (inside each card cell, around line 213):

```tsx
                    <div className="font-mono" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '14px' }}>
                      {unit.role}
                    </div>
```

Replace with:

```tsx
                    <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '14px' }}>
                      {unit.role}
                    </div>
```

Find the unit line items (around line 216):

```tsx
                      <div key={line} className="font-body" style={{ fontSize: '12px', color: 'var(--col-text-3)', lineHeight: 1.65 }}>
```

Replace with:

```tsx
                      <div key={line} className="font-body" style={{ fontSize: '13px', color: 'var(--col-text-3)', lineHeight: 1.65 }}>
```

Find the card footer outcome label (around line 226):

```tsx
                <div className="font-mono" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '5px' }}>
                  The outcome
                </div>
```

Replace with:

```tsx
                <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '5px' }}>
                  The outcome
                </div>
```

- [ ] **Step 4: Run TypeScript check**

```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix/allenix-website
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix before committing.

- [ ] **Step 5: Commit all page changes**

```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix
git add allenix-website/src/app/manifesto/page.tsx
git commit -m "feat: manifesto page — rename title, reader summary, share button, font size fixes, SEO metadata"
```

---

### Task 3: Manual QC

**Files:** None (verification only)

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix/allenix-website
npm run dev
```

Open `http://localhost:3000/manifesto` in a browser.

- [ ] **Step 2: Visual checks**

| Check | Expected |
|-------|----------|
| Page title (browser tab) | "The Allenix Manifesto" |
| H1 text | "The Allenix Manifesto" |
| Share button position | Top-right of title block, aligned to bottom of H1 |
| Reader summary | Visible in italic below byline, before the first divider |
| Share button label | "Copy link" with chain-link icon |
| Share button click | Label changes to "Copied" + border/text turns teal |
| After 2 seconds | Label resets to "Copy link" |
| Clipboard content | Paste elsewhere: should be `http://localhost:3000/manifesto` |
| Three-unit card fonts | No text below 12px visible |
| Mobile (375px wide) | H1 wraps cleanly, share button stays in header row |

- [ ] **Step 3: Check meta tags in page source**

In browser DevTools > Elements, confirm:
```html
<title>The Allenix Manifesto</title>
<meta name="description" content="Allenix is a Houston-built firm..." />
```

- [ ] **Step 4: Stop dev server and push**

```bash
cd /Users/amamujee/Documents/Vault/Company/Clients/Allenix
git push origin main
```

Vercel auto-deploys. Verify at `https://allenix.vercel.app/manifesto` once deploy completes (typically 60–90 seconds).
