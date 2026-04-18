# WbD Revenue Architecture — Benchmark Reconciliation Report

Cross-reference of quantitative claims across three source pillars: PDF book (~80K words), 43 website research documents (~163K words), 20 YouTube transcripts (~187K words). Generated 2026-04-18.

---

## CONFIRMED BENCHMARKS (No Conflicts)

These claims are consistent across all sources that mention them.

### Macro Market Data
| Claim | L2 Value | PDF Source | Website Source | Status |
|---|---|---|---|---|
| SaaS growth rates halved | 36% → 18% | Ch 1 | Has SaaS Lost GTM Fit; Back to the Future; GTM Efficiency | CONFIRMED (3 sources) |
| CAC surge | 150% → 264% | — | Has SaaS Lost GTM Fit, line 79 | CONFIRMED |
| SaaS market value destruction | 50% / 57% from highs | Ch 1 | — | CONFIRMED |
| DocuSign share drop trigger | >40% decline Dec 3, 2021 | Ch 1 | Sweet Spot | CONFIRMED |
| SVB collapse date | March 10, 2023 | Ch 1 | — | CONFIRMED |

### NRR Company-Level Data (Snowflake, Twilio, etc.)
| Company | L2 Claim | Source Data | Status |
|---|---|---|---|
| Snowflake NRR | 171% → 135% | Has SaaS Lost GTM Fit, Table 1: 171%→165%→151%→135% | CONFIRMED |
| Twilio NRR | 123% → 101% | Has SaaS Lost GTM Fit, Table 1: 123%→110%→103%→101% | CONFIRMED |
| WalkMe NRR | Not in L2 | Source: 120%→116%→109%→104% | Not synthesized |
| ZoomInfo NRR | Not in L2 | Source: 116%→116%→104%→104% | Not synthesized |
| Cloudflare NRR | Not in L2 | Source: 126% (Jun'22) | Not synthesized |

### Win Rate by Monetization Strategy
| Model | L2 Claim | PDF (Fig 5.8) | Website (Fundamental Models) | Status |
|---|---|---|---|---|
| Ownership (upfront) | ~1:3 (33%) | 1:3 (33%) | "about 1:3" | CONFIRMED |
| Multi-year SaaS | Not explicit | 1:4 (25%) | — | Not in L2 |
| Annual SaaS (subscription) | ~1:5 or 1:6 | 1:5 (20%) | "1:5 or 1:6" | CONFIRMED |
| Monthly SaaS | Not explicit | 1:6 (17%) | — | Not in L2 |
| Usage/Consumption | Not explicit | 1:10 (10%) | — | Not in L2 |
| Freemium | 1:8 or worse | **1:100 (1%)** | "1:8 or even less" | SEE DISCREPANCY #2 |

### Discount / Win Rate Relationship
| Claim | L2 Value | Source (Discount vs Win Rate) | Status |
|---|---|---|---|
| Baseline formula | 500→8 SALs→1.6 wins, $20K list, $32K ARR | Lines 34-97: exact match | CONFIRMED |
| 20% discount → 1-in-4 win rate needed | "compensate for 20% discount, win rate must increase from 1:5 to 1:4" | Line 351: "when a 20% discount is given, we need to increase the win rate from 1-in-5 to 1-in-4" | CONFIRMED |
| 35% discount → 1-in-3 win rate needed | Confirmed in L2 | Line 353-357: "At a 35% discount, you need to improve to a win rate of 1-in-3" | CONFIRMED |
| Training improves win rate ~10% | "20% → 22% after extensive training" | Lines 373-378: "improve the win rate by 10%, e.g., from 20% to 22%" | CONFIRMED |
| 20% discount + 10% win rate drop = 28% revenue decline | L2: $32,000 → $23,040, "28% revenue decline" | Lines 430-434: "20% discount results in a 10% decrease in win rate, resulting in a 28% decrease in revenue (from $32,000 to $23,040)" | CONFIRMED |

### CS Capacity Planning
| Claim | L2 Value | Source | Status |
|---|---|---|---|
| CSM accounts (enterprise) | ~20 accounts per CSM | YouTube: CS as Profit Center: "we have 1400 hours... 20 accounts and that's it" | CONFIRMED |
| Hours per account | ~70 hours/year | YouTube: CS as Profit Center (implied by 1400/20=70) | CONFIRMED |
| Utilization rate | 70% | YouTube: "utilize about 70% of that for client work" | CONFIRMED |
| Total work hours | 2,000/year | YouTube: "2,000 work hours a year" | CONFIRMED |

### Mathematical Model
| Claim | L2 Value | PDF Source | Status |
|---|---|---|---|
| CR^n: 12 meetings, 90% = 28.5% win rate | Confirmed | Formula 7-7: 20×0.85^12 = 2.85 | CONFIRMED |
| 5 meetings, 72% = 20% win rate | Confirmed | Formula 7-7 calculations | CONFIRMED |
| GRR formula | (Start - Contraction - Churn) / Start × 100 | Formula 7-8: exact match | CONFIRMED |
| NRR formula | (Start + Expansion - Contraction - Churn) / Start × 100 | Formula 7-9: exact match | CONFIRMED |
| $80K savings → $3.95M revenue loss | CS headcount cut case study | YouTube: Mathematical Models | CONFIRMED |
| 1.15^5 = 2.01x (10% Marginal Gain) | Confirmed | Derived from Growth Formula | CONFIRMED |

### Growth Formula
| Claim | L2 Value | PDF Source | Status |
|---|---|---|---|
| ARR = VM1 × CR1 × CR2 × CR3 × CR4 × (1-CR5) × ACV | Confirmed | Formula 7-8 / Table 7.2 | CONFIRMED |
| 7-year monetization crossover | Ownership $2,800, Subscription $11,200, Compounding $13,743 | Table 7.7: exact match | CONFIRMED |
| Rob vs Jennifer (NRR beats initial volume by Year 2) | Referenced | Table 6.4: exact match | CONFIRMED |

---

## DISCREPANCIES FOUND

### Discrepancy #1: NRR Decline Starting Point

| | Value |
|---|---|
| **L2 Claim** | "Top-performing public SaaS companies saw NRR decline from **126%** to 113%" |
| **Source** | Has SaaS Lost GTM Fit: "NRR has dropped from **1.23** to 1.13" (= 123% to 113%) |
| **Severity** | LOW — 3 percentage points |
| **Likely cause** | L2 may have conflated Cloudflare's individual NRR (126% at Jun'22) with the overall average (123%). The source explicitly says "1.23 to 1.13." |
| **Recommended fix** | Change L2 from "126%" to "123%" to match the source document. |

