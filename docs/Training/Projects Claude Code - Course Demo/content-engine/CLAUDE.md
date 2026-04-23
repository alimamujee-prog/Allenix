# Content Repurposing Engine

A tool that transforms long-form content (transcripts, blog posts) into platform-specific drafts for LinkedIn, X, and newsletters.

## How It Works

- **Source content** goes in the project root (e.g., `transcript.txt`)
- **Generated drafts** go in `/drafts/` with one file per platform:
  - `linkedin-post.md`
  - `x-thread.md`
  - `newsletter-intro.md`

## Voice & Brand Rules

All voice and tone guidelines live in `/references/brand-voice.md`. Read that file before generating any draft. Every draft must pass the voice rules defined there.

## Platform Formatting Rules

All platform-specific formatting rules live in `/references/platform-formatting.md`. Read that file before generating any draft.

## Gotchas

- Never copy-paste verbatim from the source transcript. Always rewrite.
- Don't include timestamps, filler words, or conversational artifacts from transcripts.
- Each platform draft must stand alone — don't assume the reader has seen the other versions.
- LinkedIn is not X. Don't write tweet-length paragraphs for LinkedIn or essay paragraphs for X.
- If the source material has no clear single takeaway, ask before drafting. Don't guess the angle.
- Check `/references/brand-voice.md` every time — tone drift is the most common failure mode.

## Workflow

1. Place source content (transcript or blog post) in the project root
2. Read `/references/brand-voice.md` to load voice rules
3. Read the source content end-to-end; identify the single strongest takeaway
4. Draft for all three platforms in `/drafts/`
5. Self-check each draft against voice rules and platform formatting rules
6. If anything feels off-brand or forced, flag it rather than shipping it
