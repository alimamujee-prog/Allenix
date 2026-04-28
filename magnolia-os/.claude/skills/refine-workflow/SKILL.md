---
name: refine-workflow
description: |
  Use when: Improving existing Magnolia/Allenix workflows with feedback, examples, or edge cases.
  Triggers: "improve this workflow", "refine workflow", "update workflow", "workflow broke",
            "add to workflow", "change workflow", "fix workflow", "workflow edge case",
            "workflow feedback", "modify workflow".
  Capability: Analyzes existing workflow, proposes targeted improvements, shows diff, applies with approval.
  NOT for: Creating new workflows (use forge-workflow instead).
argument-hint: "<workflow-path> <feedback/examples/issues>"
---

# Refine Workflow Skill

Improves existing Magnolia workflows with targeted iterations based on feedback, examples, or edge cases.

## When to Use This Skill

- "This workflow broke when X happened"
- "Add a new node to handle Y"
- "The output format should be Z instead"
- "This edge case isn't handled"
- "Make it faster/simpler/more robust"
- "Integrate with new tool/API"

**For new workflows**, use `forge-workflow` instead.

---

## Refinement Process

### Step 1: Load and Analyze

Read the target workflow file and analyze:

```bash
# Extract workflow structure
grep -E "^  - id:|^    (prompt|bash|command|script|loop|approval|cancel):" <workflow-file>
```

Ask the user:
1. What's not working or what should change?
2. Any specific examples of failure cases?
3. Desired output vs. current output?

### Step 2: Propose Changes

Create a clear diff showing:
- **What changes** (add node, modify prompt, add condition, etc.)
- **Why it helps** (handles edge case, fixes bug, adds feature)
- **Where it goes** (which node, what dependencies)

Format as:
```diff
--- original
+++ modified
@@ -Linenr,Linenr +Linenr @@
 Context for the change
- Old line
+ New line
```

### Step 3: Apply with Approval

1. Show the proposed diff
2. Explain impact on other nodes (dependency changes)
3. Ask for approval
4. Apply using Edit tool (atomic changes)

### Step 4: Validate

Run checks after applying:
```bash
# YAML syntax
grep -q "^name:" <file> && grep -q "^nodes:" <file>

# Duplicate node IDs
grep "^  - id:" <file> | awk '{print $3}' | sort | uniq -d
```

---

## Common Refinement Patterns

### Add Edge Case Handling

**Problem**: Workflow fails on unexpected input.

**Solution**: Add classification node with conditional routing.

```yaml
# Before: direct processing
- id: process
  prompt: "Process: $ARGUMENTS"

# After: classify and route
- id: classify-input
  prompt: "Classify input type..."
  output_format:
    type: object
    properties:
      input_type: {enum: [standard, edge_case_a, edge_case_b]}

- id: handle-standard
  prompt: "Process standard input"
  when: "$classify-input.output.input_type == 'standard'"

- id: handle-edge
  prompt: "Handle edge case..."
  when: "$classify-input.output.input_type != 'standard'"
```

### Add Verification Node

**Problem**: Output has hallucinations or errors.

**Solution**: Add agentic verification before final output.

```yaml
- id: generate
  prompt: "Generate content..."

- id: verify
  prompt: |
    Verify the generated output against source:
    1. All claims cited
    2. No hallucinations
    3. Brand voice consistent
    If issues found, list them. If clean, output "VERIFIED".
  depends_on: [generate]

- id: output-gate
  approval:
    message: "Verification result: $verify.output. Proceed?"
  depends_on: [verify]
```

### Add Brand Context Loading

**Problem**: Content doesn't sound like Allenix.

**Solution**: Add brand-loading node as first step.

```yaml
- id: load-brand
  prompt: "Read and absorb: brand_context/allenix-media/media-voice.md"

- id: generate
  prompt: |
    Using brand voice from $load-brand.output, generate...
  depends_on: [load-brand]
```

### Speed Up with Model Selection

**Problem**: Workflow uses expensive model unnecessarily.

**Solution**: Use Haiku for simple tasks.

```yaml
# Expensive: Sonnet for simple classification
- id: classify
  prompt: "Is this A or B?"
  model: sonnet  # wasteful

# Faster: Haiku for binary choice
- id: classify
  prompt: "Is this A or B?"
  model: haiku  # appropriate
  allowed_tools: []
  output_format:
    type: object
    properties:
      choice: {enum: [A, B]}
```

### Add Human Gate at Risky Point

**Problem**: Workflow proceeds without confirmation on important steps.

**Solution**: Add approval gate before critical action.

```yaml
# Workflow must be interactive: true
interactive: true

nodes:
  - id: plan
    prompt: "Create plan..."

  - id: confirm
    approval:
      message: "Review plan above. Approve to execute."
      capture_response: true
    depends_on: [plan]

  - id: execute
    prompt: "Execute approved plan..."
    depends_on: [confirm]
```

---

## Dependency Updates

When adding/removing nodes, check:

1. **New node depends_on**: Must reference existing nodes
2. **Existing nodes**: May need to add new node to their depends_on
3. **when conditions**: May need to reference new node outputs
4. **trigger_rule**: May need adjustment for new parallel branches

---

## Validation Checklist

After applying changes:

- [ ] YAML syntax valid (no trailing spaces, proper indentation)
- [ ] All node IDs unique (kebab-case)
- [ ] All depends_on references valid
- [ ] All when: conditions reference valid outputs
- [ ] approval nodes have interactive: true at workflow level
- [ ] script nodes have runtime: specified
- [ ] output_format has valid JSON schema
- [ ] No hardcoded paths outside project

---

## Example Session

**User**: "The deal-closer workflow hallucinates pricing"

**You**:
1. Read workflows/deal-closer.yaml
2. Find the node that generates pricing
3. Add verification node after it
4. Show diff:
   ```diff
   @@ -45,6 +45,15 @@
    - id: draft-proposal
      prompt: "Draft discovery scope..."

   +- id: verify-pricing
   +  prompt: "Verify all pricing matches rate card. Flag discrepancies."
   +  depends_on: [draft-proposal]
   +
   +- id: pricing-gate
   +  approval:
   +    message: "Pricing verified: $verify-pricing.output. Approve?"
   +  depends_on: [verify-pricing]
   ```
5. Ask for approval
6. Apply changes
7. Validate YAML syntax

---

## Quick Commands

```bash
# Show workflow structure
grep -E "^  - id:|^    (prompt|bash|command|script):" <workflow-file>

# Check for duplicate IDs
grep "^  - id:" <file> | awk '{print $3}' | sort | uniq -d

# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('<file>'))"

# Test workflow
archon workflow run <name> --branch test-refine "<test input>"
```
