# The only Claude Code tutorial you’ll ever need

---

# PART 1: FOUNDATIONS

---

## Section 1.1 — Why Claude Code changes the 

```
┌─────────────────────────────────────────┐
│  CHAT TOOLS vs CLAUDE CODE              │
├─────────────────────────────────────────┤
│                                         │
│  ChatGPT / Claude.ai / Custom GPTs      │
│  → Lives in a browser tab               │
│  → Thinks for you                       │
│  → You copy-paste the output            │
│                                         │
│  Claude Code                            │
│  → Lives on your computer               │
│  → Builds for you                       │
│  → Writes files, runs commands, ships   │
│                                         │
└─────────────────────────────────────────┘
```

---

```
WHAT BUSINESS OWNERS BUILD WITH CLAUDE CODE

• Landing pages & client sites
• Internal dashboards from spreadsheet data
• Content machines in their voice
• Lead trackers connected to a CRM
• Meeting prep & follow-up systems
• Proposal generators
• Background automations that run on a schedule
• Full client-facing tools

If you can describe it, you can build it.
```

---

## Section 1.2 — Setting Up

```
INSTALLATION — MAC

1. Install VS Code
   → code.visualstudio.com

2. Check Git is installed
   $ git --version

3. Install Claude Code
   $ curl -fsSL https://claude.ai/install.sh | bash

4. Install Node.js (v18+)
   → nodejs.org/en/download

5. Verify everything
   $ claude --version
   $ node --version
   $ npm --version
```

---

```
INSTALLATION — WINDOWS

1. Install VS Code
   → code.visualstudio.com

2. Install Git
   → git-scm.com

3. Install Claude Code (in PowerShell)
   > irm https://claude.ai/install.ps1 | iex

4. Install Node.js (v18+)
   → nodejs.org/en/download

5. Verify everything
   > claude --version
   > node --version
   > npm --version

If "claude" command not found, add to PATH:
C:\Users\<YOUR_USERNAME>\.local\bin
```

---

## Section 1.3 — Markdown in 2 Minutes

```
MARKDOWN — THE 90% YOU NEED

# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*

- bullet point
- another bullet

1. numbered list
2. second item

[link text](https://example.com)

> blockquote

`inline code`

That's it. AI reads this perfectly.
```

---

## Section 1.4 — Your First Build

```
THE PROJECT WE'RE BUILDING

A CONTENT REPURPOSING ENGINE

Drop in:
  → A video transcript
  → A blog post
  → Podcast notes

Get out:
  → A LinkedIn post
  → An X thread
  → A newsletter draft

All in your voice.
All saved as drafts to review.
The human stays in. The slop stays out.
```

---

```
THE FIRST PROMPT (Day 1, no setup)

"There's a transcript at transcript.txt.
 Read it, then turn it into:

   - A LinkedIn post
   - An X thread (max 5 posts)
   - A short newsletter intro

 Save them as separate files
 in a /drafts folder."

One sentence. One file. Three drafts.
```

---

```
THE PROGRESSION

  ONE SENTENCE PROMPT
         ↓
   OKAY-ISH OUTPUT (slop)
         ↓
     + CONTEXT       (CLAUDE.md)
         ↓
     + SKILLS        (Folders of expertise)
         ↓
     + PERSONALITY   (Specialised agents)
         ↓
     + PLANNING      (Frameworks for big builds)
         ↓
   SOUNDS LIKE YOU WROTE IT
```

---

```
CONTEXT ROT

Claude has a memory window — limited space
in its head at any one time.

The more you ask in a single prompt:
  → the fuller the window gets
  → the more Claude forgets
  → the worse the quality

The fix isn't asking Claude to be smarter.
The fix is planning better.

Break big projects into small, focused tasks.
Each one runs in its own clean context.
```

---

```
THE GROUND RULES FOR THIS VIDEO

✓ The human stays in
✓ The slop stays out
✓ You still pick the topic
✓ You still review every output
✓ You still hit publish

Claude removes the grunt work.
Not the judgement.

Done right, your content sounds
MORE like you, not less.
```

---

## Section 1.5 — Permissions

