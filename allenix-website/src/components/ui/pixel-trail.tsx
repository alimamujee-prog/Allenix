'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Pixel {
  id: number
  x: number
  y: number
  opacity: number
  age: number
}

const PIXEL_SIZE  = 10
const TRAIL_LENGTH = 36
const FADE_SPEED   = 0.038

/**
 * Renders a cyan pixel trail that follows the cursor.
 * - Listens on window so pointer-events-none is safe on the overlay.
 * - Hides the OS cursor for the duration of the mount.
 * - Drop this anywhere in a page; it renders in a fixed z-9999 overlay.
 */
export function CyanPixelTrail() {
  const [pixels, setPixels]   = useState<Pixel[]>([])
  const pixelIdRef            = useRef(0)
  const lastPosRef            = useRef({ x: -999, y: -999 })
  const animationRef          = useRef<number | undefined>(undefined)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e
    const dx   = x - lastPosRef.current.x
    const dy   = y - lastPosRef.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > PIXEL_SIZE * 0.75) {
      setPixels(prev => [
        ...prev.slice(-TRAIL_LENGTH),
        { id: pixelIdRef.current++, x, y, opacity: 1, age: 0 },
      ])
      lastPosRef.current = { x, y }
    }
  }, [])

  /* Register global mouse listener + hide OS cursor */
  useEffect(() => {
    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.body.style.cursor = prevCursor
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  /* rAF fade loop */
  useEffect(() => {
    const animate = () => {
      setPixels(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - FADE_SPEED, age: p.age + 1 }))
          .filter(p => p.opacity > 0),
      )
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {pixels.map(pixel => {
        const scale = Math.max(0.25, 1 - pixel.age / 80)
        const size  = PIXEL_SIZE * scale
        return (
          <div
            key={pixel.id}
            style={{
              position: 'absolute',
              left: pixel.x - size / 2,
              top:  pixel.y - size / 2,
              width:  size,
              height: size,
              background: '#00c8b4',
              opacity: pixel.opacity,
              boxShadow: `0 0 ${size * 2}px rgba(0,200,180,0.5)`,
            }}
          />
        )
      })}
    </div>
  )
}
