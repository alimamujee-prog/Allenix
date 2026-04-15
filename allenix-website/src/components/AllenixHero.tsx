'use client'

import { useState, useRef } from 'react'
import { Zap, Mic, TrendingUp } from 'lucide-react'
import { UnitCard } from '@/components/ui/unit-card'
import { flywheelData } from '@/data/flywheel'
import type { FlywheelUnit } from '@/data/flywheel'

// ─── Card data ────────────────────────────────────────────────────────────────

const UNIT_CARDS: {
  unit: FlywheelUnit
  title: string
  tagline: string
  forming: boolean
  icon: typeof Zap
}[] = [
  {
    unit: 'labs',
    title: 'Labs',
    tagline:
      'Agentic growth services. We go deep, find the highest-ROI levers, and execute alongside you.',
    forming: false,
    icon: Zap,
  },
  {
    unit: 'studios',
    title: 'Studios',
    tagline:
      'Brand and audience engine. The trade publication of operator-led growth in the Gulf South.',
    forming: false,
    icon: Mic,
  },
  {
    unit: 'capital',
    title: 'Capital',
    tagline:
      'Acquisition compounding arm. Labs validates companies. Capital acquires them.',
    forming: true,
    icon: TrendingUp,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded border font-body text-[20px] uppercase tracking-[0.5px] transition-all duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-light',
        active
          ? 'bg-accent-wash border-accent text-text-primary'
          : 'bg-bg-card border-border-col text-text-secondary hover:border-accent-light hover:bg-accent-wash',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function Callout({ text }: { text: string }) {
  return (
    <div className="mt-3 p-4 bg-accent-wash border border-accent-light rounded text-[14px] font-body text-text-secondary leading-[1.7]">
      {text}
    </div>
  )
}

function UnitBox({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 px-5 py-5 rounded border text-left transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-accent-light cursor-pointer"
      style={{
        backgroundColor: active ? 'var(--col-accent-bg)' : 'rgba(255,255,255,0.05)',
        borderColor: active ? 'var(--col-accent)' : 'var(--col-border-2)',
        boxShadow: active
          ? '0 0 0 1px rgba(0,200,180,0.3), 0 4px 20px rgba(0,200,180,0.12)'
          : '0 4px 20px rgba(255,255,255,0.1), 0 1px 4px rgba(255,255,255,0.07)',
      }}
    >
      <span
        className="font-display font-semibold italic text-[18px] block transition-colors duration-150"
        style={{ color: active ? 'var(--col-accent)' : 'var(--col-text-1)' }}
      >
        {label}
      </span>
    </button>
  )
}

function MagnoliaGlowBar() {
  return (
    <div
      className="mt-6 w-full flex flex-wrap items-center gap-3 px-5 py-3 rounded"
      style={{
        background:
          'linear-gradient(90deg, rgba(0,200,180,0.08) 0%, rgba(0,200,180,0.03) 100%)',
        border: '1px solid rgba(0,200,180,0.3)',
        boxShadow:
          '0 0 24px rgba(0,200,180,0.15), inset 0 0 12px rgba(0,200,180,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--col-accent)',
          whiteSpace: 'nowrap',
        }}
      >
        Powered by Magnolia
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--col-text-2)',
        }}
      >
        Enterprise-grade agentic platform that powers Growth
      </span>
    </div>
  )
}

