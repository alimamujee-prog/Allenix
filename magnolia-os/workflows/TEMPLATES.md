# Workflow Templates — Archon Proven Patterns

20 battle-tested workflow templates from Archon. Use these as base patterns when building new workflows.

## Quick Reference

| Category | Template | Use For | Complexity |
|----------|----------|---------|------------|
| **General** | assist | Catch-all for unmatched requests | 1 node |
| **Planning** | interactive-prd | Guided PRD creation with human gates | 4 phases, interactive |
| **Planning** | piv-loop | Plan-Implement-Validate with human review | 4 phases, interactive loops |
| **Implementation** | feature-development | Implement from existing plan | 2 nodes |
| **Implementation** | plan-to-pr | End-to-end: plan → PR with review | 8 phases |
| **Implementation** | idea-to-pr | Idea → plan → PR with review | 8 phases |
| **Implementation** | fix-github-issue | Fix issue with classification & routing | 10 phases |
| **Implementation** | ralph-dag | Story-based autonomous implementation | Loop-based |
| **Review** | smart-pr-review | Adaptive PR review (only relevant agents) | 5 agents conditional |
| **Review** | comprehensive-pr-review | Full PR review (all 5 agents) | 9 nodes, 5 parallel |
| **Review** | validate-pr | Quick PR validation only | Lightweight |
| **Review** | issue-review-full | Full issue investigation & review | Multi-phase |
| **Review** | architect | Architecture review | Specialized |
| **Review** | adversarial-dev | Security review (attack/defend) | Specialized |
| **Refactoring** | refactor-safely | Safe code refactoring with validation | Guarded |
| **Git** | resolve-conflicts | Resolve merge conflicts | Interactive |
| **Git** | create-issue | Create GitHub issues | Simple |
| **Testing** | test-loop-dag | Test-fix loop until passing | Loop-based |
| **Media** | remotion-generate | Generate Remotion videos | Specialized |
| **Meta** | workflow-builder | Create new workflows | 5 phases |

---

## Category: General Purpose

### 1. Assist (archon-assist.yaml)
**Pattern**: Single command node
**Use when**: No other workflow matches

```yaml
name: workflow-name
description: |
  Use when: [when to use]
  Triggers: [phrases]
  NOT for: [exclusions]

nodes:
  - id: assist
    command: your-command-name
```

**Best for**: Simple tasks, fallback workflow

---

## Category: Planning & Ideation

### 2. Interactive PRD (archon-interactive-prd.yaml)
**Pattern**: Multi-gate interview with research
**Phases**: Initiate → Grounding → Technical → Generate → Validate

```yaml
name: your-interactive-prd
description: Create PRD through guided conversation
interactive: true  # REQUIRED for approval gates

nodes:
  - id: initiate
    prompt: "Ask foundation questions..."
    model: sonnet

  - id: foundation-gate
    approval:
      message: "Answer the questions above"
      capture_response: true
    depends_on: [initiate]

  - id: research
    prompt: "Research market and codebase..."
    depends_on: [foundation-gate]

  # ... more gates and phases
```

**Key features**:
- `interactive: true` at workflow level
- Multiple `approval:` gates with `capture_response: true`
- Human-in-the-loop for each phase
- Deep codebase exploration before proposing

**Best for**: PRD creation, feature planning, requirements gathering

---

### 3. PIV Loop (archon-piv-loop.yaml)
**Pattern**: Plan-Implement-Validate with iterative refinement
**Phases**: Explore → Plan → Implement → Validate → Finalize

```yaml
name: your-piv-loop
description: Guided development with human-in-the-loop
interactive: true

nodes:
  - id: explore
    loop:
      prompt: "Understand the problem..."
      until: PLAN_READY
      max_iterations: 15
      interactive: true
      gate_message: "Say 'ready' to create the plan"

  - id: create-plan
    prompt: "Create structured plan..."
    depends_on: [explore]
    context: fresh

  - id: refine-plan
    loop:
      prompt: "Refine based on feedback..."
      until: PLAN_APPROVED
      max_iterations: 10
      interactive: true
    depends_on: [create-plan]

  - id: implement
    loop:
      prompt: "Implement tasks..."
      until: COMPLETE
      max_iterations: 15
      fresh_context: true
    depends_on: [refine-plan]

  # ... validation phases
```

