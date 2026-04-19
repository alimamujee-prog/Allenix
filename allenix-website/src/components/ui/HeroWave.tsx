'use client'

import { useEffect, useRef } from 'react'

// Brand palette (normalized 0–1)
// Dark bg:  #06080a → (0.024, 0.031, 0.039)
// Teal:     #00c8b4 → (0.000, 0.784, 0.706)

const TAU = Math.PI * 2
const SCALE = 3 // render at 1/3 resolution, CSS stretches — smooth & fast

export default function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let width = 0
    let height = 0
    let imageData: ImageData
    let data: Uint8ClampedArray

    // Pre-compute trig lookup tables
    const SIN_TABLE = new Float32Array(1024)
    const COS_TABLE = new Float32Array(1024)
    for (let i = 0; i < 1024; i++) {
      const angle = (i / 1024) * TAU
      SIN_TABLE[i] = Math.sin(angle)
      COS_TABLE[i] = Math.cos(angle)
    }

    const fsin = (x: number) => {
      const idx = (((x % TAU) + TAU) % TAU / TAU * 1024) | 0
      return SIN_TABLE[idx & 1023]
    }
    const fcos = (x: number) => {
      const idx = (((x % TAU) + TAU) % TAU / TAU * 1024) | 0
      return COS_TABLE[idx & 1023]
    }

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / SCALE)
      canvas.height = Math.floor(window.innerHeight / SCALE)
      width = canvas.width
      height = canvas.height
      imageData = ctx.createImageData(width, height)
      data = imageData.data
    }

    window.addEventListener('resize', resize)
    resize()

    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) * 0.001

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height
          const uy = (2 * y - height) / height

          // Plasma wave field (4 iterations — same as original, slowed down)
          let a = 0
          let d = 0
          for (let i = 0; i < 4; i++) {
            a += fcos(i - d + time * 0.22 - a * ux)
            d += fsin(i * uy + a)
          }

          const wave = (fsin(a) + fcos(d)) * 0.5 // −1 → 1

          // Only positive wave crests emit teal light — negative areas stay pure dark
          const crest = Math.max(0, wave)
          const teal = crest * crest * 0.20 // quadratic fade, max 20% teal

          // Base: dark background #06080a
          // Add teal (#00c8b4) proportionally to crest strength
          const r = 0.024
          const g = 0.031 + 0.784 * teal
          const b = 0.039 + 0.706 * teal

          const idx = (y * width + x) * 4
          data[idx]     = r * 255
          data[idx + 1] = g * 255 | 0
          data[idx + 2] = b * 255 | 0
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      rafId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'auto',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
