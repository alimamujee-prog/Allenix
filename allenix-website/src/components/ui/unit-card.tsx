'use client'

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
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={cn(
        'relative flex flex-col justify-between',
        'h-44 sm:h-56 w-full rounded-xl border p-6 sm:p-7',
        'cursor-pointer overflow-hidden',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light',
        'hover:-translate-y-0.5',
        active
          ? 'bg-accent-wash border-accent'
          : 'bg-bg-card border-border-col hover:border-accent-hover',
        className
      )}
    >
      {/* Forming badge */}
      {forming && (
        <div className="absolute top-5 right-5">
          <span
            className="font-mono text-[10px] uppercase tracking-[1.5px] px-2.5 py-1 rounded"
            style={{
              color: 'var(--col-text-3)',
              background: 'var(--col-surface-2)',
              border: '1px solid var(--col-border-2)',
            }}
          >
            Forming
          </span>
        </div>
      )}

      {/* Title + tagline */}
      <div>
        <h3
          className="font-display font-semibold italic leading-tight transition-colors duration-150"
          style={{
            fontSize: 'clamp(22px, 3vw, 30px)',
            color: active ? 'var(--col-accent-dim)' : 'var(--col-text-1)',
          }}
        >
          {title}
        </h3>
        <p
          className="mt-2 font-body leading-[1.65]"
          style={{
            fontSize: 'clamp(12px, 1.4vw, 14px)',
            color: active ? 'var(--col-accent-dim)' : 'var(--col-text-3)',
            maxWidth: '78%',
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Decorative icon — bottom right */}
      <div className="absolute bottom-5 right-5" aria-hidden="true">
        <Icon
          size={52}
          strokeWidth={0.6}
          style={{
            color: active ? 'var(--col-accent-light)' : 'var(--col-border-2)',
            transition: 'color 150ms ease-out',
          }}
        />
      </div>

      {/* Active accent line — bottom edge */}
      {active && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'var(--col-accent)' }}
        />
      )}
    </div>
  )
}