```
PERMISSIONS — THREE APPROACHES

1. NUCLEAR
   $ claude --dangerously-skip-permissions

2. PRE-APPROVE THE SAFE STUFF (recommended)
   $ /permissions
   → Saves to .claude/settings.json

3. DENY THE DANGEROUS STUFF
   → Blocks rm, package installs, .env reads
   → Even if accidentally pre-approved

4. Sneak preview - Auto Mode
https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode 
```

---

```json
SETTINGS.JSON — COMMON CONFIG

{
  "permissions": {
    "allow": [
      // Reading files and folders
      "Bash(cat:*)",
      "Bash(ls:*)",

      // Running dev server, tests, formatting
      "Bash(npm run *)",

      // Git operations
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",

      // Reading, Editing and Writing files
      "Read(*)",
      "Edit(*)",
      "Write(*)"
    ],
    "deny": [
      // Installing packages
      "Bash(npm install *)",
      "Bash(npm uninstall *)",
      "Bash(yarn add *)",
      "Bash(pip install *)",

      // Deleting files or folders
      "Bash(rm *)",
      "Bash(rm -rf *)",
      "Bash(rmdir *)",

      // Anything that touches the internet
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(ssh *)",
      "Bash(scp *)",

      // Sensitive files and secrets
      "Read(.env)",
      "Read(.env.*)",
      "Read(**/secrets/*)",
      "Read(**/*credential*)",
      "Read(**/*.pem)",
      "Read(**/*.key)"
    ]
  }
}
```

---

# PART 2: THE BUILDER'S TOOLKIT

---

## Section 2.1 — CLAUDE.md

```
CLAUDE.md — THE 5 QUESTIONS

1. WHAT IS THIS?
   One sentence. Not a manifesto.

2. HOW DO I RUN THINGS?
   Where files go, what folders matter.

3. WHAT PATTERNS DO I FOLLOW?
   Voice, rules, non-negotiables.

4. WHAT'S WEIRD HERE?
   Gotchas. Counterintuitive stuff.

5. HOW DO WE WORK?
   The process. Before, during, after.

Five questions. That's the whole file.
```

---

```
THE "POINT, DON'T DUMP" TRICK

❌ DON'T paste your full brand guide
❌ DON'T paste 50 example posts
❌ DON'T paste your entire content strategy

✅ DO point Claude to where the detail lives:

For full brand voice rules and examples:
→ /references/brand-voice.md

For content pillars:
→ /references/content-pillars.md

For best-performing posts:
→ /references/best-posts/

CLAUDE.md = table of contents
NOT encyclopedia
```

---
CLAUDE.md for our Content-Repurposing Engine
```
"Create a CLAUDE.md file for this project. The project is a content repurposing engine — it takes a transcript or blog post and turns it into platform-specific drafts for LinkedIn, X, and a newsletter. Use this structure:
What this is (one sentence)
How it works (where source content lives, where drafts go)
Voice rules (I'll give you these in a moment)
Platform formatting rules
Gotchas
Workflow
Then ask me for my voice rules using your AskUserQuestions feature so we can fill them in together."
```
---

```
CLAUDE.md — THE ONE RULE

Readable in 60 seconds.
Under 200 lines.

If it's longer, you're dumping. Not pointing.
```

---

## Section 2.1b — CLAUDE.md at Scale: Your Business OS

```
YOUR BUSINESS OS

One CLAUDE.md isn't enough once
you have multiple projects.

  → Content engine
  → Client work
  → Personal brand
  → Admin
  → Experiments

You don't want to repeat your
voice rules in every single one.

You want a system where the "you"
stuff lives ONCE, and every project
inherits it automatically.
```

---

```
THE BUSINESS OS FOLDER STRUCTURE

~/projects/
├── CLAUDE.md                ← MASTER (you)
│
├── content-engine/
│   ├── CLAUDE.md            ← project-specific
│   ├── .claude/
│   └── drafts/
│
├── client-work/
│   ├── CLAUDE.md            ← agency rules
│   │
│   ├── acme-corp/
│   │   ├── CLAUDE.md        ← client specific
│   │   └── .claude/
│   │
│   └── beta-ltd/
│       ├── CLAUDE.md
│       └── .claude/
│
├── personal-brand/
│   ├── CLAUDE.md            ← different voice
│   └── .claude/
│
└── admin/
    ├── CLAUDE.md            ← invoices, finance
    └── .claude/
```

---