function MagnoliaBar({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  const magnolia = flywheelData.magnolia
  return (
    <div className="mt-5 border-t border-border-col pt-5">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full text-left group focus:outline-none"
        aria-expanded={open}
      >
        <span className="font-body text-[20px] uppercase tracking-[0.5px] text-accent">
          Magnolia
        </span>
        <span className="font-body text-[20px] text-text-secondary">
          The enterprise-grade agentic platform that powers Labs
        </span>
        <span className="ml-auto font-body text-[20px] text-border-col group-hover:text-accent transition-colors duration-150">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="mt-4 font-body text-[15px] text-text-secondary leading-[1.75]">
          {magnolia.desc}
        </p>
      </div>
    </div>
  )
}

// ─── Detail panels ────────────────────────────────────────────────────────────

function LabsDetail({
  activeItem,
  magnoliaOpen,
  onChipClick,
  onMagnoliaToggle,
}: {
  activeItem: string | null
  magnoliaOpen: boolean
  onChipClick: (key: string) => void
  onMagnoliaToggle: () => void
}) {
  const unit = flywheelData.labs
  const conceptKeys = (unit.concepts ?? []).map((c) => c.key)
  const gtmKeys = (unit.gtm ?? []).map((t) => t.key)
  const opsKeys = (unit.ops ?? []).map((t) => t.key)

  const isGrowthActive =
    activeItem === 'growth' ||
    gtmKeys.includes(activeItem ?? '') ||
    opsKeys.includes(activeItem ?? '')

  const activeConceptItem =
    activeItem && conceptKeys.includes(activeItem)
      ? unit.concepts?.find((c) => c.key === activeItem)
      : null

  const activeTrackItem =
    activeItem && (gtmKeys.includes(activeItem) || opsKeys.includes(activeItem))
      ? [...(unit.gtm ?? []), ...(unit.ops ?? [])].find(
          (t) => t.key === activeItem
        )
      : null

  return (
    <div>
      <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
        {unit.name}
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {unit.concepts?.map((c) => (
          <UnitBox
            key={c.key}
            label={c.name}
            active={activeItem === c.key}
            onClick={() => onChipClick(c.key)}
          />
        ))}
        <UnitBox
          label="Growth"
          active={isGrowthActive}
          onClick={() => onChipClick('growth')}
        />
      </div>

      {activeConceptItem && <Callout text={activeConceptItem.desc} />}

      {isGrowthActive && (
        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-body text-[20px] uppercase tracking-[0.5px] text-text-secondary mb-3">
                Go-to-Market
              </p>
              <div className="flex flex-wrap gap-2">
                {unit.gtm?.map((t) => (
                  <Chip
                    key={t.key}
                    label={t.name}
                    active={activeItem === t.key}
                    onClick={() => onChipClick(t.key)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="font-body text-[20px] uppercase tracking-[0.5px] text-text-secondary mb-3">
                Operations
              </p>
              <div className="flex flex-wrap gap-2">
                {unit.ops?.map((t) => (
                  <Chip
                    key={t.key}
                    label={t.name}
                    active={activeItem === t.key}
                    onClick={() => onChipClick(t.key)}
                  />
                ))}
              </div>
            </div>
          </div>

          {activeTrackItem && <Callout text={activeTrackItem.desc} />}

          <MagnoliaGlowBar />
        </div>
      )}

      <MagnoliaBar open={magnoliaOpen} onToggle={onMagnoliaToggle} />
    </div>
  )
}

function StudiosDetail({
  activeItem,
  onChipClick,
}: {
  activeItem: string | null
  onChipClick: (key: string) => void
}) {
  const unit = flywheelData.studios
  const activeChipItem = unit.items?.find((i) => i.key === activeItem) ?? null

  return (
    <div>
      <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
        {unit.name}
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>
      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          {unit.items?.map((item) => (
            <Chip
              key={item.key}
              label={item.name}
              active={activeItem === item.key}
              onClick={() => onChipClick(item.key)}
            />
          ))}
        </div>
        {activeChipItem && <Callout text={activeChipItem.desc} />}
      </div>
    </div>
  )
}

function CapitalDetail() {
  const unit = flywheelData.capital
  return (
    <div>
      <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
        {unit.name}
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AllenixHero() {
  const [activeUnit, setActiveUnit] = useState<FlywheelUnit | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [magnoliaOpen, setMagnoliaOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  function handleCardClick(unit: FlywheelUnit) {
    if (activeUnit === unit) {
      setActiveUnit(null)
      setActiveItem(null)
      setMagnoliaOpen(false)
    } else {
      setActiveUnit(unit)
      setActiveItem(null)
      setMagnoliaOpen(false)
      // Scroll to panel after state update
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  function handleChipClick(key: string) {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-28 pb-6">
        {UNIT_CARDS.map((card) => (
          <UnitCard
            key={card.unit}
            title={card.title}
            tagline={card.tagline}
            forming={card.forming}
            icon={card.icon}
            active={activeUnit === card.unit}
            onClick={() => handleCardClick(card.unit)}
          />
        ))}
      </div>

      {/* ── Detail panel ── */}
      <div
        ref={panelRef}
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: activeUnit ? '1600px' : '0px',
          opacity: activeUnit ? 1 : 0,
        }}
      >
        <div className="detail-panel-inner py-8 border-t border-border-col">
          {activeUnit === 'labs' && (
            <LabsDetail
              activeItem={activeItem}
              magnoliaOpen={magnoliaOpen}
              onChipClick={handleChipClick}
              onMagnoliaToggle={() => setMagnoliaOpen((p) => !p)}
            />
          )}
          {activeUnit === 'studios' && (
            <StudiosDetail activeItem={activeItem} onChipClick={handleChipClick} />
          )}
          {activeUnit === 'capital' && <CapitalDetail />}
        </div>
      </div>
    </div>
  )
}