**Key features**:
- Nested loops (explore → plan → implement)
- `fresh_context: true` for stateless implementation
- Human feedback at each phase transition

**Best for**: Complex features, guided development, learning codebase

---

## Category: Implementation

### 4. Feature Development (archon-feature-development.yaml)
**Pattern**: Simple 2-node DAG

```yaml
name: your-feature-development
description: Implement from existing plan

nodes:
  - id: implement
    command: your-implement-command
    model: opus[1m]

  - id: create-pr
    command: your-create-pr-command
    depends_on: [implement]
    context: fresh
```

**Best for**: Straightforward implementation from existing plan

---

### 5. Fix GitHub Issue (archon-fix-github-issue.yaml)
**Pattern**: Classification → Conditional routing → Implementation

```yaml
name: your-fix-issue
description: Fix GitHub issue with smart routing

nodes:
  # Phase 1: Fetch & Classify
  - id: extract-issue-number
    prompt: "Extract issue number..."
    model: haiku
    allowed_tools: []
    output_format:
      type: object
      properties:
        issue_number:
          type: integer

  - id: fetch-issue
    bash: "gh issue view $extract-issue-number.output.issue_number --json title,body"
    depends_on: [extract-issue-number]

  - id: classify
    prompt: "Classify issue type..."
    depends_on: [fetch-issue]
    model: haiku
    output_format:
      type: object
      properties:
        issue_type:
          type: string
          enum: [bug, feature, enhancement]

  # Phase 2: Conditional routing
  - id: investigate
    command: investigate-issue
    depends_on: [classify]
    when: "$classify.output.issue_type == 'bug'"
    context: fresh

  - id: plan
    command: create-plan
    depends_on: [classify]
    when: "$classify.output.issue_type != 'bug'"
    context: fresh

  # Phase 3+: Bridge, implement, validate, create-pr, review, report...
```

**Key features**:
- Structured output with `output_format` for classification
- Conditional execution with `when:`
- `trigger_rule: one_success` for routing convergence

**Best for**: Bug fixes, feature implementations, issue handling

---

### 6. Idea to PR (archon-idea-to-pr.yaml)
**Pattern**: Full end-to-end with comprehensive review

```yaml
name: your-idea-to-pr
description: Idea → plan → PR with review

nodes:
  - id: create-plan
    command: archon-create-plan
    context: fresh

  - id: plan-setup
    command: archon-plan-setup
    depends_on: [create-plan]
    context: fresh

  # ... 8 phases total
```

**Phases**: Plan → Setup → Confirm → Implement → Validate → Finalize PR → Code Review → Fix Issues → Summary

**Best for**: Complete feature development from idea

---

## Category: Review

### 7. Smart PR Review (archon-smart-pr-review.yaml)
**Pattern**: Adaptive review (only runs relevant agents)

```yaml
name: your-smart-review
description: Efficient PR review that adapts to complexity

nodes:
  - id: scope
    command: archon-pr-review-scope

  - id: classify
    prompt: "Classify which agents to run..."
    depends_on: [scope]
    model: haiku
    output_format:
      type: object
      properties:
        run_code_review:
          type: string
          enum: ["true", "false"]
        run_error_handling:
          type: string
          enum: ["true", "false"]
        # ... more agents
        complexity:
          type: string
          enum: [trivial, small, medium, large]

  # Conditional agents
  - id: code-review
    command: archon-code-review-agent
    when: "$classify.output.run_code_review == 'true'"

  - id: error-handling
    command: archon-error-handling-agent
    when: "$classify.output.run_error_handling == 'true'"

  - id: synthesize
    command: archon-synthesize-review
    depends_on: [code-review, error-handling, ...]
    trigger_rule: one_success
```

**Best for**: Efficient PR review, avoids unnecessary agents

---

### 8. Comprehensive PR Review (archon-comprehensive-pr-review.yaml)
**Pattern**: 5 parallel agents + synthesize