```
PARENT INHERITANCE

Claude reads CLAUDE.md files from
your current folder UPWARDS.

Every file on the way counts.
The CLOSEST file wins.

EXAMPLE — working in acme-corp/:

  1. acme-corp/CLAUDE.md       ← highest priority
  2. client-work/CLAUDE.md     ← inherited
  3. ~/projects/CLAUDE.md      ← inherited

All three combine into one brief.
More specific overrides more general.
You never repeat yourself.
```

---

```
THE cd QUESTION

"If I cd into a project folder,
 does Claude still see the master
 file above it?"

YES.

Claude walks UP the directory tree
from wherever you're sitting.

Working directory = starting point.
Every CLAUDE.md above it = inherited.
Closest file wins on conflicts.

You never re-brief Claude.
You just cd into the right folder
and start working.
```

---

```
MASTER CLAUDE.md EXAMPLE
~/projects/CLAUDE.md

# What is this?
Business OS root. Every project
inherits these rules.

# How I work
- Every project lives in its own folder
- Drafts always save to /drafts/[date]/
- References live in /references/
- I review everything before it ships

# Voice & patterns (applies everywhere)
IMPORTANT: Never start a post, email,
or proposal with "Excited to share" or
"Thrilled to announce". Open with a hook.

- Conversational, one idea per sentence
- Plain UK English, no fluff
- Use "you" and "I", never "we"

# Banned words
unlock, leverage, synergy, deep dive,
game-changer, seamless, robust, empower

# Gotchas
- NEVER fabricate stats, quotes, cases
- Flag uncertain facts with [VERIFY]
- NEVER publish — drafts only

# Workflow
- Plan before building >30 min tasks
- Save plans to spec.md
- Always 2-3 variations so I can pick

Lives at the TOP. Applies EVERYWHERE.
```

---

```
WHAT GOES WHERE

MASTER CLAUDE.md (top of tree)
  → Brand voice
  → Banned words
  → How you work
  → Business context
  → Anything true across ALL your work

PROJECT CLAUDE.md (per folder)
  → Project-specific rules
  → Unique workflows
  → Tool-specific gotchas
  → Things that ONLY apply here

THE RULE:
If it's true for YOU → top of the tree
If it's true for ONE project → goes there
```

---

```
DOES ~/.claude/CLAUDE.md EXIST?

Claude Code creates ~/.claude/ automatically.
But it does NOT create CLAUDE.md for you.

CHECK ON MAC/LINUX:
  $ ls -la ~/.claude
  $ cat ~/.claude/CLAUDE.md

CHECK ON WINDOWS (PowerShell):
  > dir $env:USERPROFILE\.claude
  > Get-Content $env:USERPROFILE\.claude\CLAUDE.md

"No such file" = you don't have one yet.
That's normal. You probably don't need one.
```

---

```
THREE LEVELS OF CLAUDE.md INHERITANCE

When you run Claude Code, it walks UP
the tree and combines every CLAUDE.md
it finds. Closest file wins on conflicts.

1. ./CLAUDE.md                   ← project-specific
   (the folder you're cd'd into)     HIGHEST PRIORITY

2. ~/projects/CLAUDE.md          ← business OS master
   (your business-wide rules)        INHERITED

3. ~/.claude/CLAUDE.md           ← truly global (optional)
   (every project, everywhere)       BOTTOM OF THE STACK

All three combine into one brief.
You write your rules ONCE at the
right level. Never repeat yourself.
```

---

```
SHOULD YOU USE ~/.claude/CLAUDE.md?

PROBABLY NOT AT FIRST.

PROS:
  ✓ Loads in every project, everywhere
  ✓ Even projects outside your OS folder

CONS:
  ✗ Hidden file — easy to forget
  ✗ Fires in projects that aren't yours
  ✗ Leaks your voice into client repos
  ✗ Hard to debug when something's off

START HERE:
  → Master file at ~/projects/CLAUDE.md
  → Project files in each project folder

PROMOTE TO GLOBAL ONLY IF:
  You genuinely need the same rules in
  projects OUTSIDE your projects folder.
```

---

## Section 2.2 — Global vs Local

