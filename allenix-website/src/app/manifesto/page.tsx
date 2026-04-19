import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export const metadata = {
  title: 'The Allenix Manifesto',
  description:
    'Allenix is a Houston-built firm installing agentic operating systems inside $5M–$50M B2B businesses. This document explains why it was built here, what we are building toward, and the ten-year bet behind it.',
}

export default function ManifestoPage() {
  return (
    <div style={{ minHeight: '100vh', color: 'var(--col-text-2)', background: 'var(--col-bg)' }}>

      <a href="#manifesto-content" className="sr-only focus:not-sr-only">Skip to content</a>

      {/* ── Editorial column ── */}
      <main id="manifesto-content" style={{ paddingTop: '110px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 32px' }}>

          {/* ── Title block ── */}
          <div style={{ marginBottom: '32px' }}>
            <h1 className="font-display" style={{
              fontWeight: 900,
              fontSize: 'clamp(48px, 9vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-3px',
              color: 'var(--col-text-1)',
              marginBottom: '20px',
            }}>
              The Allenix Manifesto
            </h1>

            <div className="font-display" style={{
              fontWeight: 600, fontStyle: 'italic',
              fontSize: '22px', color: 'var(--col-text-3)', letterSpacing: '-0.3px', marginBottom: '20px',
            }}>
              A manifesto for Houston
            </div>

            {/* Byline + share button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--col-text-3)' }}>
                By Ali Mamujee
              </div>
              <ShareButton ariaLabel="Copy link to the Allenix Manifesto" />
            </div>

            {/* Reader summary */}
            <p className="font-body" style={{
              fontSize: '15px',
              color: 'var(--col-text-3)',
              lineHeight: 1.8,
              fontStyle: 'italic',
              margin: '0',
              paddingTop: '20px',
              borderTop: '1px solid var(--col-border)',
            }}>
              Allenix is a Houston-built firm installing agentic operating systems inside
              $5M–$50M B2B businesses. This document explains why it was built
              here, what we are building toward, and the ten-year bet behind it. Written for the
              people who might want to build it with us.
            </p>
          </div>

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

            <blockquote className="font-display" style={{
              borderTop: '2px solid var(--col-border)',
              paddingTop: '24px',
              margin: '32px 0',
              fontStyle: 'italic', fontWeight: 600,
              fontSize: '20px', lineHeight: 1.6, color: 'var(--col-text-1)', letterSpacing: '-0.2px',
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
              <strong style={{ color: 'var(--col-text-1)' }}>Allen</strong> for the two brothers
              who bet on a swamp and built a city.{' '}
              <strong style={{ color: 'var(--col-text-1)' }}>Phoenix</strong> for what is rising
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
            <BodyP style={{ color: 'var(--col-text-1)', fontWeight: 700 }}>
              We have ten years to build that firm.
            </BodyP>
          </SectionBlock>

          {/* ════════════════════════════════════════
              THE BET
          ════════════════════════════════════════ */}
          <SectionBlock label="The Bet" lead="Three units. One brand.">
            <BodyP>
              <strong style={{ color: 'var(--col-text-1)' }}>Allenix Labs</strong> is the engine.
              We go deep inside mid-market companies, identify the highest-ROI
              opportunities, and deploy the tools, people, and platform that execute
              alongside them. Consulting, training, delivery, and forward-deployed
              teams. A mid-market CEO hires Labs because they want the AI-era growth
              team they have been reading about, without having to build it themselves.
            </BodyP>
            <BodyP>
              <strong style={{ color: 'var(--col-text-1)' }}>Allenix Studios</strong> is the
              audience and the megaphone. Editorial, podcast, video, longform, and
              operator dinners that make Allenix the trade publication of the
              operator-led growth category, produced from Houston for the rest of the
              country to read. Studios builds the brand that brings every client to the
              door. It is how we make Houston louder to a country that has not been
              paying attention.
            </BodyP>
            <BodyP>
              <strong style={{ color: 'var(--col-text-1)' }}>Allenix Capital</strong> is the
              compounding arm. We use cash flow and capital partners to acquire small
              operator services businesses, migrate them onto the Labs platform, plug
              them into the Studios audience, and unlock two to three times the
              enterprise value the previous owners ever could. Capital is how we turn
              one good firm into a portfolio of compounding ones.
            </BodyP>

            {/* Three-unit card — inline styles to avoid broken Tailwind class names */}
            <div style={{
              backgroundColor: 'var(--col-surface)',
              border: '1px solid var(--col-border)',
              borderRadius: '6px',
              padding: '32px',
              margin: '36px 0',
            }}>
              <div className="font-display" style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.5px', color: 'var(--col-text-1)', textAlign: 'center', marginBottom: '4px' }}>
                Allenix in 2036
              </div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', textAlign: 'center', marginBottom: '28px' }}>
                Three units. One brand. Built in Houston.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'var(--col-border)', borderRadius: '3px', overflow: 'hidden' }}>
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
                  <div key={unit.name} style={{ backgroundColor: 'var(--col-bg)', padding: '20px 16px' }}>
                    <div className="font-display" style={{ fontWeight: 900, fontSize: '14px', color: 'var(--col-text-1)', marginBottom: '3px' }}>
                      {unit.name}
                    </div>
                    <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '14px' }}>
                      {unit.role}
                    </div>
                    {unit.lines.map(line => (
                      <div key={line} className="font-body" style={{ fontSize: '13px', color: 'var(--col-text-3)', lineHeight: 1.7 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--col-border)', textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '6px' }}>
                  The outcome
                </div>
                <div className="font-body" style={{ fontSize: '13px', color: 'var(--col-text-2)', lineHeight: 1.65 }}>
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
            <BodyP style={{ color: 'var(--col-text-1)', fontWeight: 700 }}>
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

            <div className="font-display" style={{
              fontWeight: 900,
              fontSize: '44px', color: 'var(--col-text-1)',
              letterSpacing: '-1px', marginTop: '48px', marginBottom: '64px',
            }}>
              Let&apos;s go.
            </div>
          </SectionBlock>

          {/* ── Signature ── */}
          <div style={{ borderTop: '1px solid var(--col-border)', paddingTop: '40px', marginTop: '8px' }}>
            <div className="font-display" style={{ fontStyle: 'italic', fontWeight: 600, fontSize: '21px', color: 'var(--col-text-2)', marginBottom: '36px' }}>
              Ali Mamujee
            </div>
            <Link href="/" className="nav-manifesto-link font-body">
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
    <div style={{ marginTop: '88px' }}>
      {/* 40px teal accent divider — consistent with brand section-divider style */}
      <div style={{
        width: '40px',
        height: '2px',
        background: 'var(--col-accent)',
        marginBottom: '32px',
      }} />

      <h2 className="font-display" style={{
        fontWeight: 900,
        fontSize: '40px',
        lineHeight: 1.05,
        letterSpacing: '-1px',
        color: 'var(--col-text-1)',
        marginBottom: lead ? '20px' : '28px',
      }}>
        {label}
      </h2>

      {lead && (
        <div className="font-body" style={{
          fontWeight: 700,
          fontSize: '17px', color: 'var(--col-text-1)',
          lineHeight: 1.65, marginBottom: '28px',
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
    <p className="font-body" style={{
      fontSize: '17px',
      color: 'var(--col-text-2)',
      lineHeight: 1.85, marginBottom: '24px',
      ...style,
    }}>
      {children}
    </p>
  )
}
