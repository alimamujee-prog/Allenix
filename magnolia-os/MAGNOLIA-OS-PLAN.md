# Magnolia OS — Definitive Build Plan

**Status**: Execution Phase (Internal Prototype)
**Created**: 2025-04-26
**Target**: Internal "Dogfooding" Alpha followed by Client Beta

## Vision Statement

Magnolia OS is the **internal engine and client-facing platform** for Allenix. Priority v1 is building a robust, generic system for internal Allenix operations (Labs, Media, Capital) to "eat our own dog food" before deploying to clients.

- **Internal Focus**: Automate Allenix strategy synthesis, content production, and research.
- **Agnostic Architecture**: Support any service business workflow, not just med spas.
- **Context Guard**: Secure, backend-driven injection of brand and domain intelligence.
- **Trust & Verification**: Agentic verifiers check results before human review.

## Architecture: The "Context Guard" Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                         │
│           (Internal Dashboard, Workflow Control)            │
└────────────────────────┬────────────────────────────────────┘
                         │ SSE + REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Hono Backend                             │
│          (Context Guard & Orchestration)                    │
│  1. Identify workflow & required context                    │
│  2. Fetch .md intelligence files from /brand_context        │
│  3. Inject as variables into Archon API call                │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP (Docker network)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Archon Service                             │
│          (Stateless Execution Engine)                      │
│  - Runs YAML workflows using injected variables             │
└─────────────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Context Guard (Safety & Scale)
- Intelligence (voice, methodology, facts) lives in `/brand_context`.
- The **Backend** is the "Guard": it reads the context and passes it to the AI.
- This prevents "Prompt Leaking" and ensures the AI only knows what it needs for the current task.

### 2. General-Purpose Workflows
- Workflows are defined in `/workflows` as modular YAML files.
- **Dogfooding Focus**: First workflows capture Allenix's propia intelligence (e.g., harvesting pain points from sales calls to feed marketing loops).
- First workflows: `allenix-strategy-sync`, `allenix-content-engine`, `leed-research`.

### 3. Agentic Verification
- Every workflow includes an `agentic_verification` step.
- Checks for: Citations, brand voice, and "truth" against source documents.
- The human only reviews output that has passed the automated QC layer.

### 4. The Workflow Architect (Meta-System)
- **Forge Workflow** (`system/forge-workflow.yaml`): Creates new business workflows with human-in-the-loop gates.
  - Adaptive scanning (ask which folders to scan)
  - Classification into QUICK vs STANDARD paths
  - Business pattern matching (content-synthesis, analysis-audit, etc.)
  - Soul mode selection (Soul-Rich for brand voice, Soul-Neutral for data)
  - Template-based generation with Archon proven patterns
  - Multi-stage validation (syntax → schema → patterns)
  - Business-friendly review gate (plain English, not YAML)
- **Refine Workflow** (`/refine-workflow` skill): Improves existing workflows with targeted iterations.
  - Load and analyze existing workflow
  - Propose changes with diff view
  - Apply with approval
  - Validate after changes
- **Discovery First**: AI asks requirements questions before generating.
- **3-Layer Check System**:
    1. Structural Check (Human approves node sequence).
    2. Quality/Brand Check (Agentic Verifier runs automatically).
    3. Assembly Check (Technical syntax validation).
- **Final Human Verification**: Mandatory final gate before deployment.
- **Efficiency Rule**: Default to minimum number of nodes.
- **Conditional Branding**: 'Soul-Rich' workflows get Allenix media voice; 'Soul-Neutral' workflows skip it.

## Sprint Breakdown

### Sprint 1: Internal Foundation (Current)
**Goal**: Working internal dashboard for Allenix team use.

