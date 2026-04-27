# Agent Frameworks

## Overview

This directory contains research and reference implementations of agentic systems that inform Magnolia OS architecture. These are **not dependencies** — they're studied for patterns, then implemented as needed.

## Frameworks

### Agent Zero
**Purpose**: Personal agent system research
- Reference for personal assistant patterns
- Local execution models
- Context persistence strategies

### Paperclip
**Purpose**: Cost tracking and agentic economics
- Cost event schema design
- Budget enforcement patterns
- ROI calculation for agentic workflows
- Used in Magnolia OS for cost visibility

### Archon
**Purpose**: Agentic workflow execution engine (deployed via Docker)
- **Production Integration**: `/backend/src/lib/archon/wrapper.ts`
- **Documentation**: https://github.com/coleam00/Archon
- **Docker Image**: `ghcr.io/coleam00/archon:latest`

Archon is the execution engine that runs YAML workflows defined in `/workflows`. The backend's Context Guard layer injects brand intelligence from `/brand_context` into Archon workflows.

## Usage

1. **Study patterns** — Review framework implementations for architectural patterns
2. **Adapt selectively** — Implement what fits Magnolia OS requirements
3. **Keep lean** — Don't copy entire frameworks; extract the core ideas

## See Also

- `/backend/src/lib/archon/` — Archon integration layer
- `/workflows/` — YAML workflow definitions
- `/brand_context/` — Intelligence injected into workflows
- Magnolia OS Build Plan: `agent-frameworks/MAGNOLIA-OS-PLAN.md`
