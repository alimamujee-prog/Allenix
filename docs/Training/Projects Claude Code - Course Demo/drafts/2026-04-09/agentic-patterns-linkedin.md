# LinkedIn Drafts — Agentic Patterns Video

Source: https://www.youtube.com/watch?v=38t5UBCa4OI

---

## VARIATION A — "You're already using agents"

Most people using Claude Code don't realise it's already running agents for them.

Every time you start a session, three sub-agents are working behind the scenes:

- **Explore** — a read-only scout that searches your files without bloating your context
- **Plan** — activates in plan mode to research your codebase before suggesting a strategy
- **General Purpose** — the heavy lifter with full read/write access for complex, multi-file tasks

You never asked for any of them. Claude just decides when to spin them up based on the complexity of what you're doing.

And that's only the beginning. There are actually five distinct patterns for how you can work with Claude Code — from a simple single conversation all the way to fully autonomous, scheduled workflows that run while you sleep.

The one that changed how I work? The `-w` flag. It opens isolated work trees so you can run completely separate tasks in parallel without any context bleed between them.

Which pattern are you using right now — and which one should you be using?

---

## VARIATION B — "Stop using Claude Code like a chatbot"

If you're giving Claude Code one task, waiting for the result, then typing the next task — you're leaving most of its power on the table.

You wouldn't run a team that way. You'd run people in parallel and bring in specialists when needed.

Claude Code is built to work exactly like that. Here are the five patterns, from simplest to most advanced:

1. **Sequential flow** — one conversation, tasks building on each other (what most people do)
2. **Operator** — you open multiple terminals, each with its own isolated workspace using `claude -w`
3. **Split and merge** — Claude itself fans out work to sub-agents and merges the results
4. **Agent teams** — agents that can actually talk to each other through a shared task list [VERIFY: still experimental, ships with Opus 4.6]
5. **Headless** — Claude runs autonomously with the `-p` flag, no human in the loop

The real shift happens when you stop treating it as a chatbot and start treating it as a team.

What's one task you'd hand off to headless mode tomorrow morning?
