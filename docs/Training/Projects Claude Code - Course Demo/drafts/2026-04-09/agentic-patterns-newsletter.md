# Newsletter Drafts — Agentic Patterns Video

Source: https://www.youtube.com/watch?v=38t5UBCa4OI

---

## VARIATION A — "I was using Claude Code wrong"

**Subject line:** I was using Claude Code wrong

I thought I was getting the most out of Claude Code. Turns out I was barely scratching the surface.

For months, I'd been working in a single terminal. Give it a task. Wait. Give it another. Wait. Everything running in sequence, like a one-person assembly line.

Then I found out something that genuinely surprised me: Claude Code is already running agents behind the scenes without you asking. Every single session, it's spinning up sub-agents — a read-only scout called Explore, a planning agent that researches your codebase, and a general-purpose agent with full read/write access. It decides when to use them based on how complex your task is.

But that's just the default behaviour. There are actually five distinct patterns for working with Claude Code, and most people never get past the first one.

**Pattern 1: Sequential flow.** One conversation. Each task builds on the last. It works, but you'll eventually hit context rot — that point where the session has accumulated so much information that Claude starts forgetting things.

**Pattern 2: Operator mode.** You open multiple terminals using the `-w` flag, each with its own isolated workspace and git branch. You coordinate between them manually. It's brilliant for independent tasks — bug fixes, new features, design experiments — that don't depend on each other.

**Pattern 3: Split and merge.** This is where Claude itself takes over the parallelisation. You give it a task, it breaks it into pieces, fans out sub-agents, and merges the results. You can even create a builder-validator chain — one agent builds something, another reviews it. A built-in quality gate without you doing any of the checking.

**Pattern 4: Agent teams.** The newest and most advanced. Agents that can actually communicate with each other through a shared task list, rather than funnelling everything through the main conversation. Still experimental — it shipped with Opus 4.6 as a research preview — and it uses roughly 4-7x the tokens of a normal session. Only reach for this when tasks genuinely need cross-collaboration. [VERIFY: experimental status and token estimates]

**Pattern 5: Headless.** No terminal. No interaction. No human in the loop. You use the `-p` flag to pass Claude a prompt, and it goes and does the work autonomously. Hook it into a cron job and you've got Claude reviewing yesterday's commits every morning before you've had coffee.

The shift in my thinking was simple: stop treating Claude Code as a chatbot and start treating it as a team. You wouldn't have your entire company work in a single Slack thread. Why would you run all your AI tasks in one conversation?

I'm now running two to three work trees in parallel for independent tasks, using split and merge for research, and experimenting with headless mode for daily summaries.

The one I haven't tried yet: agent teams. The token cost is real. But for the right project, I suspect it'll be worth it.

---

## VARIATION B — "Claude Code has a team structure. Most people ignore it."

**Subject line:** Claude Code has a team structure most people ignore

Here's something that will change how you think about AI coding tools.

Claude Code isn't a single agent. It's already a team. You just can't see the org chart.

Every time you start a session, three sub-agents are available behind the scenes. Explore is a lightweight, read-only scout that runs on Anthropic's cheapest model. Plan activates when you enter plan mode and researches your codebase before recommending a strategy. General Purpose is the heavy lifter — full read/write access, running on Sonnet.

Claude decides when to delegate to each of them automatically. You never asked for it. It just happens.

But here's what most people miss: that's only the first of five patterns you can use. And each one is a step up in parallelisation and autonomy.

The second pattern — Operator mode — is the one that made the biggest immediate difference for me. You use the `-w` flag to open isolated work trees. Each one gets its own git branch, its own context window, and its own Claude instance. They can't interfere with each other. Close a window and if nothing changed, Claude cleans it up automatically.

I started using this for the obvious stuff — running a bug fix in one terminal while building a new feature in another. But it quickly became my default way of working. Three terminals open, three separate tasks progressing simultaneously, zero context bleed between them.

The third pattern — Split and merge — takes it further. Instead of you managing the parallelism, Claude does it. Give it a research task across five competitors and it'll spin up five sub-agents simultaneously. Each works independently, and the main agent synthesises everything into one report.

The limitation? Sub-agents can't talk to each other. Everything funnels through the main agent. For most tasks that's fine. But when you need a front-end agent and a back-end agent coordinating in real time, that bottleneck matters.

Which brings us to agent teams — the newest, most experimental pattern. Agents share a task list. They can message each other directly. It shipped with Opus 4.6 and uses somewhere around 4-7x the tokens of a normal session. [VERIFY: token multiplier] My advice: don't reach for it unless you've outgrown sub-agents.

And then there's headless mode. The `-p` flag. No human in the loop. Claude processes a prompt and returns the result. Plug it into a scheduler and you've got autonomous workflows running on a timer — daily reports, content generation, code reviews — all happening before you start your day.

The progression is clear: single conversation, multiple terminals, automated sub-agents, collaborative teams, fully autonomous. Most people are still at step one.

Pick the pattern that matches the complexity of your task. Not every job needs a team. But when it does, the infrastructure is already there.
