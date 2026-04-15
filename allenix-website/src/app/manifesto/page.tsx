'use client'

import Link from 'next/link'
import { CyanPixelTrail } from '@/components/ui/pixel-trail'

/* ─── Design tokens (local) ──────────────────────────────────────────────────── */
const T = {
  bg:          '#06080a',
  surface:     '#0d1117',
  border:      '#1e2730',
  text1:       '#f0f2f4',   // headlines, leads, strong
  text2:       '#c0cdd8',   // body — elevated for legibility
  text3:       '#6a7a8a',   // muted labels, captions
  accent:      '#00c8b4',   // cyan only
  accentDim:   '#007d74',
  accentBg:    '#041e1c',
}

export default function ManifestoPage() {
  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text2, fontFamily: 'var(--font-body), Georgia, serif' }}>

      <CyanPixelTrail />

      {/* ── Fixed header ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px',
        background: 'linear-gradient(180deg, rgba(6,8,10,0.98) 0%, rgba(6,8,10,0) 100%)',
        backdropFilter: 'blur(2px)',
      }}>
        <Link href="/" className="manifesto-wordmark-link" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '31px', letterSpacing: '0.5px', textDecoration: 'none' }}>
          Allenix
        </Link>
        <span className="nav-manifesto-link" style={{ fontFamily: 'var(--font-body)', cursor: 'default' }}>
          The Manifesto
        </span>
      </header>

      {/* ── Editorial column ── */}
      <main style={{ paddingTop: '110px', paddingBottom: '110px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 32px' }}>

          {/* ── Title block ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '96px', lineHeight: 1, letterSpacing: '-4px',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255,255,255,0.25), 0 0 50px rgba(255,255,255,0.1)',
              marginBottom: '16px',
            }}>
              1836
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontStyle: 'italic',
              fontSize: '24px', color: T.text3, letterSpacing: '-0.3px', marginBottom: '14px',
            }}>
              A manifesto for Houston
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: T.text3 }}>
              By Ali Mamujee
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${T.border} 30%, ${T.border} 70%, transparent 100%)`, marginBottom: '8px' }} />

          {/* ════════════════════════════════════════
              THE STAKES
          ════════════════════════════════════════ */}
          <SectionBlock label="The Stakes" lead="Houston is at the moment that decides the next fifty years.">
            <BodyP>
              The coasts have written us off as an aging energy town. The talent pipeline
              that built this city in oil and medicine is being courted by Austin, Miami,
              San Francisco. The AI era is the largest economic shift in a generation.
              The coastal narrative is that it will be built somewhere else.
            </BodyP>
            <BodyP>
              We have until August 30, 2036, the city&apos;s two-hundredth birthday, to
              prove them wrong. Ten years. One decade. The shortest stretch of time in
              which a city can either claim its next chapter or watch someone else
              claim it for them.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              1836
          ════════════════════════════════════════ */}
          <SectionBlock label="1836" lead="The Allen brothers bet on a city. We are betting on what rises from it.">
            <BodyP>
              On August 30, 1836, two New York brothers named Augustus and John Kirby
              Allen ran a full-page advertisement in the Telegraph and Texas Register
              announcing the founding of the Town of Houston. They had purchased 6,642
              acres of mosquito-infested swamp on Buffalo Bayou six days earlier for
              $5,000. They had no port. They had no railroad. They had no working
              steamboat dock. The bayou they promised was navigable was, at the moment
              they wrote the words, mostly impassable.
            </BodyP>
            <BodyP>
              They had a printing press, a piece of land everyone said was worthless,
              and one sentence so audacious it became the founding line of an American city:
            </BodyP>

            <blockquote style={{
              borderLeft: `2px solid ${T.accent}`,
              paddingLeft: '24px',
              margin: '32px 0',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600,
              fontSize: '20px', lineHeight: 1.55, color: T.text1, letterSpacing: '-0.2px',
            }}>
              &ldquo;Nature appears to have designated this place for the future seat
              of Government.&rdquo;
            </blockquote>

            <BodyP>
              Within 15 months, Houston was the capital of the Republic of Texas.
              Within 70 years, oil discovered nearby made it one of the wealthiest
              cities in the world. Within 130 years, a control room twenty miles south
              guided three astronauts to the moon. The Allen brothers founded a city
              the same way they would have founded a company: with conviction, a
              marketing document, and the willingness to be wrong in public until
              they were right.
            </BodyP>
            <BodyP>
              They were the first founders of Houston. Two centuries later, the city
              is ready for the next ones.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              2026
          ════════════════════════════════════════ */}
          <SectionBlock label="2026" lead="Houston is rising again, and the signs are everywhere.">
            <BodyP>
              The Ion sits in the old Sears building on Main Street, full of founders
              who chose Houston when they could have chosen anywhere. The Texas Medical
              Center has quietly become the largest applied AI campus on the planet.
              Almost no one outside the city knows it yet. The energy companies in the
              Energy Corridor are some of the most aggressive enterprise AI buyers in
              America, hiring engineers who five years ago would have only worked in
              San Francisco. The Ion District is filling with the kind of builders who
              used to leave for Austin and now choose to stay. Greentown Labs, Rice
              Nexus, the Cannon, Allen&apos;s Landing being reborn as a connected park
              system that finally treats the bayou the way the Allen brothers said it
              should be treated. There is a city being built underneath the city the
              rest of America thinks they know.
            </BodyP>
            <BodyP>
              This is the second rising. The phoenix moment Houston has been waiting for
              since the oil money started to age out, since the coastal narrative wrote
              us off, since the talent began choosing Austin and Miami instead. It is
              happening right now, in the buildings and the conversations and the talent
              that is choosing to stay. Almost no one outside Houston has noticed.
            </BodyP>
            <BodyP>
              I named this firm Allenix for both halves of the moment.{' '}
              <strong style={{ color: T.text1 }}>Allen</strong> for the two brothers
              who bet on a swamp and built a city.{' '}
              <strong style={{ color: T.text1 }}>Phoenix</strong> for what is rising
              from that city now, two centuries later, in the only ten-year window
              that matters.
            </BodyP>
            <BodyP>
              What Houston does not have, and what every great rising moment requires,
              is a firm built specifically to help its operators win the next era. Not
              a coastal consultancy that flies in. Not a Big Four transformation team.
              A firm built here, by people who have built and exited real businesses
              here. A firm that helps the founder-led operators of the American
              mid-market use AI to compound what they already have. The next great
              American business builders are not in Palo Alto. They are in Houston,
              Tulsa, Birmingham, Nashville, Midland. They have been underestimated by
              the coasts for forty years. They are about to be underestimated again.
              That is the asymmetric bet of the decade.
            </BodyP>
            <BodyP style={{ color: T.text1, fontWeight: 700 }}>
              We have ten years to build that firm.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              THE BET
          ════════════════════════════════════════ */}
          <SectionBlock label="The Bet" lead="Three units. One brand.">
            <BodyP>
              <strong style={{ color: T.text1 }}>Allenix Labs</strong> is the engine.
              We go deep inside mid-market companies, identify the highest-ROI
              opportunities, and deploy the tools, people, and platform that execute
              alongside them. Consulting, training, delivery, and forward-deployed
              teams. A mid-market CEO hires Labs because they want the AI-era growth
              team they have been reading about, without having to build it themselves.
            </BodyP>
            <BodyP>
              <strong style={{ color: T.text1 }}>Allenix Studios</strong> is the
              audience and the megaphone. Editorial, podcast, video, longform, and
              operator dinners that make Allenix the trade publication of the
              operator-led growth category, produced from Houston for the rest of the
              country to read. Studios builds the brand that brings every client to the
              door. It is how we make Houston louder to a country that has not been
              paying attention.
            </BodyP>
            <BodyP>
              <strong style={{ color: T.text1 }}>Allenix Capital</strong> is the
              compounding arm. We use cash flow and capital partners to acquire small
              operator services businesses, migrate them onto the Labs platform, plug
              them into the Studios audience, and unlock two to three times the
              enterprise value the previous owners ever could. Capital is how we turn
              one good firm into a portfolio of compounding ones.
            </BodyP>

            {/* Three-unit card */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: '6px',
              background: T.surface,
              padding: '32px',
              margin: '36px 0',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '13px', letterSpacing: '0.5px', color: T.text1, textAlign: 'center', marginBottom: '4px' }}>
                Allenix in 2036
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: T.text3, textAlign: 'center', marginBottom: '28px' }}>
                Three units. One brand. Built in Houston.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: T.border, borderRadius: '3px', overflow: 'hidden' }}>
                {[
                  {
                    name: 'Labs',
                    role: 'The engine',
                    lines: ['Agentic growth OS', 'Consulting + training', 'Forward-deployed teams', '$180k avg. annual contract'],
                  },
                  {
                    name: 'Studios',
                    role: 'The audience',
                    lines: ['Editorial + podcast + video', 'Operator dinners', 'Houston to the country', 'The brand that sells Labs'],
                  },
                  {
                    name: 'Capital',
                    role: 'The compounder',
                    lines: ['Acquires validated operators', 'Migrates to Labs platform', '22 acquisitions over a decade', 'Zero acquisition cost'],
                  },
                ].map(unit => (
                  <div key={unit.name} style={{ background: T.surface, padding: '20px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px', color: T.text1, marginBottom: '3px' }}>
                      {unit.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: T.accent, marginBottom: '14px' }}>
                      {unit.role}
                    </div>
                    {unit.lines.map(line => (
                      <div key={line} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: T.text3, lineHeight: 1.65 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: T.text3, marginBottom: '5px' }}>
                  The outcome
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: T.text2, lineHeight: 1.6 }}>
                  $200M to $300M revenue. 25 to 35 percent EBITDA. The standard for
                  mid-market growth in the AI era, on the path to a billion-dollar outcome.
                </div>
              </div>
            </div>

            <BodyP>
              The three units are not a holding company. They are a single machine with
              three arms, and each arm makes the next one stronger. Studios builds the
              audience. Labs sells into the audience and runs inside every client.
              Capital acquires the clients Labs has already validated. Labs deploys into
              the acquired companies on day one of the deal. Studios turns every win into
              the next chapter of the audience. The brand at the center compounds every
              quarter, in a city that grows louder every time the wheel turns.
            </BodyP>
            <BodyP>
              This is not a services firm. This is not a media company. This is not a
              fund. It is all three, structured so that each one makes the next one
              inevitable. Built in Houston because Houston is where the next era will be
              most underestimated by everyone who does not live here.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              2036
          ════════════════════════════════════════ */}
          <SectionBlock label="2036" lead="On August 30, 2036, Houston turns 200 years old.">
            <BodyP>
              By that day, Allenix will be the firm mid-market operators across the
              American South know by name. A building in the Ion District with the
              Allenix name in cut steel above the door. A platform running inside
              hundreds of companies that would have otherwise been overlooked by the
              AI era. A trade publication produced from Houston that the rest of the
              country reads to understand where American business is actually being
              built. Engineers and AI talent who chose Houston because Allenix made it
              possible to build a serious career here without moving. A capital arm
              that has turned the founder-led economy of the region into a compounding
              portfolio. A brand that, two centuries after the Allen brothers&apos; ad
              ran in the Telegraph and Texas Register, makes the case that they were
              right about what this place could become.
            </BodyP>
            <BodyP>
              Houston will turn 200 either way. The question is what we put in front
              of the city when it does.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              THE INVITATION
          ════════════════════════════════════════ */}
          <SectionBlock label="The Invitation">
            <BodyP style={{ color: T.text1, fontWeight: 700 }}>
              It&apos;s a Saturday.
            </BodyP>
            <BodyP>
              August 30, 2036. Houston turns 200.
            </BodyP>
            <BodyP>
              We will be standing in front of a building in the Ion District with the
              Allenix name in cut steel above the door. The team is inside. The work
              is done. The city is bigger and louder than anyone outside Houston
              thought it would be. We are part of the reason why.
            </BodyP>
            <BodyP>
              Allenix is the bet. The next ten years are the work.
            </BodyP>

            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '32px', color: T.text1,
              letterSpacing: '-0.5px', marginTop: '40px', marginBottom: '56px',
            }}>
              Let&apos;s go.
            </div>
          </SectionBlock>

          {/* ── Signature ── */}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '40px', marginTop: '8px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: '21px', color: T.text2, marginBottom: '36px' }}>
              Ali Mamujee
            </div>
            <Link href="/" className="nav-manifesto-link" style={{ fontFamily: 'var(--font-body)' }}>
              Back to Allenix
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

function SectionBlock({
  label,
  lead,
  children,
}: {
  label: string
  lead?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginTop: '64px' }}>
      {/* Section divider */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, #f0f2f4 20%, #f0f2f4 80%, transparent 100%)',
        marginBottom: '40px',
      }} />

      {/* Large glowing display title */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: '42px',
        lineHeight: 1.05,
        letterSpacing: '-1px',
        color: '#ffffff',
        textShadow: '0 0 20px rgba(255,255,255,0.25), 0 0 50px rgba(255,255,255,0.1)',
        marginBottom: lead ? '20px' : '28px',
      }}>
        {label}
      </div>

      {/* Bold white lead sentence */}
      {lead && (
        <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: '17px', color: '#f0f2f4',
          lineHeight: 1.55, marginBottom: '24px',
        }}>
          {lead}
        </div>
      )}

      {children}
    </div>
  )
}

function BodyP({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: '17px',
      color: '#c0cdd8',   // elevated from #8a9bb0 — much higher contrast
      lineHeight: 1.85, marginBottom: '22px',
      ...style,
    }}>
      {children}
    </p>
  )
}
