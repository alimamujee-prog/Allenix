import Footer from '@/components/Footer'
import { ShinyButton } from '@/components/ui/ShinyButton'

const LINKEDIN_URL = 'https://www.linkedin.com/in/alimamujee/'
const CALENDLY_URL = 'https://calendly.com/d/cx2q-z3v-zxv/meet-allenix'

export const metadata = {
  title: 'About Ali Mamujee — Allenix',
  description:
    'Ali Mamujee is the founder of Allenix. Eleven years in B2B fintech, 9-figure acquisition, now building the AI operating system for Gulf South operators.',
}

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)', minHeight: '100vh' }}>

      <a href="#about-content" className="sr-only focus:not-sr-only">Skip to content</a>

      {/* ── Hero ── */}
      <section
        id="about-content"
        className="mob-pt-80"
        style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Label */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--col-accent)',
              marginBottom: '24px',
            }}
          >
            About the Founder
          </div>

          {/* Two-column layout */}
          <div
            className="mob-grid-1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            {/* Left: Identity */}
            <div>
              <h1
                className="font-display"
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(40px, 5.5vw, 72px)',
                  lineHeight: 1.0,
                  letterSpacing: '-2px',
                  color: 'var(--col-text-1)',
                  marginBottom: '24px',
                }}
              >
                Ali<br />
                <span style={{ color: 'var(--col-accent)', fontStyle: 'italic' }}>Mamujee.</span>
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '32px',
                }}
              >
                Founder, Allenix · Houston, TX
              </div>

              {/* Quote block */}
              <blockquote
                style={{
                  borderLeft: '2px solid var(--col-accent)',
                  paddingLeft: '24px',
                  margin: '0 0 40px',
                }}
              >
                <p
                  className="font-body"
                  style={{
                    fontSize: '18px',
                    lineHeight: 1.65,
                    color: '#ffffff',
                    fontStyle: 'italic',
                  }}
                >
                  "Everyone got faster individually. Nobody got smarter together. AI became a collection of individual habits, not a company operating system. That is the gap I close."
                </p>
              </blockquote>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <ShinyButton href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  Send a LinkedIn Message
                </ShinyButton>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-secondary-link"
                >
                  Or book a 30-minute call →
                </a>
              </div>
            </div>

            {/* Right: Bio */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <p
                className="font-body"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#ffffff' }}
              >
                My career started on Wall Street in investment banking and private equity. That foundation, growth valuation fundamentals, deal structure, what actually moves enterprise value, became the lens I carried into every room after.
              </p>
              <p
                className="font-body"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#ffffff' }}
              >
                That lens is what took me to Mercatus, a leading private equity fintech company, where I joined as employee #5 and stayed for 11 years through a 9-figure acquisition by State Street. I owned product, strategy, and marketing across multiple continents.
              </p>
              <p
                className="font-body"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#ffffff' }}
              >
                The acquisition put me inside State Street, a Fortune 200 company, leading their global private markets AI initiative. That is where the AI lens sharpened into a conviction. The companies that get this right in the next 5 years will compound everything else. The ones that don&apos;t will be acquired by the ones that do.
              </p>
              <p
                className="font-body"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#ffffff' }}
              >
                That conviction is what I now take directly inside growth-stage B2B companies, finding the highest-ROI levers and building the systems that execute alongside the team.
              </p>
              <p
                className="font-body"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#ffffff' }}
              >
                Allenix is what that work became. I am currently looking for the best AI operators and builders in Houston to join what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── Join the Mission ── */}
      <section
        style={{
          padding: '80px 5% 100px',
          borderTop: '1px solid var(--col-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            className="mob-grid-1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--col-accent)',
                  marginBottom: '20px',
                }}
              >
                Join the Mission
              </div>
              <h2
                className="font-display"
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(26px, 3vw, 40px)',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  color: 'var(--col-text-1)',
                  marginBottom: '20px',
                }}
              >
                We are building something special. Come join a world class team.
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Operators', desc: 'Running a $5M–$50M business and want to see what AI can do inside your company.' },
                { label: 'Builders', desc: 'Engineers and product people who want to work on agentic systems with real clients.' },
                { label: 'Strategists', desc: 'Consultants and growth operators who want to bring Allenix capabilities to their markets.' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    background: 'var(--col-surface)',
                    border: '1px solid var(--col-border)',
                    borderRadius: '8px',
                    padding: '20px 24px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: 'var(--col-accent)',
                      marginBottom: '8px',
                    }}
                  >
                    {item.label}
                  </div>
                  <p
                    className="font-body"
                    style={{ fontSize: '17px', lineHeight: 1.6, color: '#ffffff' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}

              <div style={{ alignSelf: 'flex-start' }}>
                <ShinyButton href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
