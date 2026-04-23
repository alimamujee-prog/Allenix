# X Thread Drafts — Agentic Patterns Video

Source: https://www.youtube.com/watch?v=38t5UBCa4OI

---

## VARIATION A — "The 5 levels"

**Post 1:**
There are 5 levels to using Claude Code.

Most people are stuck on level 1.

Here's the full progression:

**Post 2:**
Level 1: Sequential flow.

One terminal. One conversation. Each task builds on the last.

Simple, but you'll hit context rot eventually. The longer the session, the more Claude forgets.

**Post 3:**
Level 2: Operator mode.

Open multiple terminals with `claude -w`. Each gets its own isolated workspace and branch.

You coordinate between them manually. Perfect for independent tasks that don't depend on each other.

**Post 4:**
Level 3: Split and merge.

Give Claude a big task. It breaks it into pieces, fans out sub-agents in parallel, and merges the results back.

You can even set up a builder-validator chain — one agent builds, another reviews. Built-in quality check without you doing the reviewing.

**Post 5:**
Level 5: Headless.

`claude -p "your prompt"` — no terminal, no interaction, no human in the loop.

Hook it into a cron job and Claude runs tasks on a schedule while you sleep.

The constraint: only use it for tasks where the output is easy to verify.

---

## VARIATION B — "The thing most people miss"

**Post 1:**
The thing most people miss about Claude Code:

It's already running agents for you. You just can't see them.

**Post 2:**
Three sub-agents are baked in:

- Explore (read-only scout, runs on Haiku)
- Plan (researches your codebase in plan mode)
- General Purpose (full read/write, runs on Sonnet)

Claude decides when to use them automatically based on task complexity.

**Post 3:**
But the real shift is when you take control of the patterns yourself.

The `-w` flag gives you isolated work trees. Separate branch, separate context, zero interference between tasks.

Close the window and Claude cleans up automatically.

**Post 4:**
The most advanced pattern right now: agent teams.

Agents that share a task list and can message each other directly.

Still experimental. Ships with Opus 4.6. Uses roughly 4-7x the tokens of a single session.

Only worth it when tasks genuinely need cross-collaboration.

**Post 5:**
The pattern I keep coming back to: headless mode with `-p`.

Set a cron job. Claude reviews yesterday's work and writes a morning summary before you even open your laptop.

That's when it stops being a tool and starts being a team member.
