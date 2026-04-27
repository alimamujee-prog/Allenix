# Workflow Backlog

Workflows to build. These were early attempts — use the Forge to rebuild properly.

## Priority Workflows

### 1. Content Engine (allenix-content-engine.yaml)
**Purpose**: Convert prospect/client conversations into marketing content briefs and social drafts

**What it did**:
- Loaded Allenix media voice and content pillars
- Analyzed transcripts for pain points, future state, vocabulary, objections
- Mapped findings to content pillars
- Drafted LinkedIn posts in Allenix voice
- Verified against source (no hallucinations)
- Harvested pain points to internal library

**Status**: 🔴 NEEDS REBUILD — Early version, use Forge with archon-plan-to-pr template

**Base template**: `archon-plan-to-pr.yaml` (phased execution)

---

### 2. Deal Closer (allenix-deal-closer.yaml)
**Purpose**: Draft high-impact discovery proposals from prospect call notes

**What it did**:
- Loaded Allenix identity and proposal methodology
- Extracted "cost of inaction" from call notes
- Brainstormed 3 sprint scopes for client
- Human selected scope
- Drafted full Discovery Scope document
- Agentic verification (no consultancy fluff, facts checked)

**Status**: 🔴 NEEDS REBUILD — Early version, use Forge

**Soul Mode**: Soul-Rich (loads media-voice.md)

---

### 3. Audience Engine (allenix-audience-engine.yaml)
**Purpose**: Extract pain points to drive client attraction content and lead magnet ideas

**What it did**:
- Loaded content pillars and media voice
- Identified "market vulnerability" from call notes
- Drafted LinkedIn manifesto targeting shared pain
- Brainstormed 3 lead magnet ideas

**Status**: 🔴 NEEDS REBUILD — Early version, use Forge

**Soul Mode**: Soul-Rich

---

### 4. Patient Reactivation (patient-reactivation.yaml)
**Purpose**: Identify dormant patients and draft personalized outreach

**What it did**:
- Loaded med-spa voice and ICP
- Filtered patients: 6-12 months since visit, high-value treatments, no future appt
- Drafted SMS/Email outreach (renewal focus, not sales)
- Agentic verification loop (citation accuracy, brand integrity, no hallucinations)
- CEO approval gate
- Executed via Twilio/SendGrid

**Status**: 🔴 NEEDS REBUILD — Early version, has external API dependencies

**Soul Mode**: Soul-Rich

---

### 5. Revenue Recovery Audit (revenue-recovery-audit.yaml)
**Purpose**: Identify and recover lost revenue in med spa operations

**What it did**:
- Loaded brand context (med-spa-voice, ICP, methodology)
- Analyzed patient data (12 months) for revenue leaks:
  - No-show/cancellation patterns
  - Non-rebooking after high-LTV treatments
  - Dormant patients (6-18 months)
- Quantified "Recoverable Revenue" using pricing benchmarks
- CEO approval gate
- Generated 90-day retention sprint roadmap with outreach templates

**Status**: 🔴 NEEDS REBUILD — Early version, use Forge

**Soul Mode**: Soul-Rich

---

### 6. Strategy Sync (allenix-strategy-sync.yaml)
**Purpose**: Synthesize Allenix company strategy from internal documents

**What it did**:
- Loaded internal context (STRATEGIC-BRIEF.md, ICP.md)
- Synthesized current state of 3 units: Labs, Media, Capital
- Identified "common thread" across units
- Agentic verification (Allenix voice consistency)
- Internal preview gate
- Finalized brief for Notion/Slack distribution

**Status**: 🔴 NEEDS REBUILD — Early version, internal workflow

**Soul Mode**: Soul-Rich

---

### 7. Simple ROI Check (simple-roi-check.yaml)
**Purpose**: Calculate quick ROI from patient data to prove value proposition

**What it did**:
- Loaded med-spa voice and methodology
- Ran Python script (canary-roi.py) with appointment volume and no-show rate
- Output JSON: monthly leak, etc.
- Verified against brand voice and methodology
- Output clean Markdown for practice owner

**Status**: 🔴 NEEDS REBUILD — Simple but has script dependency

**Soul Mode**: Soul-Rich

**Note**: Has external Python script dependency

---

## Future Ideas

- [ ] SEO Audit workflow — Analyze websites for SEO issues, generate prioritized fixes
- [ ] Competitor Analysis — Scrape competitor sites, extract positioning patterns
- [ ] Email Sequence Builder — Create nurture sequences from prospect context
- [ ] Case Study Generator — Turn client wins into case studies in Allenix voice
- [ ] Proposal Clone — Adapt winning proposals for new prospects

## How to Rebuild

```bash
# Use the Forge with a good base template
archon workflow run system/forge-workflow --branch rebuild-<name> "
Create a workflow that [original purpose from backlog].
Use archon-plan-to-pr.yaml as the base template.
Soul mode: Soul-Rich (loads media-voice.md)
"
```