### Discrepancy #2: Freemium Win Rate

| | Value |
|---|---|
| **L2 Claim** | "1:8 or worse (freemium)" |
| **PDF (Fig 5.8)** | **1:100 (1%)** |
| **Website (Fundamental Models)** | "more like 1:8 or even less" |
| **Severity** | MEDIUM — 12.5% vs 1% is a large absolute difference |
| **Likely cause** | The PDF book (Jan 2024) contains updated, more specific data than the website brief (Jun 2022). The website uses "1:8 or even less" as a qualitative range. The PDF provides the precise figure. |
| **Recommended fix** | Update L2 to: "~1:8 to 1:100 (freemium; varies widely by product type)" or use the PDF's specific 1:100 figure with attribution. Note the range reflects the wide variance in freemium models. |

### Discrepancy #3: GRR Benchmarks by GTM Motion

| GTM Motion | L2 Claim | PDF Table 10.10 (GTM motion) | PDF Table 6.5 (ACV-based) | Website/YouTube |
|---|---|---|---|---|
| No Touch | ~85% | **80%** | 90% ($0-1K) | — |
| Low Touch | ~88% | **85%** | 92% ($1-5K) | — |
| Mid Touch | ~90% | **90%** | 93-94% ($15-50K) | — |
| High Touch | ~93% | **95%** | 94-97% ($50-150K) | — |
| Dedicated Touch | ~95%+ | **98%** | 97-98% (>$150K) | — |
| **Severity** | MEDIUM | | | |
| **Likely cause** | The L2 appears to have interpolated between the two PDF tables. Table 6.5 provides ACV-based benchmarks; Table 10.10 provides GTM-motion-specific GRR targets. The L2 values don't exactly match either. |
| **Recommended fix** | Use the GTM-motion-specific table (10.10): 80%, 85%, 90%, 95%, 98%. These are the authoritative GRR targets. The ACV table (6.5) provides observed industry averages, which are higher because they include only surviving companies. |

### Discrepancy #4: Missing Consumption/Usage Win Rate

| | Value |
|---|---|
| **L2 Coverage** | Mentions ownership (1:3), subscription (1:5-1:6), freemium (1:8+) |
| **PDF (Fig 5.8)** | Also includes: Usage/Consumption = **1:10 (10%)**, Multi-year SaaS = **1:4 (25%)**, Monthly SaaS = **1:6 (17%)** |
| **Severity** | LOW — gap in coverage, not a contradiction |
| **Recommended fix** | Add consumption win rate (1:10) and multi-year (1:4) and monthly SaaS (1:6) to L2 for completeness. |

### Discrepancy #5: NRR Targets by GTM Motion

