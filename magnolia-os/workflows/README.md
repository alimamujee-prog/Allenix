# Magnolia Workflows

Agentic workflows for Allenix business operations. Built with Archon.

## Quick Start

**Create a new workflow:**
```bash
archon workflow run system/forge-workflow --branch create-<name> "<description>"
```

**Improve an existing workflow:**
```bash
archon skill run refine-workflow "workflows/<name>.yaml" "<feedback>"
```

**Validate a workflow:**
```bash
archon workflow run system/validator --branch validate-<name> "path/to/workflow.yaml"
```

**Browse templates:**
See **[TEMPLATES.md](./TEMPLATES.md)** for 20 proven Archon workflow patterns.

**Run a workflow:**
```bash
archon workflow run <workflow-name> --branch <branch> "<input>"
```

## What's Here

```
workflows/
├── README.md          # This file
├── BACKLOG.md         # Workflows to rebuild (early attempts)
├── TEMPLATES.md       # 20 proven Archon workflow patterns
└── system/            # Meta workflows
    ├── forge-workflow.yaml    # Create new workflows
    └── validator.yaml         # Validate workflows
```

## System Workflows

### Forge Workflow (system/forge-workflow.yaml)
Creates new business workflows with human-in-the-loop gates.

**Features:**
- Adaptive scanning (ask which folders to scan)
- Classification into QUICK vs STANDARD paths
- Business pattern matching (content-synthesis, analysis-audit, etc.)
- Soul mode selection (Soul-Rich for brand voice, Soul-Neutral for data)
- Template-based generation with Archon proven patterns
- Multi-stage validation
- Business-friendly review gate (plain English, not YAML)

**Usage:**
```bash
archon workflow run system/forge-workflow --branch create-my-workflow "
Create a workflow that analyzes call notes and generates LinkedIn posts.
Use Soul-Rich mode.
"
```

### Validator (system/validator.yaml)
Validates workflow YAML for syntax, structure, and compliance.

**Checks:**
- YAML syntax
- Node ID uniqueness
- Dependency references
- Archon compliance (approval gates, script runtimes)
- Allenix patterns (kebab-case, brand loading)

**Usage:**
```bash
archon workflow run system/validator --branch validate-my-workflow "workflows/my-workflow.yaml"
```

## Decision Tree

```
What does the workflow do?
│
├─ Transform data? → QUICK pattern (2-3 nodes, no gates)
├─ Analyze and report? → QUICK pattern
├─ Generate content? → Soul-Rich (loads media-voice.md)
├─ Multi-stage with reviews? → STANDARD pattern (gates at checkpoints)
└─ Complex/Novel? → CUSTOM (from scratch)
```

## Node Types

| Type | Use | Example |
|------|-----|---------|
| `prompt:` | AI reasoning | Analysis, generation |
| `bash:` | Shell operations | File checks, git commands |
| `command:` | Reusable logic | References `.archon/commands/*.md` |
| `script:` | Data transforms | JSON parsing (bun/uv) |
| `loop:` | Iterate to completion | Implement stories, fix tests |
| `approval:` | Human review gate | Plan → execute boundary |
| `cancel:` | Conditional stop | Guard unsafe operations |

## Soul Modes

| Mode | Context | Language | Use For |
|------|---------|----------|---------|
| **Soul-Rich** | Loads `media-voice.md` | "Blood on the floor", visceral | Client-facing content |
| **Soul-Neutral** | No brand files | Analytical, precise | Data analysis, ROI calcs |

## Variable Reference

| Variable | Meaning |
|----------|---------|
| `$ARGUMENTS` | User's input message |
| `$nodeId.output` | Previous node output |
| `$nodeId.output.field` | JSON field from structured output |
| `$ARTIFACTS_DIR` | Working directory |
| `$BASE_BRANCH` | Git base branch |

## Common Patterns

### Pattern 1: Load → Analyze → Output
```yaml
- id: load-data
  bash: "cat input.json"
- id: analyze
  prompt: "Analyze: $load-data.output"
  depends_on: [load-data]
- id: save
  bash: "echo '$analyze.output' > output.json"
  depends_on: [analyze]
```

### Pattern 2: Context → Generate → Verify
```yaml
- id: load-context
  prompt: "Read brand_context/allenix-media/media-voice.md"
- id: generate
  prompt: "Generate using context from $load-context.output"
  depends_on: [load-context]
- id: verify
  prompt: "Verify: $generate.output matches source"
  depends_on: [generate]
```

### Pattern 3: Parallel → Synthesize
```yaml
- id: analyze-a
  prompt: "Analyze aspect A"
- id: analyze-b
  prompt: "Analyze aspect B"
- id: synthesize
  prompt: "Combine: $analyze-a.output + $analyze-b.output"
  depends_on: [analyze-a, analyze-b]
  trigger_rule: one_success
```

## Archon Templates

The Forge uses proven Archon workflows as base templates. See **[TEMPLATES.md](./TEMPLATES.md)** for the complete catalog of 20 templates organized by category:

| Category | Templates |
|----------|-----------|
| **Planning** | interactive-prd, piv-loop |
| **Implementation** | feature-development, plan-to-pr, idea-to-pr, fix-github-issue, ralph-dag |
| **Review** | smart-pr-review, comprehensive-pr-review, validate-pr |
| **Refactoring** | refactor-safely |
| **Testing** | test-loop-dag |
| **Meta** | workflow-builder |

Full templates at: `../archon/.archon/workflows/defaults/`

## Backlog

Early workflow attempts are documented in `BACKLOG.md` for rebuilding. These were created before establishing proper patterns and should be rebuilt using the Forge.

## Learning Resources

- **Archon docs**: https://archon.diy
- **Archon skills**: `../archon/.claude/skills/archon/SKILL.md`
- **Template reference**: `../archon/.archon/workflows/defaults/`

## Workflow Schema

```yaml
name: workflow-name
description: |
  Use when: Condition for using
  Triggers: Phrases that match
  Does: What it accomplishes
  NOT for: Exclusions

provider: claude
model: sonnet
interactive: true  # Required if using approval gates

nodes:
  - id: node-id
    prompt: "..."
    depends_on: [other-node]
    when: "$other-node.output == 'value'"
```
