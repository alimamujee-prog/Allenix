# WbD Revenue Architecture - Concept Cards

Purpose: give agents compact mental models to retrieve before answering. Each card includes the idea, diagnostic use, likely anti-pattern, and where to go deeper in L2.

## Card 1: Revenue Factory

Core idea: recurring revenue is produced by a system, not by heroic individual effort. Each GTM motion is a production line with its own inputs, conversion rates, cycle times, costs, and quality standards.

Use when: the user asks about scaling, repeatability, hiring, GTM design, or why growth is inconsistent.

Diagnostic questions:

- Which motion is being measured?
- Which Bowtie conversion rate or time metric is constraining output?
- Is the company trying to solve a process problem with more people?

Anti-pattern: adding headcount before the operating model and metrics are stable.

Go deeper: L2 sections 1, 2, 8, 14.

## Card 2: Recurring Impact

Core idea: recurring revenue is the result of recurring impact. Customers renew and expand when the promised impact is realized repeatedly.

Use when: the user asks about retention, churn, expansion, customer success, QBRs, onboarding, or product value.

Diagnostic questions:

- What impact was promised in sales?
- When did the customer reach first measurable impact?
- Is CS measuring usage, sentiment, or actual impact?

Anti-pattern: using health scores or QBRs that do not prove impact.

Go deeper: L2 sections 1, 11, 14.

## Card 3: Bowtie Data Model

Core idea: the funnel is incomplete for recurring revenue. The Bowtie maps acquisition, commit, onboarding, retention, expansion, and closed-loop learning.

Use when: the user asks where growth is breaking, how to measure GTM, or how to compare motions.

Diagnostic questions:

- Which VM, CR, or time metric is underperforming?
- Are left-side metrics measured in volume while right-side metrics are measured in revenue?
- Are multiple motions being averaged together?

Anti-pattern: using aggregate funnel metrics that hide motion-level bottlenecks.

Go deeper: L2 sections 4, 14.

## Card 4: Growth Formula

Core idea: growth is multiplicative. Small weakness in one conversion point suppresses the whole system, while marginal gains across several points compound.

Use when: the user asks what lever matters most, how to forecast, how to improve revenue, or whether to add pipeline.

Diagnostic questions:

- What is the full formula for this motion?
- Which conversion rate is farthest below benchmark?
- Would improving several weak links beat increasing volume?

Anti-pattern: treating growth as linear capacity planning.

Go deeper: L2 sections 5, 14.

## Card 5: GTM Motion

Core idea: ACV and deal volume determine the motion. Customer expectations and cost-to-serve must match the price point.

Use when: the user asks about sales model, SDRs, enterprise motion, PLG, segmentation, service model, or pricing.

Diagnostic questions:

- What is ACV, expected LTV, and deal volume?
- Is the customer expecting No, Low, Mid, High, or Dedicated Touch?
- Has expansion pushed accounts into a higher service motion?

Anti-pattern: selling or servicing a high-ACV customer with a low-touch motion, or loading human touch into a low-ACV sale.

Go deeper: L2 sections 8, 14 and WBD_BENCHMARKS.md.

## Card 6: SPICED Operating Model

Core idea: SPICED is not just sales qualification. It is the operating language for value promised, impact delivered, and expansion earned.

Use when: the user asks about discovery, demos, qualification, deal reviews, handoffs, onboarding, or expansion.

Diagnostic questions:

- What is the Situation?
- What Pain matters now?
- What Impact makes the problem worth solving?
- What Critical Event creates priority?
- How will the Decision be made?

Anti-pattern: moving to demo, proposal, or discount before Impact and Critical Event are clear.

Go deeper: L2 sections 6, 10, 11.

## Card 7: Process First, AI Second

Core idea: AI should improve a known process. If the process is broken, AI scales defects faster.

Use when: the user asks about AI SDRs, AI CS, automation, agents, personalization, forecasting, or pipeline generation.

Diagnostic questions:

- Which Bowtie metric should AI improve?
- Is AI improving volume, cost, quality, or feedback speed?
- What closed loop will the system create?

Anti-pattern: measuring AI by activity volume instead of conversion, quality, and impact.

Go deeper: L2 section 13 and reasoning template 5.

## Card 8: Discount Discipline

Core idea: discounting rarely pays for itself. Because revenue is multiplicative, lower ASP plus lower win rate compounds the damage.

Use when: the user asks about pricing pressure, procurement, stalled deals, win rate, or end-of-quarter closes.

Diagnostic questions:

- What is the current average discount?
- Are discounts rounded and untraded?
- Did discounting improve win rate enough to offset ASP loss?

Anti-pattern: using a discount as a Critical Event.

Go deeper: L2 sections 5, 10, 14 and WBD_BENCHMARKS.md.

## Card 9: CS As Profit Center

Core idea: CS owns the right side of the Bowtie. Retention and expansion compound over time, and CSM capacity must be managed like a scarce production resource.

Use when: the user asks about churn, CSM staffing, onboarding, expansion, account management, or renewal health.

Diagnostic questions:

- How many hours per account does the CSM model allow?
- Is Time to First Impact measured?
- Are expansion motions assigned to the right role?

Anti-pattern: giving CSMs too many accounts, then expecting proactive impact delivery.

Go deeper: L2 section 11 and WBD_BENCHMARKS.md.

## Card 10: Closed-Loop Growth

Core idea: durable growth comes from feedback loops. Impact data from customers should feed ICP, messaging, onboarding, expansion, and product learning.

Use when: the user asks about durable growth, AI-native GTM, PLG, growth loops, or scaling learning across teams.

Diagnostic questions:

- What information from retention or expansion feeds acquisition?
- How quickly does customer learning reach marketing and sales?
- Which loop is protective, accelerative, or compounding?

Anti-pattern: open-loop GTM where CS learns what works months before sales or marketing can use it.

Go deeper: L2 sections 1, 2, 7, 13.

## Card 11: Source Roles

Core idea: do not treat all retrieved text as equal. Each source pillar plays a different job.

Use when: building or judging retrieval context.

Source roles:

- Book/PDF: canonical model structure, formulas, figures, and definitions.
- Website research: newer WbD thinking, AI-GTM, current benchmarks, revised market interpretation.
- YouTube transcripts: workshop language, implementation nuance, practical examples, and spoken teaching patterns.
- Reconciliation report: corrected numbers, disputed claims, and source-confidence notes.

Anti-pattern: letting top-k retrieval return only the most semantically similar chunks from one pillar.

Go deeper: RAG_BUILD_WORKFLOW.md and reconciliation_report.md.