```
GLOBAL vs LOCAL — THE FULL PICTURE

~/                          ← home directory
│
├── .claude/                ← GLOBAL (hidden)
│   ├── CLAUDE.md               Loads everywhere.
│   ├── skills/                 Always on.
│   ├── commands/               Every project.
│   └── settings.json           Hard to debug.
│
└── projects/
    ├── CLAUDE.md           ← business OS master
    │
    └── content-engine/     ← THIS project
        │
        ├── .claude/        ← LOCAL (visible)
        │   ├── skills/         Only this project.
        │   ├── commands/       You can see it.
        │   └── settings.json   Easy to debug.
        │
        ├── CLAUDE.md       ← project-specific
        ├── drafts/
        └── sources/
```

---

```
THE DOWNSIDE OF GLOBAL

1. YOU CAN'T SEE IT
   Hidden folder. Not in your file tree.
   Easy to forget what you installed.

2. IT LEAKS EVERYWHERE
   Fires in every project, whether
   you want it or not.

3. IT'S HARD TO DEBUG
   When things go wrong, more places
   to look = more time troubleshooting.

4. YOU LOSE THE MENTAL MODEL
   Becomes a black box. Stuff happens,
   you don't know why.

THE RULE:
Local first. Always.
Promote to global only after you've
used it for two weeks and you know
you want it everywhere.
```

---

```
WHEN GLOBAL IS ACTUALLY RIGHT

✓ Things genuinely universal to YOU
  (master CLAUDE.md with voice rules)

✓ Tools you've trusted for months
  (promoted from local after testing)

✓ Infrastructure stuff
  (permissions defaults, safety hooks)

For everything else:
  LOCAL FIRST. ALWAYS.
```

---

```
INSTALLING LOCAL vs GLOBAL

NPX COMMANDS:

  Global (default):  npx <tool>
  Local (better):    npx <tool> --local

GIT CLONES:

  Global:  git clone <repo> ~/.claude/...
  Local:   git clone <repo> ./.claude/...

FIND YOUR HOME DIRECTORY:

  Mac/Linux:  $ echo $HOME
              → /Users/yourname

  Windows:    > echo %USERPROFILE%
              → C:\Users\YourName
```

---

## Section 2.3 — Plan Mode

```
PLAN MODE

ACTIVATE: Shift + Tab (twice)

In Plan Mode, Claude becomes an architect:
  ✓ Can read files
  ✓ Can think about the codebase
  ✓ Can ask you questions
  ✗ CANNOT write to disk

You agree on the plan first.
Then switch out and Claude builds.
```

---

```
THE PLAN MODE PROMPT (copy-paste)

"I want to build the content repurposing
engine in this project.

I want it to:
  - Pull source transcripts from a folder
  - Generate 3 variations for LinkedIn,
    X, and a newsletter
  - Save drafts organised by date
    and platform
  - Produce a summary report at the end

Write the final plan to spec.md."
```

---

```
WHY PLAN MODE MATTERS

Context rot:
  Claude's memory fills up over time.
  Quality drops as sessions get longer.

The fix:
  Write the plan to a FILE.
  Files survive when memory doesn't.

The rule:
  Use Plan Mode for anything that takes
  more than 10 minutes to build.

Shift + Tab twice. Costs nothing.
Prevents 80% of frustration.
```

## Section 2.4 — Slash Commands

```
SLASH COMMANDS — STRUCTURE

your-project/
└── .claude/
    └── commands/
        ├── repurpose.md       → /repurpose
        ├── proposal.md        → /proposal
        └── content/
            └── newsletter.md  → /content:newsletter

Filename = command name
Subfolder = command prefix
```

---

```
$ARGUMENTS — DYNAMIC INPUTS

Repurpose the source content at: $ARGUMENTS

## Process

1. Read the source file at the path provided
2. Identify the 3-5 main ideas worth pulling out
3. For each idea, generate platform-specific drafts:
   - LinkedIn: hook line, line break, body, question CTA
   - X: conversational thread, no hashtags, max 5 posts
   - Newsletter: long-form personal narrative, 400-600 words

## Rules

- Follow the brand voice in CLAUDE.md
- Never use the banned words list
- Generate 2 variations of each so I can pick
- Save drafts to /drafts/[date]/[platform].md
- Never publish anything — drafts only
- Flag any claims you're unsure about for me to verify
```

---

## Section 2.5 — Skills

```
COMMANDS vs SKILLS

SLASH COMMANDS
  → You-invoked
  → You type /command
  → Best for tasks YOU trigger

SKILLS
  → Claude-invoked
  → Claude reads description, decides
  → Best for things Claude should
    automatically apply

Same job, different trigger style.
```

