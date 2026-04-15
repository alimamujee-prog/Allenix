'use client'

import { useState } from 'react'
import { flywheelData, FlywheelUnit } from '@/data/flywheel'

// ─── Sub-components ──────────────────────────────────────────────────────────

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

function MagnoliaBar({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  const magnolia = flywheelData.magnolia

  return (
    <div className="mt-8 border-t border-border-col pt-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full text-left group focus:outline-none"
        aria-expanded={open}
      >
        <span className="font-body text-[20px] uppercase tracking-[0.5px] text-accent">
          Magnolia
        </span>
        <span className="font-body text-[20px] text-text-secondary">
          The platform beneath Labs, Studios, and Capital
        </span>
        <span
          className="ml-auto font-body text-[20px] text-border-col group-hover:text-accent transition-colors duration-150"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <p className="mt-4 font-body text-[15px] text-text-secondary leading-[1.75]">
          {magnolia.desc}
        </p>
      </div>
    </div>
  )
}

// ─── SVG Flywheel ─────────────────────────────────────────────────────────────

const NODES: { unit: FlywheelUnit; cx: number; cy: number; label: string }[] = [
  { unit: 'studios', cx: 300, cy: 72, label: 'Studios' },
  { unit: 'capital', cx: 108, cy: 304, label: 'Capital' },
  { unit: 'labs', cx: 492, cy: 304, label: 'Labs' },
]

function FlywheelSVG({
  activeUnit,
  onNodeClick,
}: {
  activeUnit: FlywheelUnit | null
  onNodeClick: (unit: FlywheelUnit) => void
}) {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full max-w-[560px] mx-auto block"
      aria-label="Allenix flywheel diagram"
      role="img"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#04CCBA" />
        </marker>
      </defs>

      {/* Studios → Labs */}
      <path
        id="arrow-s-l"
        d="M 360 72 C 480 72 492 200 492 280"
        fill="none"
        stroke="#04CCBA"
        strokeWidth="1"
        markerEnd="url(#arrowhead)"
      />
      <text fontSize="20" fill="#ffffff" fontFamily="var(--font-body)">
        <textPath href="#arrow-s-l" startOffset="50%" textAnchor="middle">
          builds the audience
        </textPath>
      </text>

      {/* Labs → Capital */}
      <path
        id="arrow-l-c"
        d="M 492 328 C 492 390 108 390 108 328"
        fill="none"
        stroke="#04CCBA"
        strokeWidth="1"
        markerEnd="url(#arrowhead)"
      />
      <text fontSize="20" fill="#ffffff" fontFamily="var(--font-body)">
        <textPath href="#arrow-l-c" startOffset="50%" textAnchor="middle">
          validates companies
        </textPath>
      </text>

      {/* Capital → Studios */}
      <path
        id="arrow-c-s"
        d="M 108 280 C 108 200 120 72 240 72"
        fill="none"
        stroke="#04CCBA"
        strokeWidth="1"
        markerEnd="url(#arrowhead)"
      />
      <text fontSize="20" fill="#ffffff" fontFamily="var(--font-body)">
        <textPath href="#arrow-c-s" startOffset="50%" textAnchor="middle">
          amplifies the win
        </textPath>
      </text>

      {/* Nodes */}
      {NODES.map(({ unit, cx, cy, label }) => {
        const isActive = activeUnit === unit
        const data = flywheelData[unit]
        return (
          <g
            key={unit}
            onClick={() => onNodeClick(unit)}
            className="cursor-pointer"
            role="button"
            aria-pressed={isActive}
            aria-label={`${label} unit`}
          >
            <rect
              x={cx - 60}
              y={cy - 24}
              width={120}
              height={48}
              rx={6}
              fill={isActive ? '#051f1d' : '#000000'}
              stroke={isActive ? '#04CCBA' : '#1f1f1f'}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: 'fill 150ms ease-out, stroke 150ms ease-out' }}
            />
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontStyle="italic"
              fontWeight="600"
              fontSize="15"
              fill="#ffffff"
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

function LabsPanel({
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

  const activeConceptItem =
    activeItem && conceptKeys.includes(activeItem)
      ? unit.concepts?.find((c) => c.key === activeItem)
      : null

  const activeTrackItem =
    activeItem && (gtmKeys.includes(activeItem) || opsKeys.includes(activeItem))
      ? [...(unit.gtm ?? []), ...(unit.ops ?? [])].find((t) => t.key === activeItem)
      : null

  return (
    <div className="pt-8">
      <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
        {unit.name}
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>

      {/* Concepts */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {unit.concepts?.map((c) => (
            <Chip
              key={c.key}
              label={c.name}
              active={activeItem === c.key}
              onClick={() => onChipClick(c.key)}
            />
          ))}
        </div>
        {activeConceptItem && <Callout text={activeConceptItem.desc} />}
      </div>

      {/* Growth section */}
      <div className="mt-10">
        <h3 className="font-display font-semibold italic text-[22px] text-text-primary">
          Growth
        </h3>
        <p className="mt-1 font-body text-[20px] uppercase tracking-[0.5px] text-text-secondary">
          Go-to-Market and Operations tracks
        </p>

        <div className="mt-5 grid grid-cols-2 gap-6">
          {/* GTM */}
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

          {/* Ops */}
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
      </div>

      <MagnoliaBar open={magnoliaOpen} onToggle={onMagnoliaToggle} />
    </div>
  )
}

function StudiosPanel({
  activeItem,
  onChipClick,
}: {
  activeItem: string | null
  onChipClick: (key: string) => void
}) {
  const unit = flywheelData.studios
  const activeChipItem = unit.items?.find((i) => i.key === activeItem) ?? null

  return (
    <div className="pt-8">
      <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
        {unit.name}
      </h2>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>
      <div className="mt-8">
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

function CapitalPanel() {
  const unit = flywheelData.capital

  return (
    <div className="pt-8">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-black text-[32px] tracking-[-0.5px] text-text-primary">
          {unit.name}
        </h2>
      </div>
      <p className="mt-3 font-body text-[16px] text-text-secondary leading-[1.75] max-w-[720px]">
        {unit.desc}
      </p>
    </div>
  )
}

function FlywheelPanel({
  activeUnit,
  activeItem,
  magnoliaOpen,
  onChipClick,
  onMagnoliaToggle,
}: {
  activeUnit: FlywheelUnit | null
  activeItem: string | null
  magnoliaOpen: boolean
  onChipClick: (key: string) => void
  onMagnoliaToggle: () => void
}) {
  return (
    <div
      className="overflow-hidden transition-all duration-200 ease-out"
      style={{
        maxHeight: activeUnit ? '1400px' : '0px',
        opacity: activeUnit ? 1 : 0,
      }}
    >
      <div className="border-t border-border-col mt-8">
        {activeUnit === 'labs' && (
          <LabsPanel
            activeItem={activeItem}
            magnoliaOpen={magnoliaOpen}
            onChipClick={onChipClick}
            onMagnoliaToggle={onMagnoliaToggle}
          />
        )}
        {activeUnit === 'studios' && (
          <StudiosPanel activeItem={activeItem} onChipClick={onChipClick} />
        )}
        {activeUnit === 'capital' && <CapitalPanel />}
      </div>
    </div>
  )
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function Flywheel() {
  const [activeUnit, setActiveUnit] = useState<FlywheelUnit | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [magnoliaOpen, setMagnoliaOpen] = useState(false)

  function handleNodeClick(unit: FlywheelUnit) {
    if (activeUnit === unit) {
      setActiveUnit(null)
      setActiveItem(null)
      setMagnoliaOpen(false)
    } else {
      setActiveUnit(unit)
      setActiveItem(null)
      setMagnoliaOpen(false)
    }
  }

  function handleChipClick(key: string) {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  return (
    <div>
      <FlywheelSVG activeUnit={activeUnit} onNodeClick={handleNodeClick} />
      <FlywheelPanel
        activeUnit={activeUnit}
        activeItem={activeItem}
        magnoliaOpen={magnoliaOpen}
        onChipClick={handleChipClick}
        onMagnoliaToggle={() => setMagnoliaOpen((p) => !p)}
      />
    </div>
  )
}
