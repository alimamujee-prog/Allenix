import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Magnolia OS — Run Your Business on Agents.'
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
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,180,0.18) 0%, transparent 65%)',
          display: 'flex',
        }} />

        <div style={{
          position: 'absolute', bottom: -180, right: -60,
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,180,0.09) 0%, transparent 65%)',
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
              MAGNOLIA OS
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 960 }}>
            <div style={{ width: 48, height: 3, background: '#00c8b4', display: 'flex' }} />
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 82, fontWeight: 900,
              color: '#f0f2f4',
              lineHeight: 1.02,
              letterSpacing: -2.5,
              display: 'flex',
            }}>
              Run Your Business on Agents.
            </div>
            <div style={{ fontSize: 18, color: '#5a6b7e', fontFamily: 'Georgia, serif', letterSpacing: 0.5, display: 'flex' }}>
              The agentic operating system built for the modern CEO.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#5a6b7e', letterSpacing: 2.5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c8b4', display: 'flex' }} />
              ACQUIRE · ACTIVATE · ASCEND
            </div>
            <div style={{ fontSize: 12, color: '#2a3540', letterSpacing: 2, display: 'flex' }}>
              allenix.com/magnolia-os
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