```yaml
name: your-comprehensive-review
description: Full PR review with all agents

nodes:
  - id: sync
    command: archon-sync-pr-with-main

  # 5 parallel agents
  - id: code-review
    command: archon-code-review-agent
    depends_on: [sync]

  - id: error-handling
    command: archon-error-handling-agent
    depends_on: [sync]

  - id: test-coverage
    command: archon-test-coverage-agent
    depends_on: [sync]

  - id: comment-quality
    command: archon-comment-quality-agent
    depends_on: [sync]

  - id: docs-impact
    command: archon-docs-impact-agent
    depends_on: [sync]

  - id: synthesize
    command: archon-synthesize-review
    depends_on: [code-review, error-handling, test-coverage, comment-quality, docs-impact]
    trigger_rule: one_success
```

**Best for**: Thorough PR review, critical changes

---

## Category: Refactoring & Testing

### 9. Refactor Safely (archon-refactor-safely.yaml)
**Pattern**: Implementation with validation guards

**Best for**: Safe code refactoring, risky changes

### 10. Test Loop (archon-test-loop-dag.yaml)
**Pattern**: Test-fix loop until passing

```yaml
name: your-test-loop
description: Run tests and fix failures until passing

nodes:
  - id: test-and-fix
    loop:
      prompt: "Run tests, fix failures. When passing: <promise>PASS</promise>"
      until: PASS
      max_iterations: 8
      until_bash: "bun run test"
      fresh_context: false
```

**Best for**: Test-driven development, fixing failing tests

---

## Category: Workflow Building

### 11. Workflow Builder (archon-workflow-builder.yaml)
**Pattern**: Scan → Extract → Generate → Validate → Save

```yaml
name: your-workflow-builder
description: Create new workflows

nodes:
  - id: scan-codebase
    bash: |
      echo "=== Existing Workflows ==="
      find .archon/workflows -type f

  - id: extract-intent
    prompt: "Extract structured intent..."
    depends_on: [scan-codebase]
    model: haiku
    output_format:
      type: object
      properties:
        workflow_name:
          type: string
        proposed_nodes:
          type: string

  - id: generate-yaml
    prompt: "Generate workflow YAML..."
    denied_tools: [Edit, Bash]
    depends_on: [extract-intent]

  - id: validate-yaml
    bash: |
      # Validate YAML syntax and required fields
      grep -q "^name:" "$FILE" || exit 1
    depends_on: [generate-yaml]

  - id: save-workflow
    prompt: "Save workflow file..."
    depends_on: [validate-yaml]
```

**Best for**: Creating new workflows, meta-workflows

---

## Common Patterns

### Parallel Execution with Synthesis
```yaml
- id: task-a
  prompt: "Do task A"

- id: task-b
  prompt: "Do task B"

- id: task-c
  prompt: "Do task C"

- id: synthesize
  prompt: "Combine results from A, B, C"
  depends_on: [task-a, task-b, task-c]
  trigger_rule: one_success  # or all_success
```

### Conditional Routing
```yaml
- id: classify
  prompt: "Classify input..."
  output_format:
    type: object
    properties:
      type:
        enum: [A, B, C]

- id: handler-a
  prompt: "Handle type A"
  when: "$classify.output.type == 'A'"

- id: handler-b
  prompt: "Handle type B"
  when: "$classify.output.type == 'B'"

- id: handler-c
  prompt: "Handle type C"
  when: "$classify.output.type == 'C'"
```

### Interactive Loop with Gates
```yaml
interactive: true  # REQUIRED at workflow level

nodes:
  - id: refine
    loop:
      prompt: "Refine based on feedback: $LOOP_USER_INPUT"
      until: APPROVED
      max_iterations: 5
      interactive: true
      gate_message: "Provide feedback or say 'approved'"
```

### Stateless Implementation Loop
```yaml
- id: implement
  loop:
    prompt: "Implement next task from plan..."
    until: COMPLETE
    max_iterations: 15
    fresh_context: true  # Reset session each iteration
```

---

## Using These Templates

```bash
# Reference a template when creating a workflow
archon workflow run system/forge --branch create-my-workflow "
Create a workflow that [purpose].
Use archon-smart-pr-review.yaml as the base template.
Add custom agents for [domain-specific needs].
"
```

---

## Template Location

Full templates at: `../archon/.archon/workflows/defaults/`

Reference for schema: `../archon/.claude/skills/archon/references/workflow-dag.md`
