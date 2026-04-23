# Allenix Med Spa — List Building Strategy

## Date
2026-04-23

---

## Target

1,200 ICP-qualified contacts per month, sourced across four channels, generating 12 qualified conversations.

---

## ICP Filter Criteria

Every contact must match **all** of these:

| Signal | Requirement | Why |
|--------|-------------|-----|
| Industry | Medical spa, aesthetic practice, med spa-adjacent wellness clinic | Vertical specificity |
| Revenue | $1M–$10M (sweet spot $2M–$8M) | Can afford Quick Start, likely to ascend |
| Employees | 5–50 | Big enough to need automation, small enough to lack systems |
| Locations | 1–3 | Multi-location signals growth pain |
| Owner type | NP, MD, DO, RN who owns the practice, or entrepreneur-operator | Decision maker, not a committee |
| Geography | Gulf South first (Houston, Dallas, San Antonio, Nashville, Birmingham), then secondary markets (Atlanta, Phoenix, Denver, Charlotte, Tampa) | Ali's network density, travel efficiency |
| Online booking | Has online scheduling ( signals tech-readiness) | Easier to integrate automation |
| Instagram presence | Active business account | Signals marketing awareness, researchable |

**Exclude:**
- PE-backed or chain-owned (different buyer, longer sales cycle)
- Solo practitioners with no staff (too small for automation)
- Dental spas, chiropractic (adjacent but different workflows)
- Practices with >5 locations (enterprise sales motion, different play)

---

## Data Sources

### Primary (Volume + Accuracy)

**1. Apollo.io**
- Filter: Industry = "Medical Spa" OR "Aesthetics" OR "Cosmetic Surgery", Revenue = $1M–$10M, Employee count = 5–50, Location = target geographies
- Title targets: Owner, Founder, CEO, Medical Director, Practice Owner
- Expected yield: 200–400 contacts/month
- Cost: ~$49–$99/mo for starter plan
- Enrichment: Apollo provides email, phone, LinkedIn URL, company size, estimated revenue

**2. LinkedIn Sales Navigator**
- Already in Allenix tech stack
- Search: Industry = "Medical Spa" OR "Aesthetics", Headline contains "Owner" OR "Founder" OR "Medical Director", Location = target metros
- Save leads to lists, track who viewed profile
- Expected yield: 300–500 contact attempts/month
- Cost: Already paid for

**3. Google Maps + Apify Scraping**
- Scrape Google Maps for "medical spa" in target cities
- Apify Google Maps scraper extracts: business name, phone, website, address, rating, review count, hours
- Cross-reference with website to find owner name (usually on About page)
- Expected yield: 200–300 contacts/month
- Cost: Apify ~$49/mo

### Secondary (Quality + Warm)

**4. AmSpa (American Med Spa Association) Directory**
- Member directory with practice details
- Higher quality: these owners invest in their business
- Expected yield: 50–100 contacts/month
- Cost: Free (public directory) or membership for full access

**5. State Licensing Boards**
- Medical spa / med spa licenses are public in TX, FL, CA, and others
- Texas Medical Board and Texas Department of Licensing and Regulation
- Cross-reference with Google Maps data
- Expected yield: 50–100 contacts/month
- Cost: Free (public records)

**6. Instagram DM Outreach**
- Search hashtags: #medspaowner, #medicalspa, #aestheticnurse, #npinjector, #medspalife
- Identify practice owners from their profiles (usually the face of the account)
- DM with personalized compliment + question (not a pitch)
- Expected yield: 100–150 contacts/month
- Cost: Time only

### Tertiary (Long-term Pipeline)

**7. Industry Events**
- Medical Spa Show (AmSpa annual conference)
- Vegas Cosmetic Surgery & Aesthetic Dermatology
- Local/state aesthetic medicine events
- Expected yield: 30–50 contacts/event
- Strategy: Attend, collect cards, follow up within 24 hours

**8. Referral Partner Network**
- Practice management software reps (Zenoti, PatientNow, Boulevard)
- Aesthetic pharmaceutical reps (Allergan, Galderma, Merz)
- Medical spa consultants (Terri Ross, Catherine Maley audiences)
- Equipment sales reps
- These people talk to 20+ practice owners/week. Make them your referral source.
- Expected yield: 20–50 warm intros/month once network is built

---

## Monthly Volume Plan

