import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Allenix — Three units. One platform. Built for the operators the coasts underestimated.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Load Playfair Display 900 from Google Fonts for the headline */
async function loadPlayfair(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } }
    ).then(r => r.text())
    const url = css.match(/src: url\(([^)]+)\) format/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const playfairData = await loadPlayfair()

  /* ── Orbital geometry ───────────────────────────────────────────────────────
     SVG canvas: 520 × 560. Three nodes at 120° apart starting from the top.
     Studios = top, Labs = bottom-right, Capital = bottom-left
  ─────────────────────────────────────────────────────────────────────────── */
  const cx = 260, cy = 275, r = 162

  // Angles: Studios -90°, Labs 30°, Capital 150°  (radians)
  const studios  = { x: cx,                            y: cy - r }
  const labs     = { x: cx + r * Math.cos(Math.PI / 6), y: cy + r * Math.sin(Math.PI / 6) }
  const capital  = { x: cx - r * Math.cos(Math.PI / 6), y: cy + r * Math.sin(Math.PI / 6) }
  const NODE_R = 38

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: '#06080a',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient cyan glow behind orbital diagram */}
        <div style={{
          position: 'absolute',
          right: -40, top: '50%',
          width: 560, height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,180,0.07) 0%, transparent 65%)',
          transform: 'translateY(-50%)',
          display: 'flex',
        }} />

        {/* ── Left panel ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 56px 0 72px',
          width: 620, flex: 'none',
          position: 'relative', zIndex: 1,
        }}>

          {/* Wordmark row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 44 }}>
            <div style={{
              width: 7, height: 7, borderRadius: 4,
              background: '#00c8b4',
              boxShadow: '0 0 8px rgba(0,200,180,0.9)',
            }} />
            <span style={{
              fontFamily: 'Georgia, serif', fontSize: 12, fontWeight: 700,
              letterSpacing: 3.5, color: '#00c8b4', display: 'flex',
            }}>
              ALLENIX
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontFamily: playfairData ? 'Playfair Display' : 'Georgia, serif',
            fontSize: 64, fontWeight: 900,
            color: '#f0f2f4',
            lineHeight: 1.1, letterSpacing: -2,
            marginBottom: 28,
            display: 'flex', flexDirection: 'column',
          }}>
            <span>Three units.</span>
            <span>One platform.</span>
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 20, color: '#8a9bb0',
            lineHeight: 1.6, maxWidth: 430,
            marginBottom: 52,
            display: 'flex',
          }}>
            Built for the operators the coasts underestimated.
          </div>

          {/* Unit chips */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['Labs', 'Studios', 'Capital'].map(u => (
              <div key={u} style={{
                padding: '7px 18px',
                border: '1px solid #2a3540',
                borderRadius: 4,
                fontFamily: 'Georgia, serif',
                fontSize: 10, fontWeight: 700,
                letterSpacing: 2, color: '#5a6b7e',
                display: 'flex',
              }}>
                {u.toUpperCase()}
              </div>
            ))}
          </div>

          {/* Houston label */}
          <div style={{
            position: 'absolute', bottom: 40, left: 72,
            fontFamily: 'Georgia, serif', fontSize: 10,
            fontWeight: 700, letterSpacing: 2,
            color: '#2a3540', display: 'flex',
          }}>
            HOUSTON, TEXAS · {new Date().getFullYear()}
          </div>
        </div>

        {/* ── Right panel — orbital SVG ── */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <svg width="520" height="560" viewBox="0 0 520 560" style={{ overflow: 'visible' }}>

            {/* Orbit ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Triangle connector lines */}
            <line x1={studios.x}  y1={studios.y}  x2={labs.x}     y2={labs.y}     stroke="rgba(0,200,180,0.22)" strokeWidth="1" />
            <line x1={labs.x}     y1={labs.y}     x2={capital.x}  y2={capital.y}  stroke="rgba(0,200,180,0.22)" strokeWidth="1" />
            <line x1={capital.x}  y1={capital.y}  x2={studios.x}  y2={studios.y}  stroke="rgba(0,200,180,0.22)" strokeWidth="1" />

            {/* ── Center node ── */}
            <circle cx={cx} cy={cy} r={30} fill="#041e1c" stroke="#00c8b4" strokeWidth="1.5" />
            {/* Ping ring */}
            <circle cx={cx} cy={cy} r={42} fill="none" stroke="rgba(0,200,180,0.12)" strokeWidth="1" />
            <text x={cx} y={cy + 4} textAnchor="middle" fill="#00c8b4" fontSize={9} fontWeight="700" letterSpacing={2} fontFamily="Georgia, serif">
              ALLENIX
            </text>

            {/* ── Studios — top, Mic icon ── */}
            <circle cx={studios.x} cy={studios.y} r={NODE_R + 14} fill="rgba(0,200,180,0.04)" />
            <circle cx={studios.x} cy={studios.y} r={NODE_R} fill="#0d1117" stroke="rgba(0,200,180,0.45)" strokeWidth="1.5" />
            {/* Mic paths, 24×24 centered at studios node */}
            <g transform={`translate(${studios.x - 12} ${studios.y - 12})`} fill="none" stroke="#c0cdd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </g>
            <text x={studios.x} y={studios.y - NODE_R - 18} textAnchor="middle" fill="#6a7a8a" fontSize={10} fontWeight="700" letterSpacing={2} fontFamily="Georgia, serif">
              STUDIOS
            </text>

            {/* ── Labs — bottom-right, Zap icon ── */}
            <circle cx={labs.x} cy={labs.y} r={NODE_R + 14} fill="rgba(0,200,180,0.04)" />
            <circle cx={labs.x} cy={labs.y} r={NODE_R} fill="#0d1117" stroke="rgba(0,200,180,0.45)" strokeWidth="1.5" />
            {/* Zap polygon, 24×24 centered at labs node */}
            <g transform={`translate(${labs.x - 12} ${labs.y - 12})`} fill="none" stroke="#c0cdd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </g>
            <text x={labs.x} y={labs.y + NODE_R + 22} textAnchor="middle" fill="#6a7a8a" fontSize={10} fontWeight="700" letterSpacing={2} fontFamily="Georgia, serif">
              LABS
            </text>

            {/* ── Capital — bottom-left, TrendingUp icon ── */}
            <circle cx={capital.x} cy={capital.y} r={NODE_R + 14} fill="rgba(0,200,180,0.04)" />
            <circle cx={capital.x} cy={capital.y} r={NODE_R} fill="#0d1117" stroke="rgba(0,200,180,0.45)" strokeWidth="1.5" />
            {/* TrendingUp paths, 24×24 centered at capital node */}
            <g transform={`translate(${capital.x - 12} ${capital.y - 12})`} fill="none" stroke="#c0cdd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </g>
            <text x={capital.x} y={capital.y + NODE_R + 22} textAnchor="middle" fill="#6a7a8a" fontSize={10} fontWeight="700" letterSpacing={2} fontFamily="Georgia, serif">
              CAPITAL
            </text>

          </svg>
        </div>

        {/* Bottom cyan bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, transparent 0%, #00c8b4 25%, #00c8b4 75%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Left edge accent line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3,
          background: 'linear-gradient(180deg, transparent 0%, #00c8b4 25%, #00c8b4 75%, transparent 100%)',
          display: 'flex',
        }} />

      </div>
    ),
    {
      ...size,
      fonts: playfairData
        ? [{ name: 'Playfair Display', data: playfairData, weight: 900 as const, style: 'normal' as const }]
        : [],
    }
  )
}