---

```
A SKILL IS JUST A FOLDER

.claude/skills/content-repurposer/
├── SKILL.md                 ← instructions
└── references/
    ├── voice-guide.md       ← reference files
    ├── platform-rules.md
    └── best-posts/          ← examples
        ├── linkedin-1.md
        └── x-thread-1.md

Folder name = skill name
SKILL.md = the brain
references/ = the detail
```

---

```yaml
SKILL.md — FRONTMATTER

---
name: content-repurposer
description: Use whenever the user asks
  to repurpose, adapt, or rewrite content
  for LinkedIn, X, Twitter, Instagram, a
  newsletter, or any social platform.
---

# Content Repurposer

[your instructions here...]
```

---

```
PROGRESSIVE DISCLOSURE

LAYER 1: Description (~100 words)
  Always loaded. Helps Claude decide
  if the skill is relevant.

LAYER 2: SKILL.md body (~200 lines)
  Loaded only when skill triggers.
  Process steps live here.

LAYER 3: Reference files (unlimited)
  Loaded only when needed.
  Examples, guides, templates.

Claude pulls in exactly what it needs.
Nothing wasted. No bloated context.
```

---

```
WHERE TO FIND SKILLS

awesome-claude-skills (ComposioHQ)
  → Invoice, content, data analysis

awesome-claude-code (hesreallyhim)
  → Curated directory of everything

anthropics/skills (Anthropic official)
  → Production-grade skills + skill-creator

INSTALL ANY SKILL:
  $ npx skills add <repo> --skill <n>
    --agent claude-code
```

---

## Section 2.5b — Building Your Own Skills

```
THE 6-STEP SKILL BUILDING FRAMEWORK

  1. NAME IT
     Short, kebab-case label
     Does ONE thing well

  2. TRIGGER
     The description Claude reads
     Be specific. List keywords.

  3. OUTCOME
     Define what "done" looks like
     Before writing a single instruction

  4. DEPENDENCIES
     Reference files, tools, assets
     List everything upfront

  5. FLOW
     Step-by-step instructions
     Order matters

  6. EDGE CASES
     Vague input. Missing data.
     Robust skills handle failure.

```

---

```
SKILL BUILDING — PRO TIPS

1. EXAMPLES BEAT INSTRUCTIONS
   5 real posts > 500 words of voice guide

2. ADD EDGE CASES OVER TIME
   Every time Claude slips, add a rule

3. SKILLS ARE PORTABLE
   Same skill works in:
   • Claude Code
   • Claude.ai
   • Cowork
   • The API

4. USE THE SKILL-CREATOR SKILL
https://github.com/anthropics/skills/tree/main/skills/skill-creator 
   Anthropic's tool that helps you
   build new skills properly
```

---

## Section 2.6 — Hooks

```
THE HOLY TRINITY

SKILLS    = how Claude THINKS
            (suggestions, AI-powered)

HOOKS     = what happens AUTOMATICALLY
            (guarantees, no AI needed)

COMMANDS  = what YOU trigger
            (manual, on demand)

Together, they form the system.
```

---

```
HOOKS WORTH KNOWING

SAFETY
  • block-dangerous-commands
    (stops rm -rf and similar)
  • protect-secrets
    (blocks .env and credential reads)

PRODUCTIVITY
  • banned-word-checker
    (scans drafts before saving)
  • cc-notify
    (desktop pings when Claude finishes)
  • auto-stage
    (git stages files automatically)

Hooks live in: .claude/settings.json
```

---

## Section 2.7 — MCPs

```
WHAT IS AN MCP?

MCP = Model Context Protocol

A single standard for how AI tools
connect to apps. Every MCP server
speaks the same language.

Think USB-C for software.
One plug fits everything.

Once installed, Claude Code can:
  → Read your data
  → Write to your apps
  → Run actions
  → All from inside your normal session
```

---

```
MCPs WORTH INSTALLING

NOTION
  Content calendars, knowledge bases

SUPABASE
  Database queries without writing SQL

CONTEXT7
  Pulls current docs (not stale training)

GMAIL
  Read, draft, triage your inbox

GOOGLE DRIVE
  Pull docs, save outputs

AIRTABLE
  CRM data, content calendars

n8n
  Create and edit workflows directly

FIND MORE: awesome-mcp-servers / mcp.so
```