- [x] Initial folder structure: `/backend`, `/frontend`, `/workflows`, `/brand_context`.
- [x] Archon deployed via Docker Compose.
- [x] Hono backend skeleton with Archon bridge.
- [x] **Context Guard Implementation**: Logic to inject .md files into LLM prompts.
- [x] PostgreSQL: Schema for `cost_events`, `workflow_runs`, and `approvals`.
- [x] **Internal Canary**: `strategy-analyzer.yaml` (analyzes Allenix docs).
- [x] **Workflow Architect**: Meta-workflow for building other workflows (Discovery First model).

### Sprint 2: Multi-Workflow Robustness
**Goal**: Expand internal use cases & stabilize the engine.

- [x] **Allenix Content Engine**: Workflow to convert prospect calls into social content.
- [ ] **Pain Point Harvesting**: Automated extraction of client problems into a shared library.
- [ ] **Lead Research Workflow**: Automated identification of $5M+ service businesses.
- [x] **Approval UX**: Polished UI in Next.js for human-in-the-loop review.
- [x] **Streaming Status**: Real-time progress logs in the dashboard.
- [ ] **Thin Archon Wrapper UI**: Simple landing page with tenant selector, branding, and link to Archon's native UI.
- [x] **Forge Workflow**: Meta-workflow for creating new business workflows.
- [x] **Refine Workflow**: Skill for improving existing workflows.

### Sprint 3: Full Custom Dashboard
**Goal**: Build complete Magnolia OS workflow command center.

- [ ] **Workflow Launcher**: Dynamic form system for all 7 workflows
- [ ] **Active Runs Panel**: SSE streaming of workflow progress
- [ ] **Approval Queue**: Dedicated UI for human-in-the-loop review
- [ ] **Cost Monitor**: Token usage tracking and visualization
- [ ] **Activity Log**: Workflow history and results

### Sprint 4: Client Readiness
**Goal**: Package for the first med-spa/service client pilot.

- [ ] Client tenant isolation (namespaced context files).
- [ ] Revenue recovery audit workflow (generalized).
- [ ] ROI Dashboard with live data.
- [ ] Cost tracking visualization (Paperclip pattern).

## File Structure

```
/magnolia-os
├── /frontend
│   ├── /src/app
│   │   ├── /globals.css          # Allenix dark theme tokens
│   │   ├── /layout.tsx           # Font loading (Playfair, Baskerville, Plex Mono)
│   │   └── /dashboard
│   │       └── page.tsx          # Workflow command center
│   └── /src/components
│       ├── /ui                   # Reusable UI components
│       │   ├── ShinyButton.tsx   # Premium CTA button
│       │   ├── StatusBadge.tsx   # Workflow status indicator
│       │   └── UnitCard.tsx      # Interactive card pattern
│       ├── WorkflowLauncher.tsx  # Dynamic workflow selector
│       ├── ActiveRunsPanel.tsx   # SSE streaming display
│       ├── ApprovalQueue.tsx     # Pending human reviews
│       ├── CostMonitor.tsx       # Token usage tracking
│       ├── ActivityLog.tsx       # Workflow history
│       └── ApprovalGate.tsx      # Approval modal
├── /backend
│   └── /src
│       ├── /index.ts             # Hono API (5 endpoints + new generic endpoints)
│       └── /lib
│           ├── /archon/wrapper.ts    # Archon API client
│           ├── /context-guard.ts     # Brand intelligence injection
│           └── /db                  # PostgreSQL client
├── /workflows             # YAML definitions (Internal + Client-specific)
│   ├── /system            # Meta workflows
│   │   ├── forge-workflow.yaml    # Create new workflows
│   │   └── validator.yaml         # Validate workflows
│   ├── README.md          # Workflow documentation
│   ├── TEMPLATES.md       # 20 proven Archon patterns
│   └── BACKLOG.md         # Workflows to rebuild
├── /.claude
│   └── /skills
│       └── refine-workflow        # Improve existing workflows
├── /brand_context         # .md Intelligence files (The Allenix "Soul")
└── /supabase              # DB Migrations
```

---
**Last Updated**: 2026-04-27 (Added forge-workflow and refine-workflow skill)