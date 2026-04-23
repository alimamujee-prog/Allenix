import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'The Allenix Manifesto — A New Vision for Houston'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        background: '#06080a',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'monospace',
      }}>

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <div style={{
          position: 'absolute', top: -160, left: -80,
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,180,0.14) 0%, transparent 65%)',
          display: 'flex',
        }} />

        <div style={{
          position: 'absolute', bottom: -180, right: -60,
          width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,180,0.07) 0%, transparent 65%)',
          display: 'flex',
        }} />

        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3, background: 'linear-gradient(90deg, #00c8b4, rgba(0,200,180,0.3))',
          display: 'flex',
        }} />

        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px 60px',
          flex: 1, position: 'relative',
        }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00c8b4', display: 'flex' }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f2f4', letterSpacing: 5 }}>ALLENIX</span>
            </div>
            <div style={{
              fontSize: 11, color: '#00c8b4', letterSpacing: 3,
              border: '1px solid rgba(0,200,180,0.3)',
              padding: '7px 18px', display: 'flex',
              background: 'rgba(0,200,180,0.06)',
            }}>
              A NEW VISION FOR HOUSTON
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
            <div style={{ width: 48, height: 3, background: '#00c8b4', display: 'flex' }} />
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 84, fontWeight: 900,
              color: '#f0f2f4',
              lineHeight: 1.02,
              letterSpacing: -2.5,
              display: 'flex', flexDirection: 'column',
            }}>
              <span>The Allenix</span>
              <span style={{ fontStyle: 'italic', color: '#00c8b4' }}>Manifesto.</span>
            </div>
            <div style={{ fontSize: 18, color: '#5a6b7e', fontFamily: 'Georgia, serif', letterSpacing: 0.3, display: 'flex', maxWidth: 640 }}>
              The ten-year bet on Houston, the AI era, and the operators who will build it.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#5a6b7e', letterSpacing: 2.5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c8b4', display: 'flex' }} />
              BY ALI MAMUJEE · HOUSTON, TX
            </div>
            <div style={{ fontSize: 12, color: '#2a3540', letterSpacing: 2, display: 'flex' }}>
              allenix.com/manifesto
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