---

```
INSTALLING AN MCP

EASIEST WAY — just ask Claude:

  "Connect to the Notion MCP server.
   Walk me through it step by step."

Claude creates .mcp.json, sets up the
config, asks you for credentials.

Restart Claude Code. Done.
```

---

## Section 2.8 — Plugins

```
PLUGINS = MEAL KITS

A plugin bundles together:
  • Skills
  • Hooks
  • Slash commands
  • Sub-agents

Into one installable package.

INSTALL FROM MARKETPLACE:
  /plugin

WARNING: Only install plugins you've
actually looked inside. Each one can
add 50+ capabilities to Claude.
Know what you're handing over.
```

---

# PART 3: PLANNING & FRAMEWORKS

---

## Section 3.1 — Why Planning Matters

```
THE BIG IDEA

A WRITTEN PLAN SURVIVES
WHEN CLAUDE'S MEMORY DOESN'T.

Conversations disappear when
context fills up.

Files don't.

Always write your plan to disk.
```

---

```
THREE LEVELS OF PLANNING

LEVEL 1 — PLAN MODE
  → Built into Claude Code
  → Use for: anything under an hour

LEVEL 2 — PRD GENERATOR
  → A structured requirements doc
  → Use for: multi-hour projects

LEVEL 3 — GSD FRAMEWORK
  → Full project management system
  → Use for: multi-day builds

Match the framework to the size of the work.
```

---

## Section 3.2 — PRD Generator

```
WHAT'S IN A GOOD PRD

✓ Project overview (one paragraph)
✓ Tech stack recommendations
✓ Architecture decisions
✓ Feature breakdown
✓ Acceptance criteria per feature
✓ Order of operations
   (what gets built first, second, third)

Everything Claude needs to build the
project without asking constant questions
or making assumptions you wouldn't make.
```

---

```
INSTALL prd-taskmaster

$ curl -fsSL https://raw.githubusercontent.com/anombyte93/prd-taskmaster/master/install.sh | bash

Then just tell Claude what you want
to build. The skill activates and
interviews you automatically.

LIGHTER ALTERNATIVE:
  /generate-agent-prd
```

---

## Section 3.3 — GSD Framework

```
GSD — GET SHIT DONE

INSTALL:
  $ npx get-shit-done-cc

THE 3-COMMAND WORKFLOW (per phase):

  1. /gsd:plan phase X
     → Detailed breakdown

  2. /gsd:execute phase X
     → Spawns fresh sub-agents
     → Each task in its own context

  3. /gsd:verify phase X
     → Checks the work
     → Creates fix plans if needed
```

---

```
GSD MAINTAINS THESE FILES

ROADMAP.md
  → Big picture: milestones & phases

REQUIREMENTS.md
  → What needs to be true when done

STATE.md
  → Where you are right now

Plus phase-specific docs that give
Claude exactly the right context for
each piece of work — nothing more.

Every task = atomic git commit.
Roll back to exactly when something broke.
```

---

```
WHICH FRAMEWORK TO PICK?

PLAN MODE       → Quick builds (under a day)
                  Landing page, simple tool

PRD GENERATOR   → Multi-hour projects
                  Client deliverable, full tool

GSD             → Multi-day builds
                  Full app, platform, real complexity

The mistake: jumping straight to building
              with no plan at all.

The other mistake: using GSD for a 20-min job.

Match the tool to the size of the work.
```

---

# PART 4: ADVANCED TECHNIQUES

---

## Section 4.1 — Agents, Sub-Agents & Teams

```
THREE LEVELS OF CLAUDE WORKING

SINGLE AGENT
  → One terminal, one conversation
  → 80% of your daily work

SUB-AGENTS
  → Specialists in their own context
  → Hand off task → get result back
  → Best for self-contained jobs

AGENT TEAMS (2026)
  → Multiple teammates working in parallel
  → Can message each other directly
  → Best for cross-collaboration tasks
```

---

```
WHEN TO USE WHAT

SINGLE AGENT
  → One feature, one file
  → Most things you do daily

SUB-AGENTS
  → Research, audits, code reviews
  → "Go away, do this, come back"
  → You want the result, not the process

AGENT TEAMS
  → Multi-platform content repurposing
  → Builds where specialists need
    to coordinate
  → Parallel work that needs sync
```