| GTM Motion | L2 Claim | PDF/Website Source | Status |
|---|---|---|---|
| No Touch | ~100-105% | Not found in sources | UNVERIFIED |
| Low Touch | ~105-110% | Not found in sources | UNVERIFIED |
| Mid Touch | ~110-115% | Not found in sources | UNVERIFIED |
| High Touch | ~115-125% | Not found in sources | UNVERIFIED |
| Dedicated Touch | ~120-130% | Not found in sources | UNVERIFIED |
| **Severity** | MEDIUM | | |
| **Likely cause** | These NRR targets may be derived from the NRR-growth-rate curves (Fig 7.10) and growth rate targets by stage, or from WbD consulting benchmarks not in the source text. The L2 synthesis may have extrapolated these from the growth rate correlation (NRR ≈ growth rate). |
| **Recommended fix** | Flag as "derived benchmarks" in L2, or verify against the Bowtie Toolkit 2026 preview or benchmarks.wbd.com data. |

---

## COVERAGE GAPS (Missing from L2)

These benchmarks exist in source material but were not included in the L2 knowledge base.

### From PDF (Not in L2)
1. **Win Rate Diagnostic Matrix** (Fig 6.7): CR3/CR4 cross-reference table for diagnosing process vs. training issues
2. **7-Year Monetization Strategy Comparison** (Table 7.7): Detailed year-by-year numbers — L2 mentions the totals but not the year-by-year breakdown
3. **Growth Stage Funding Success Rates** (Table 9.4): Seed 45%→A 27%→B 14%→C 6%→D 1%
4. **Growth Rate Nomenclature** (Table 9.2): Normal 0-10%, Rapid 10-20%, Hypergrowth 20-40%, Double 100%, Triple 200%, Blitzscaling >1000%
5. **Cost-to-Serve per GTM Motion** (Fig 10.11): $10 / $100 / $1,000 / $10,000 / $100,000+
6. **Sales Motion Salary/Quota Table** (Table 10.1): Inside Sales $45-60K/$240-480K quota through Named Account $600K-$2M/$1-10M quota
7. **Sustainability Threshold**: Acquisition cost >50% = unsustainable, 40-50% = determine path, <40% = sustainable
8. **Rob vs. Jennifer Detailed Comparison** (Table 6.4): 5-year LTV comparison showing NRR superiority
9. **BestCo Revenue Growth Data** (Table 2.1): 10-year company growth from $0.9M to $143.5M
10. **T2D3 Growth Example** (Fig 9.4): Year-by-year ARR/growth rate progression
11. **Retention by Monetization** (Fig 5.11): Perpetual 100%, Multi-year >95%, Annual >90%, Monthly >78%
12. **CR Benchmarks by ACV** (Table 6.5): Full conversion rate table across 6 ACV bands
13. **Phase Shift Revenue Milestones**: $5M→$10M→$20M→$50M→$100M→$200M→$500M→$1B

### From Website (Not in L2)
1. **WalkMe NRR trajectory**: 120%→116%→109%→104%
2. **ZoomInfo NRR trajectory**: 116%→116%→104%→104%
3. **Cloudflare NRR**: 126% (Jun'22)
4. **Growth Forecasting methodology**: Monte Carlo simulation details, Range Factor (50%, 25%), confidence levels
5. **CS Operating Model**: Detailed capacity planning, engagement cadence, coverage model

### From YouTube (Not in L2)
1. **Managing for Impact framework**: OKR alternative with Impact-based metrics
2. **Rolling out methodology**: 10:20:70 adoption curve details
3. **Prospecting workshop**: Modern outreach tactics beyond the SDR playbook

---

## SUMMARY

| Category | Count |
|---|---|
| Confirmed benchmarks | 25+ |
| Discrepancies found | 5 |
| Coverage gaps identified | 16+ |
| Critical discrepancies | 0 |
| Medium discrepancies | 3 (#2, #3, #5) |
| Low discrepancies | 2 (#1, #4) |

### Priority Fixes for L2

1. **Fix NRR decline** (Disc #1): Change "126%" to "123%" on line 26 of L2
2. **Fix freemium win rate** (Disc #2): Change "1:8 or worse" to "~1:8 to 1:100 depending on product"
3. **Fix GRR benchmarks** (Disc #3): Use the GTM-motion-specific values: 80/85/90/95/98%
4. **Flag NRR targets** (Disc #5): Mark as "derived/estimated" or verify against external source
5. **Add consumption win rate** (Disc #4): Add "Consumption: ~1:10" alongside existing entries

### Data Integrity Assessment

The L2 knowledge base has strong data integrity overall. The 25+ confirmed benchmarks show excellent source fidelity. The 5 discrepancies are all numerical precision or coverage issues — no fundamental conceptual contradictions were found across the three source pillars. WbD's methodology is internally consistent; the differences are between specific data points published at different times (Jun 2022 website briefs vs. Jan 2024 book) rather than contradictions in the underlying framework.
