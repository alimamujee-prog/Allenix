# WbD Revenue Architecture — Agent Guide

> **What this is:** A complete WbD Revenue Architecture knowledge base. Any AI agent can use this folder to answer questions about Winning by Design's methodology with expert-level depth.
> **No special setup required** for most queries. Deep source retrieval requires LM Studio running.

---

## How to Use This Folder

### Level 1: Just Read (no setup needed)

For most WbD questions, read these five files and you're done:

1. **`05_rag_output/system_prompt_v2.md`** — L1 system prompt (~670 words). Defines your role, routing logic, and response guidelines. Always load this.
2. **`05_rag_output/WBD_REASONING_TEMPLATES.md`** — reasoning templates. Use first so answers diagnose like WbD.
3. **`05_rag_output/WBD_BENCHMARKS.md`** — structured numbers, formulas, thresholds, and confidence notes. Use before fuzzy retrieval for quantitative answers.
4. **`05_rag_output/WBD_CONCEPT_CARDS.md`** — compact mental models, anti-patterns, and source roles.
5. **`05_rag_output/L2_knowledge_base.md`** — L2 knowledge base (~20.8K words). Comprehensive synthesis of all WbD models, benchmarks, playbooks, and diagnostics. This covers 95% of questions.

Together they fit easily in any modern LLM context window. No RAG, no Python, no LM Studio needed.

### Level 2: Deep Source Retrieval (no special setup)

When a question needs verbatim source text or detail beyond L2, just search the source files directly. They're plain text — no vector database or embedding model needed.

**Search website research:**
```bash
grep -i "discount" 02_website_research/research_*.txt
```

**Search YouTube transcripts:**
```bash
grep -i "SPICED" 03_youtube_transcripts/processed/*.md
```

**Search the PDF text:**
```bash
grep -i "bowtie" 01_pdf_extraction/pdf_full_text.txt
```

Then read the matching files for full context. Total source material is ~547K words — small enough for an agent to search and read directly.

### When to Use Each Level

| Situation | Use | Why |
|---|---|---|
| General WbD questions | L1 + L2 only | Synthesis covers it |
| Specific benchmark numbers | L1 + L2 only | All benchmarks are in L2 |
| "What exactly did the source say?" | grep + read source files | Need verbatim text |
| How WbD's thinking evolved | grep + read source files | Compare across PDF/website/YouTube |
| Detail on a specific research brief or video | grep + read source files | Not in the synthesis |
| Implementation specifics from workshops | grep + read source files | YouTube transcripts have detail L2 doesn't |

---

## What's In This Folder

```
Revenue Architecture/
├── AGENTS.md                          ← This file (start here)
├── RAG_BUILD_WORKFLOW.md              ← How this was built, what was learned
├── 01_pdf_extraction/
│   └── pdf_full_text.txt              ← Full text from Revenue Architecture book (~54K words)
├── 02_website_research/               ← 43 WbD research papers & blueprints (~195K words)
│   └── research_*.txt
├── 03_youtube_transcripts/
│   └── processed/                     ← 20 WbD video transcripts (~298K words)
│       └── *.md
├── 04_synthesis/
│   └── reconciliation_report.md       ← Cross-source discrepancies found during synthesis
└── 05_rag_output/
    ├── system_prompt_v2.md            ← L1 system prompt (always load)
    ├── WBD_REASONING_TEMPLATES.md     ← Thinking templates for WbD-style diagnosis
    ├── WBD_BENCHMARKS.md              ← Structured benchmark and formula layer
    ├── WBD_CONCEPT_CARDS.md           ← Mental models, anti-patterns, source roles
    ├── L2_knowledge_base.md           ← L2 knowledge base (always load)
    └── L3_pipeline_spec.md            ← Original pipeline design spec (historical reference)
```

> **Note:** A full RAG engine with vector embeddings and reranking exists at `~/wbd-rag/` for future projects that need it at scale. For this ~547K-word knowledge base, direct file search is sufficient.

---

## Key WbD Concepts (Quick Reference)

These are the core models. L2 has full detail on all of them.

- **Revenue Factory** — SaaS as a factory with production lines for each revenue stream
- **Bowtie Model** — Replaces the funnel. Full customer lifecycle across 9 Value Milestones (VM1-9) and 8 Conversion Rates (CR1-CR8)
- **SPICED** — Discovery framework: Situation, Pain, Impact, Critical Event, Decision
- **GTM Motions** — No Touch, Low Touch, Mid Touch, High Touch, Dedicated Touch — determined by ACV
- **Growth Formula** — Revenue = Traffic x CR1 x CR2 x CR3 x ACV x CR4 x CR5 x CR6 x CR7 x CR8 (multiplicative, not additive)
- **GRR/NRR** — Gross/Net Revenue Retention benchmarks by GTM motion
- **Process First, AI Second** — Never automate a broken process

---

## RAG Engine (Optional)

A full retrieval pipeline with vector embeddings, BM25, and cross-encoder reranking was built at `~/wbd-rag/`. It's available if you need semantic search at scale, but for this project (~547K words) direct file search is simpler and sufficient.

See `~/wbd-rag/AGENTS.md` and `~/wbd-rag/REFACTORING_TODO.md` if you want to use or refactor it for future projects.
