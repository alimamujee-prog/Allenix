'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface UnitCardProps {
  title: string
  tagline: string
  forming?: boolean
  icon: LucideIcon
  active?: boolean
  onClick?: () => void
  className?: string
}

export function UnitCard({
  title,
  tagline,
  forming = false,
  icon: Icon,
  active = false,
  onClick,
  className,
}: UnitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const mouseX = useSpring(0, { stiffness: 400, damping: 40 })
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setHovering(false)
  }

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full"
    >
      <motion.div
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: active
            ? '0 0 0 1px rgba(0,200,180,0.4), 0 20px 60px rgba(0,200,180,0.15)'
            : hovering
            ? '0 8px 32px rgba(255,255,255,0.12), 0 2px 8px rgba(255,255,255,0.08)'
            : '0 4px 20px rgba(255,255,255,0.08), 0 1px 4px rgba(255,255,255,0.05)',
        }}
        animate={{
          scale: hovering ? 1.02 : 1,
          y: hovering ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'relative flex flex-col justify-between',
          'h-44 sm:h-56 w-full rounded-xl border p-6 sm:p-7',
          'cursor-pointer overflow-hidden',
          'transition-colors duration-150 ease-out',
          'focus:outline-none',
          active
            ? 'bg-accent-wash border-accent'
            : 'bg-bg-card border-border-col hover:border-accent-light',
          className
        )}
        role="button"
        tabIndex={0}
        aria-pressed={active}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick?.()
          }
        }}
      >
        {/* Forming badge */}
        {forming && (
          <div className="absolute top-5 right-5">
            <span
              className="font-body text-[10px] uppercase tracking-[1.5px] px-2.5 py-1 rounded"
              style={{
                color: 'var(--col-text-3)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Forming
            </span>
          </div>
        )}

        {/* Title + tagline */}
        <div style={{ transform: 'translateZ(16px)' }}>
          <h3
            className="font-display font-semibold italic leading-tight transition-colors duration-150"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              color: active ? 'var(--col-accent)' : 'var(--col-text-1)',
            }}
          >
            {title}
          </h3>
          <p
            className="mt-2 font-body leading-[1.65]"
            style={{
              fontSize: 'clamp(12px, 1.4vw, 14px)',
              color: active ? 'rgba(0,200,180,0.65)' : 'var(--col-text-3)',
              maxWidth: '78%',
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Decorative icon — bottom right */}
        <div
          className="absolute bottom-5 right-5"
          style={{ transform: 'translateZ(8px)' }}
          aria-hidden="true"
        >
          <Icon
            size={52}
            strokeWidth={0.6}
            style={{
              color: active ? 'rgba(0,200,180,0.5)' : 'rgba(240,242,244,0.25)',
              transition: 'color 150ms ease-out',
            }}
          />
        </div>

        {/* Active accent line — bottom edge */}
        {active && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--col-accent) 50%, transparent 100%)',
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