---

```
SKILL vs SUB-AGENT

SKILL
  → Augments your main Claude
  → Makes the conversation better at
    a specific thing
  → You stay in the driver's seat
  → "Be better at X right now"

SUB-AGENT
  → Delegates to a specialist
  → Goes away, returns with the answer
  → Self-contained task
  → "Handle X completely"

Skills augment.
Sub-agents delegate.
```

---

```
ENABLE AGENT TEAMS

In .claude/settings.json:

{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": 1
}

Restart Claude Code.

Then in your prompt, ask for a team:
  "Create an agent team to..."

Claude spawns the teammates on the fly.
```

---

```
NAVIGATING A TEAM

Switch teammate:    Shift + ↑ / Shift + ↓
View their work:    Enter
Interrupt them:     Escape
Talk directly:      Select them, then type

You can bypass the lead and give
direct instructions to any teammate.
```

---

## Section 4.2 — /loop

```
/loop — BACKGROUND TASKS

Give Claude a recurring task in plain English.
Claude runs it on autopilot in the background.

EXAMPLES:
  • "Every 30 mins, check if my site is up"
  • "Every morning at 8am, draft posts from
     the content calendar"
  • "Every hour, monitor this PR for changes"

SAFETY NETS BUILT IN:
  ✓ Tasks auto-expire after 3 days
  ✓ Session-scoped (only runs while open)
  ✓ Waits if Claude is busy
```

---

## Section 4.3 — Git Worktrees

```
GIT WORKTREES — PARALLEL ISOLATION

CREATE:
  $ claude --worktree feature-name

WHAT IT DOES:
  → Isolated copy of your project
  → Same git history
  → Separate files
  → Changes don't affect main tree
    until you merge

WHY IT MATTERS:
  → Experiment without fear
  → Run multiple agents safely
  → No file conflicts
```

---

## Section 4.4 — Remote Control

```
REMOTE CONTROL — WORK FROM ANYWHERE

ENABLE:
  /remote-control

  or start a new session with:
  $ claude rc

THEN:
  1. Get a URL from the terminal
  2. Open URL in Claude mobile app
  3. Phone is now connected to your
     live laptop session

Send instructions from your phone.
Claude executes on your computer.
Files never leave your machine.
```

---

## Section 4.5 — Conversation History

```
SEARCH YOUR PAST WORK

Conversation history lives at:
  ~/.claude/projects/

Each conversation = a .jsonl file
Searchable from any new session.

JUST ASK:
  "Search my past Claude Code conversations
   for that LinkedIn hook I wrote last week
   about why most automation fails."

NEW IN 2026:
  /memory  → view what Claude remembers
            → manage auto-recorded memories

Your best work is searchable.
Stop rewriting things you already nailed.
```

---

# PART 5: WHAT'S NEXT

---

## WHERE TO START — IN ORDER

```

1. CLAUDE.md + Plan Mode
   Transforms 90% of your output quality.
   Don't skip these.

2. Build ONE skill (6-step framework)
   Pick a task you do every week.
   Build the skill. Use it for a week.

3. Connect ONE MCP
   Whichever tool you use most.
   Stop tab-switching.

4. Graduate to sub-agents and teams
   Only when projects demand it.
   Don't run teams for simple tasks.

5. Keep CLAUDE.md and skills sharp
   Every wrong output = a new rule.
   The system gets better the longer
   you use it.
```

---

```
THE POINT

Skills, CLAUDE.md, agents, planning —
none of these are about removing
the human.

They're about removing the parts of
the work that AREN'T the human.

→ The formatting
→ The drafting
→ The repetitive briefing
→ The platform-specific rewriting
→ The boring grunt work

What's left, when you take that away,
is the part that actually needs you.

→ The strategic decisions
→ The creative angles
→ The "is this good?" judgement
→ The relationship with your audience

Claude Code isn't a magic publish button.
It's a workshop where you build the
systems that let you focus on the work
that matters.
```

---

```
TWO THINGS BEFORE YOU GO

1. AGENTIC ACADEMY
   Complete Agentic OS, skills packages out the box, extension topics on what you learned today
   → skool.com/scrapes

2. COMMENT BELOW
   Tell me what you're going to build
   I read every single one
```

---