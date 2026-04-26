# WbD Revenue Architecture - Structured Benchmarks

Purpose: keep quantitative claims out of fuzzy retrieval. Use this file before answering questions about benchmarks, formulas, conversion rates, discounting, GRR, NRR, CSM capacity, or GTM motion economics.

## Source Priority

1. Reconciliation report for corrected or disputed numbers.
2. L2 knowledge base for synthesized claims.
3. Raw source files for exact quotes or unresolved details.

When a value is marked "derived", say that it is derived or estimated rather than directly sourced.

## Market Benchmarks

| Metric | Value | Source | Confidence |
|---|---:|---|---|
| Public SaaS growth rate decline | 36% -> 18% | Has SaaS Lost GTM Fit; Revenue Architecture Ch 1 | Confirmed |
| Cost to acquire net new ARR | 150% -> 264% | Has SaaS Lost GTM Fit | Confirmed |
| Top public SaaS NRR average decline | 123% -> 113% | Has SaaS Lost GTM Fit | Confirmed |
| SaaS market value destruction | About 50%, average market caps down 57% from highs | Revenue Architecture Ch 1 | Confirmed |
| SVB collapse date | March 10, 2023 | Revenue Architecture Ch 1 | Confirmed |

## Monetization And Win Rate

| Monetization model | Typical win rate | Notes | Source | Confidence |
|---|---:|---|---|---|
| Ownership / upfront | About 1:3, 33% | Buyer has budget and bears more risk | Revenue Architecture Fig 5.8; Fundamental Models | Confirmed |
| Multi-year SaaS | About 1:4, 25% | Longer commitment improves qualification | Revenue Architecture Fig 5.8 | Confirmed |
| Annual SaaS / subscription | About 1:5 to 1:6, 17% to 20% | Seller carries more risk than ownership | Revenue Architecture Fig 5.8; Fundamental Models | Confirmed |
| Monthly SaaS | About 1:6, 17% | Lower friction, lower qualification | Revenue Architecture Fig 5.8 | Confirmed |
| Usage / consumption | About 1:10, 10% | More seller risk, lower buyer commitment | Revenue Architecture Fig 5.8 | Confirmed |
| Freemium | About 1:8 to 1:100 | Wide variance by product and activation model | Revenue Architecture Fig 5.8; Fundamental Models | Confirmed range |

## GTM Motion Benchmarks

| Motion | ACV guide | Win rate | GRR target | NRR target | Notes |
|---|---:|---:|---:|---:|---|
| No Touch | $0 to $1K | About 20% | 80% | About 100% to 105% | NRR is derived |
| Low Touch | $1K to $15K | About 20% | 85% | About 105% to 110% | NRR is derived |
| Mid Touch | $15K to $100K | About 20% to 25% | 90% | About 110% to 115% | NRR is derived |
| High Touch | $100K to $500K | About 25% to 30% | 95% | About 115% to 125% | NRR is derived |
| Dedicated Touch | $500K+ | About 30%+ | 98% | About 120% to 130% | NRR is derived |

GRR targets use the GTM-motion-specific table from the book. NRR targets are derived benchmarks correlated with growth-rate curves and should be labeled as derived unless verified against a direct benchmark source.

## Cost To Serve By Motion

| Motion | Cost-to-serve order of magnitude | Source | Confidence |
|---|---:|---|---|
| No Touch | About $10 | Revenue Architecture Fig 10.11 | Source gap noted |
| Low Touch | About $100 | Revenue Architecture Fig 10.11 | Source gap noted |
| Mid Touch | About $1,000 | Revenue Architecture Fig 10.11 | Source gap noted |
| High Touch | About $10,000 | Revenue Architecture Fig 10.11 | Source gap noted |
| Dedicated Touch | About $100,000+ | Revenue Architecture Fig 10.11 | Source gap noted |

Use these as order-of-magnitude economics, not exact operating budgets.

## Discount Mathematics

Baseline from WbD discount research:

| Scenario | Value |
|---|---:|
| Baseline flow | 500 prospects -> 8 SALs -> 1.6 wins |
| List price | $20,000 |
| Baseline ARR(new) | $32,000 |
| Win rate needed to offset 20% discount | 1:4 instead of 1:5 |
| Win rate needed to offset 35% discount | 1:3 instead of 1:5 |
| Typical win-rate improvement after extensive training | About 10%, such as 20% -> 22% |
| 20% discount plus 10% win-rate drop | $32,000 -> $23,040, a 28% revenue decline |
| Discount discipline opportunity | Often 15% to 20% of ARR in $10M+ companies |

Operating rule: trade, do not negotiate. Give price only in exchange for payment terms, commitment date, references, multi-year term, or another measurable seller benefit.

## Sales Process Mathematics

| Claim | Value | Source | Confidence |
|---|---:|---|---|
| Enterprise 12-meeting process with 28.5% win rate | About 90% success per meeting | Mathematical Models YouTube; Revenue Architecture Formula 7-7 | Confirmed |
| SMB 5-meeting process with 20% win rate | About 72% success per meeting | Mathematical Models YouTube; Revenue Architecture Formula 7-7 | Confirmed |
| 15% improvement across 5 conversion points | About 2x revenue | Mathematical Models YouTube; Sweet Spot | Confirmed |
| Reducing Enterprise cycle from 12 to 11 meetings at 90% per meeting | Win rate rises from about 28.5% to about 31.6% | L2 derived from formula | Derived |
| Improving per-meeting success from 90% to 91% across 12 meetings | Win rate rises from about 28.5% to about 34.3% | L2 derived from formula | Derived |

## Retention And Expansion

| Metric | Formula or value | Source | Confidence |
|---|---|---|---|
| GRR | (Start MRR - Contraction - Churn) / Start MRR | Revenue Architecture Formula 7-8 | Confirmed |
| NRR | (Start MRR + Expansion - Contraction - Churn) / Start MRR | Revenue Architecture Formula 7-9 | Confirmed |
| NRR greater than 100% | Expansion exceeds churn and contraction | L2 synthesis | Confirmed |
| NRR greater than 120% | Company can grow meaningfully even without new acquisition | L2 synthesis | Confirmed |
| NRR greater than 130% | Usually High Touch or Dedicated motions; can grow with little new acquisition | Has SaaS Lost GTM Fit | Confirmed |

## Customer Success Capacity

| Metric | Value | Source | Confidence |
|---|---:|---|---|
| Annual work hours per CSM | About 2,000 | CS as Profit Center YouTube | Confirmed |
| Client-work utilization | About 70% | CS as Profit Center YouTube | Confirmed |
| Client-work hours per CSM | About 1,400 | Derived from 2,000 x 70% | Confirmed |
| Enterprise accounts per CSM | About 20 | CS as Profit Center YouTube | Confirmed |
| Hours per enterprise account per year | About 70 | Derived from 1,400 / 20 | Confirmed |

## Red Flag Thresholds

| Signal | Threshold | Interpretation |
|---|---:|---|
| GRR for Mid+ Touch | Below 80% | Fundamental product-market, ICP, or delivery problem |
| NRR | Below 100% | Revenue base is shrinking after expansion and churn |
| Win rate | Below 10% for relevant motion | Qualification or discovery failure |
| Average discount | Above 15% | Sales discipline failure; value not established |
| Cost to serve | Above 40% of ACV | CS motion misaligned with price point |
| Time to First Impact | More than 2x benchmark | Onboarding process broken or ICP wrong |
| Sales cycle | More than 2x benchmark for motion | Missing Critical Event or weak multi-threading |