| Channel | Monthly Contacts | Expected Replies | Expected Meetings |
|----------|-----------------|-----------------|------------------|
| Cold Email (Apollo + scraped) | 700 | 35 (5%) | 7 (20% book rate) |
| LinkedIn (Sales Nav) | 200 | 12 (6%) | 3 (25% book rate) |
| Instagram DMs | 150 | 15 (10%) | 2 (13% book rate) |
| Warm / Referral / Events | 150 | 30 (20%) | 2 (7% book rate) |
| **Total** | **1,200** | **92** | **14** |

Target: 12 meetings. Plan for 14 to account for no-shows and cancellations.

---

## List Building Workflow (Weekly Cadence)

### Monday: Source & Enrich
- Pull 300 new contacts from Apollo (filtered for ICP)
- Run Apify scraper on 2–3 target cities
- Export to HubSpot with enrichment data
- Verify emails using Apollo's built-in verifier or NeverBounce (~$0.003/email)

### Tuesday–Thursday: Outreach
- Send 30 cold emails/day (personalized, not templated blast)
- Send 10 LinkedIn connection requests/day with personalized notes
- Send 5 Instagram DMs/day
- Follow up on previous week's replies

### Friday: Follow-up & Qualify
- Send follow-up sequences to non-responders (2nd and 3rd touches)
- Reply to all responses within 2 hours
- Book calls for the following week
- Update HubSpot with all activity

### Ongoing
- Add referral partner contacts to database
- Track response rates by channel, subject line, and messaging variant
- Kill underperforming sequences, double down on winners
- Refresh list quarterly to avoid fatigue

---

## Email Infrastructure Setup

### Sending Setup
- **Tool:** HubSpot (already in tech stack) or Resend for transactional-style cold email
- **Domain:** Use a subdomain like `outreach.allenix.com` to protect main domain reputation
- **Warm-up:** 2 weeks of gradual volume increase before hitting 30/day
- **Signature:** Ali Mamujee, Founder, Allenix. Houston, TX. No logo, no banner — looks personal.

### Deliverability Rules
- Never send more than 40 cold emails/day from one address
- Use a second address (Ali personal email) for warm contacts
- SPF, DKIM, DMARC all configured on outreach subdomain
- Track opens and clicks via HubSpot, but don't rely on open rate as primary metric (reply rate matters more)
- Clean bounced emails weekly

---

## Contact Data Schema (HubSpot)

For each contact, capture:

| Field | Source | Purpose |
|-------|--------|---------|
| First name | Apollo / LinkedIn | Personalization |
| Practice name | Apollo / scraping | Email personalization |
| Owner title | Apollo / website | Confirm decision maker |
| City + State | Apollo / scraping | Geographic targeting |
| Estimated revenue | Apollo estimate | ICP qualification |
| Employee count | Apollo / LinkedIn | ICP qualification |
| Number of locations | Website / Google Maps | ICP qualification |
| Practice management software | Website / job postings | Integration readiness |
| Instagram handle | Manual lookup | DM channel, research |
| Email | Apollo / verification | Cold email |
| Phone | Apollo / scraping | Follow-up |
| Last outreach date | HubSpot tracking | Cadence management |
| Last response | HubSpot tracking | Pipeline stage |
| Source channel | Manual tag | Attribution |

---

## First Three Cities to Target

**Houston** (home market)
- ~180+ med spas in metro area
- Ali's personal network density
- Ion District proximity to medical district
- Can do in-person assessment calls

**Dallas–Fort Worth**
- ~200+ med spas in metro area
- 3.5 hour drive from Houston
- Large NP-owned practice segment
- Strong Instagram presence among practices

**San Antonio**
- ~80+ med spas in metro area
- 3 hour drive from Houston
- Less competitive market (fewer agencies calling)
- Growing aesthetic market

After these three are producing pipeline, expand to Nashville, Birmingham, then Atlanta, Phoenix, Denver.

---

## Success Metrics

| Metric | Target | Measure Frequency |
|--------|--------|------------------|
| New contacts added/week | 300 | Weekly |
| Email send volume/week | 150 | Weekly |
| Email reply rate | >4% | Weekly |
| LinkedIn acceptance rate | >25% | Weekly |
| Instagram DM response rate | >8% | Weekly |
| Meetings booked/week | 3 | Weekly |
| Meeting no-show rate | <15% | Weekly |
| Cost per meeting | <$50 | Monthly |
| List exhaustion rate | <5%/month | Monthly |
