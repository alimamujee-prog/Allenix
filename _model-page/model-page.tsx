'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'

import {
  buildDashboardStatus,
  buildNarrativeEvents,
  buildProjectionForecast,
  buildRecommendations,
  HORIZON_MONTHS,
  targetArrAtMonth,
  type DashboardRecommendation,
  type DashboardSeedSnapshot,
  type DashboardStatus,
  type HorizonKey,
  type MonthlyActual,
  type NarrativeEvent,
  type ProjectionInputs,
  type ProjectionMonth,
  type ScenarioKey,
  type WeeklyActual,
} from '../../lib/operator-cockpit'

type ChartSeries = {
  label: string
  color: string
  values: Array<number | null>
  dashed?: boolean
}

type TimelinePoint = {
  month: number
  label: string
  sublabel: string
}

const HORIZON_LABELS: Record<HorizonKey, string> = {
  '3m': '3 Months',
  '6m': '6 Months',
  '12m': '12 Months',
  '36m': '36 Months',
  '60m': '60 Months',
  '120m': '120 Months',
}

const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  base: 'Base',
  upside: 'Upside',
  downside: 'Downside',
}

const SCENARIO_DESCRIPTIONS: Record<ScenarioKey, string> = {
  base: 'Most likely pace from current reality plus the next few improvements.',
  upside: 'Auto-derived from base with stronger demand generation, cleaner delivery leverage, and lighter churn.',
  downside: 'Auto-derived from base with a slower new-logo ramp, more margin pressure, and less operating slack.',
}

const FIELD_HELP: Partial<Record<keyof ProjectionInputs, string>> = {
  startingMRR: 'Monthly recurring revenue at the starting point of the chart.',
  averageAnnualContractValue: 'Average yearly value of one client relationship.',
  newClientsPerMonth: 'How many new clients you expect to land per month right now.',
  targetNewClientsPerMonth: 'The steady-state monthly client adds you are trying to reach.',
  monthsToReachTargetNewClients: 'How long it takes the GTM engine to ramp from now to target pace.',
  annualChurnPct: 'Percent of clients lost over a full year.',
  studiosAttachRatePct: 'Extra revenue from Studios as a percent of core client revenue.',
  grossMarginPct: 'Current gross margin before fixed overhead.',
  targetGrossMarginPct: 'Where gross margin lands once delivery gets tighter and more leveraged.',
  monthlyFixedOpEx: 'Monthly overhead that does not depend on client count.',
  cashOnHand: 'Starting cash available before the plan begins.',
  cacPerNewClient: 'Average cash spent to land one new client.',
  monthlyServicingCostPerClient: 'Direct monthly servicing cost per active client.',
}

const CAPITAL_FIELD_HELP: Partial<Record<keyof ProjectionInputs['acquisition'], string>> = {
  enabled: 'Turns the Capital scenario on for the projection. Leave this off if you want to isolate the core operating engine.',
  dealsPerYear: 'How many acquisitions the model attempts to close each year.',
  averageTargetARR: 'Average annual recurring revenue of each acquired company.',
  purchaseMultiple: 'Purchase price as a multiple of target ARR.',
  integrationDragPct: 'How much acquired revenue is suppressed during the integration period.',
  integrationMonths: 'How long the model assumes it takes for acquired revenue to recover to full run rate.',
  capitalAvailableForDeals: 'Maximum capital available for acquisitions in this scenario.',
}

function deriveScenarioInputs(base: ProjectionInputs, scenario: ScenarioKey): ProjectionInputs {
  if (scenario === 'base') return base

  if (scenario === 'upside') {
    return {
      ...base,
      newClientsPerMonth: base.newClientsPerMonth + 0.25,
      targetNewClientsPerMonth: base.targetNewClientsPerMonth * 1.2,
      monthsToReachTargetNewClients: Math.max(1, Math.round(base.monthsToReachTargetNewClients * 0.85)),
      annualChurnPct: Math.max(0, base.annualChurnPct - 2),
      studiosAttachRatePct: base.studiosAttachRatePct + 2,
      targetGrossMarginPct: Math.min(95, base.targetGrossMarginPct + 4),
      cacPerNewClient: Math.max(0, base.cacPerNewClient - 500),
      monthlyServicingCostPerClient: Math.max(0, base.monthlyServicingCostPerClient - 50),
      acquisition: {
        ...base.acquisition,
        dealsPerYear: base.acquisition.dealsPerYear + 0.5,
      },
    }
  }

  return {
    ...base,
    targetNewClientsPerMonth: Math.max(0, base.targetNewClientsPerMonth * 0.7),
    monthsToReachTargetNewClients: Math.max(1, Math.round(base.monthsToReachTargetNewClients * 1.35)),
    annualChurnPct: base.annualChurnPct + 4,
    studiosAttachRatePct: Math.max(0, base.studiosAttachRatePct - 2),
    grossMarginPct: Math.max(0, base.grossMarginPct - 2),
    targetGrossMarginPct: Math.max(0, base.targetGrossMarginPct - 5),
    monthlyFixedOpEx: base.monthlyFixedOpEx + 1500,
    cacPerNewClient: base.cacPerNewClient + 700,
    monthlyServicingCostPerClient: base.monthlyServicingCostPerClient + 80,
    acquisition: {
      ...base.acquisition,
      dealsPerYear: Math.max(0, base.acquisition.dealsPerYear - 0.5),
    },
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function fmtMoney(value: number) {
  const sign = value < 0 ? '-' : ''
  const absolute = Math.abs(value)
  return `${sign}${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(absolute)}`
}

function fmtMoneyShort(value: number) {
  const sign = value < 0 ? '-' : ''
  const absolute = Math.abs(value)
  if (absolute >= 1000000) return `${sign}$${(absolute / 1000000).toFixed(1)}M`
  if (absolute >= 1000) return `${sign}$${(absolute / 1000).toFixed(0)}k`
  return `${sign}$${absolute.toFixed(0)}`
}

function fmtPercent(value: number) {
  return `${value.toFixed(1)}%`
}

function fmtCount(value: number) {
  return Math.round(value).toLocaleString('en-US')
}

function fmtOneDecimal(value: number) {
  return value.toFixed(1)
}

function statusStyles(status: 'ahead' | 'on-track' | 'behind') {
  if (status === 'ahead') {
    return {
      border: 'var(--col-accent-dim)',
      bg: 'rgba(0, 200, 180, 0.08)',
      color: 'var(--col-accent)',
    }
  }

  if (status === 'behind') {
    return {
      border: '#7f3c42',
      bg: 'rgba(184, 74, 84, 0.12)',
      color: '#ff9ca6',
    }
  }

  return {
    border: '#8d6b26',
    bg: 'rgba(245, 194, 107, 0.08)',
    color: '#f5c26b',
  }
}

function recommendationStyles(severity: DashboardRecommendation['severity']) {
  if (severity === 'action') {
    return {
      border: '#7f3c42',
      bg: 'rgba(184, 74, 84, 0.12)',
      color: '#ff9ca6',
    }
  }

  if (severity === 'watch') {
    return {
      border: '#8d6b26',
      bg: 'rgba(245, 194, 107, 0.08)',
      color: '#f5c26b',
    }
  }

  return {
    border: 'var(--col-accent-dim)',
    bg: 'rgba(0, 200, 180, 0.08)',
    color: 'var(--col-accent)',
  }
}

function formatMonthLabel(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(new Date(isoDate))
}

function formatWeekLabel(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(isoDate))
}

function addMonths(isoDate: string, count: number) {
  const next = new Date(`${isoDate}T00:00:00`)
  next.setMonth(next.getMonth() + count)
  return next.toISOString().slice(0, 10)
}

function buildPath(values: Array<number | null>, xPosition: (index: number) => number, yPosition: (value: number) => number) {
  let path = ''
  let open = false

  values.forEach((value, index) => {
    if (value === null || Number.isNaN(value)) {
      open = false
      return
    }

    path += `${open ? ' L' : ' M'} ${xPosition(index)} ${yPosition(value)}`
    open = true
  })

  return path.trim()
}

function normalizeToPercent(values: number[]) {
  const maxValue = Math.max(...values, 1)
  return values.map((value) => (value / maxValue) * 100)
}

function buildMonthlyTimeline(actuals: MonthlyActual[], endPlanMonth: number): TimelinePoint[] {
  const firstActual = actuals[0]
  const startMonth = firstActual.planMonth

  return Array.from({ length: endPlanMonth - startMonth + 1 }, (_, index) => {
    const planMonth = startMonth + index
    const monthDate = addMonths(firstActual.month, index)

    return {
      month: planMonth,
      label: formatMonthLabel(monthDate),
      sublabel: `Plan month ${planMonth}`,
    }
  })
}

function NumberInput({
  label,
  helper,
  tooltip,
  value,
  onChange,
  prefix = '',
  suffix = '',
  step = 1,
}: {
  label: string
  helper?: string
  tooltip?: string
  value: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  step?: number
}) {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <label style={{ display: 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#dbe5ee' }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {tooltip && (
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <button
                type="button"
                onMouseEnter={() => setHelpOpen(true)}
                onMouseLeave={() => setHelpOpen(false)}
                onFocus={() => setHelpOpen(true)}
                onBlur={() => setHelpOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '1px solid var(--col-border-2)',
                  background: 'var(--col-surface-2)',
                  color: 'var(--col-text-3)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  cursor: 'help',
                }}
                aria-label={tooltip}
              >
                ?
              </button>
              {helpOpen && (
                <span
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: 0,
                    width: '220px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--col-border-2)',
                    background: 'rgba(6, 8, 10, 0.98)',
                    color: '#dbe5ee',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    letterSpacing: '0.01em',
                    textTransform: 'none',
                    zIndex: 20,
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)',
                  }}
                >
                  {tooltip}
                </span>
              )}
            </span>
          )}
          {helper && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.8px', color: 'var(--col-text-3)' }}>
              {helper}
            </span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--col-surface-2)', border: '1px solid var(--col-border)', padding: '0 10px' }}>
        {prefix && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--col-text-3)', paddingRight: '8px' }}>{prefix}</span>}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          step={step}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'var(--col-text-1)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            padding: '11px 0',
            outline: 'none',
          }}
        />
        {suffix && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--col-text-3)', paddingLeft: '8px' }}>{suffix}</span>}
      </div>
    </label>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
  helper,
  tooltip,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  helper?: string
  tooltip?: string
}) {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        background: 'var(--col-surface-2)',
        border: '1px solid var(--col-border)',
        padding: '12px 12px',
        cursor: 'pointer',
      textAlign: 'left',
    }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#dbe5ee' }}>
            {label}
          </div>
          {tooltip && (
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                onMouseEnter={() => setHelpOpen(true)}
                onMouseLeave={() => setHelpOpen(false)}
                onFocus={() => setHelpOpen(true)}
                onBlur={() => setHelpOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '1px solid var(--col-border-2)',
                  background: 'var(--col-surface)',
                  color: 'var(--col-text-3)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  cursor: 'help',
                }}
                aria-label={tooltip}
              >
                ?
              </button>
              {helpOpen && (
                <span
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: 0,
                    width: '220px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--col-border-2)',
                    background: 'rgba(6, 8, 10, 0.98)',
                    color: '#dbe5ee',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    textTransform: 'none',
                    zIndex: 20,
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)',
                  }}
                >
                  {tooltip}
                </span>
              )}
            </span>
          )}
        </div>
        {helper && <div style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--col-text-2)' }}>{helper}</div>}
      </div>
      <div
        style={{
          width: '42px',
          height: '22px',
          borderRadius: '999px',
          background: checked ? 'var(--col-accent-bg)' : 'rgba(138, 155, 176, 0.14)',
          border: `1px solid ${checked ? 'var(--col-accent-dim)' : 'var(--col-border)'}`,
          padding: '2px',
          display: 'flex',
          justifyContent: checked ? 'flex-end' : 'flex-start',
          transition: 'all 150ms ease-out',
        }}
      >
        <span
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: checked ? 'var(--col-accent)' : '#7a8a9a',
            display: 'block',
          }}
        />
      </div>
    </button>
  )
}

function SidebarSection({ title, helper, children }: { title: string; helper?: string; children: ReactNode }) {
  return (
    <section style={{ padding: '18px 18px 0', borderTop: '1px solid var(--col-border)' }}>
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '4px' }}>
          {title}
        </div>
        {helper && <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--col-text-2)' }}>{helper}</div>}
      </div>
      <div style={{ display: 'grid', gap: '12px' }}>{children}</div>
    </section>
  )
}

function SummaryCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)', padding: '16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.7px', color: 'var(--col-text-1)' }}>
        {value}
      </div>
      {helper && <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--col-text-2)', lineHeight: 1.6 }}>{helper}</div>}
    </div>
  )
}

function StatusPill({ status }: { status: 'ahead' | 'on-track' | 'behind' }) {
  const styles = statusStyles(status)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 10px',
        border: `1px solid ${styles.border}`,
        background: styles.bg,
        color: styles.color,
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}
    >
      {status === 'on-track' ? 'On Track' : status === 'ahead' ? 'Ahead' : 'Behind'}
    </span>
  )
}

function Panel({
  title,
  subtitle,
  right,
  children,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
}) {
  return (
    <section style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)', padding: '22px' }}>
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', lineHeight: 1.15, letterSpacing: '-0.6px', color: 'var(--col-text-1)', marginBottom: '6px' }}>
            {title}
          </h2>
          {subtitle && <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--col-text-2)', maxWidth: '760px' }}>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}

function LineChart({
  title,
  subtitle,
  points,
  series,
  yFormatter,
  markers,
  markerValue,
}: {
  title: string
  subtitle?: string
  points: TimelinePoint[]
  series: ChartSeries[]
  yFormatter: (value: number) => string
  markers?: NarrativeEvent[]
  markerValue?: (month: number) => number | null
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const width = 900
  const height = 420
  const pad = { top: 22, right: 22, bottom: 56, left: 86 }
  const plotWidth = width - pad.left - pad.right
  const plotHeight = height - pad.top - pad.bottom
  const validValues = series.flatMap((item) => item.values).filter((value): value is number => value !== null && Number.isFinite(value))
  const maxValue = Math.max(...validValues, 1)
  const minValue = Math.min(...validValues, 0)
  const range = maxValue - minValue || 1
  const tickValues = Array.from({ length: 5 }, (_, index) => minValue + (range / 4) * index)

  const xPosition = (index: number) => pad.left + (index / Math.max(points.length - 1, 1)) * plotWidth
  const yPosition = (value: number) => pad.top + plotHeight - ((value - minValue) / range) * plotHeight
  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null
  const hoveredEvents = hoveredPoint ? (markers ?? []).filter((event) => event.month === hoveredPoint.month) : []
  const tooltipWidth = 320
  const tooltipHeight = hoverIndex !== null
    ? 82 + series.filter((item) => item.values[hoverIndex] !== null).length * 30 + hoveredEvents.length * 22
    : 0
  const tooltipAnchorX = hoverIndex !== null ? xPosition(hoverIndex) : 0
  const tooltipOnRight = hoverIndex !== null ? hoverIndex < Math.floor(points.length / 2) : true
  const tooltipX = hoverIndex === null
    ? 0
    : tooltipOnRight
      ? Math.min(tooltipAnchorX + 20, width - tooltipWidth - 10)
      : Math.max(tooltipAnchorX - tooltipWidth - 20, 10)
  const tooltipY = pad.top + 14

  return (
    <Panel title={title} subtitle={subtitle}>
      <div style={{ marginBottom: '14px', display: 'flex', flexWrap: 'wrap', gap: '12px 18px' }}>
        {series.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '14px', height: '3px', background: item.color, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--col-text-2)' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const x = ((event.clientX - rect.left) / rect.width) * width
          const idx = Math.round(((x - pad.left) / plotWidth) * Math.max(points.length - 1, 1))
          setHoverIndex(clamp(idx, 0, points.length - 1))
        }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {tickValues.map((value, index) => {
          const y = yPosition(value)
          return (
            <g key={index}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} style={{ stroke: 'var(--col-border)' }} strokeWidth="1" />
              <text x={pad.left - 12} y={y + 5} textAnchor="end" fill="#8a9bb0" fontSize="12" fontFamily="var(--font-mono)">
                {yFormatter(value)}
              </text>
            </g>
          )
        })}

        {(markers ?? []).map((event) => {
          const markerIndex = points.findIndex((point) => point.month === event.month)
          if (markerIndex === -1) return null
          const value = markerValue?.(event.month)
          if (value === null || value === undefined) return null
          const toneColor = event.tone === 'positive' ? 'var(--col-accent)' : event.tone === 'caution' ? '#ff9ca6' : '#dbe5ee'

          return (
            <g key={`${event.month}-${event.title}`}>
              <line x1={xPosition(markerIndex)} y1={pad.top} x2={xPosition(markerIndex)} y2={pad.top + plotHeight} style={{ stroke: toneColor }} strokeWidth="1" strokeDasharray="4 4" opacity="0.28" />
              <circle cx={xPosition(markerIndex)} cy={yPosition(value)} r="4.5" style={{ fill: toneColor }} />
            </g>
          )
        })}

        {series.map((item) => {
          const path = buildPath(item.values, xPosition, yPosition)
          if (!path) return null
          const visiblePoints = item.values
            .map((value, index) => ({ value, index }))
            .filter((entry): entry is { value: number; index: number } => entry.value !== null && entry.value !== undefined)

          return (
            <g key={item.label}>
              <path
                d={path}
                fill="none"
                style={{ stroke: item.color }}
                strokeWidth={item.label === 'Reality' ? '3.5' : '3'}
                strokeDasharray={item.dashed ? '7 5' : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {visiblePoints.length <= 12 && visiblePoints.map((entry) => (
                <circle
                  key={`${item.label}-${entry.index}`}
                  cx={xPosition(entry.index)}
                  cy={yPosition(entry.value)}
                  r={item.label === 'Reality' ? '4.5' : '3.5'}
                  style={{ fill: item.color }}
                  opacity={0.9}
                />
              ))}
            </g>
          )
        })}

        {hoverIndex !== null && hoveredPoint && (
          <g>
            <line x1={xPosition(hoverIndex)} y1={pad.top} x2={xPosition(hoverIndex)} y2={pad.top + plotHeight} stroke="#dbe5ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
            {series.map((item) => {
              const value = item.values[hoverIndex]
              if (value === null || value === undefined) return null
              return (
                <circle
                  key={`hover-${item.label}`}
                  cx={xPosition(hoverIndex)}
                  cy={yPosition(value)}
                  r="5"
                  style={{ fill: item.color, stroke: 'rgba(6, 8, 10, 0.95)' }}
                  strokeWidth="2"
                />
              )
            })}

            <g transform={`translate(${tooltipX}, ${tooltipY})`}>
              <rect width={tooltipWidth} height={tooltipHeight} rx="10" fill="rgba(6, 8, 10, 0.985)" stroke="var(--col-border-2)" />
              <text x="18" y="28" fill="#dbe5ee" fontSize="15" fontFamily="var(--font-mono)" letterSpacing="1px">
                {hoveredPoint.label}
              </text>
              <text x="18" y="48" fill="#8a9bb0" fontSize="13" fontFamily="var(--font-mono)">
                {hoveredPoint.sublabel}
              </text>
              {series
                .filter((item) => item.values[hoverIndex] !== null)
                .map((item, index) => (
                  <g key={`tooltip-${item.label}`} transform={`translate(0, ${74 + index * 30})`}>
                    <rect x="18" y="-9" width="18" height="5" fill={item.color} />
                    <text x="46" y="0" fill="#dbe5ee" fontSize="15" fontFamily="var(--font-mono)">
                      {item.label}: {yFormatter(item.values[hoverIndex] ?? 0)}
                    </text>
                  </g>
                ))}
              {hoveredEvents.map((event, index) => {
                const toneColor = event.tone === 'positive' ? 'var(--col-accent)' : event.tone === 'caution' ? '#ff9ca6' : '#dbe5ee'
                return (
                  <g key={`tooltip-event-${event.title}`} transform={`translate(0, ${74 + series.filter((item) => item.values[hoverIndex] !== null).length * 30 + index * 22})`}>
                    <circle cx="24" cy="-5" r="5" fill={toneColor} />
                    <text x="46" y="0" fill={toneColor} fontSize="13" fontFamily="var(--font-mono)">
                      {event.title}
                    </text>
                  </g>
                )
              })}
            </g>
          </g>
        )}

        {points.map((point, index) => {
          const shouldShow = points.length <= 12 || index === 0 || index === points.length - 1 || index % Math.ceil(points.length / 6) === 0
          if (!shouldShow) return null

          return (
            <text
              key={`${point.month}-${point.label}`}
              x={xPosition(index)}
              y={height - 16}
              textAnchor="middle"
              fill="#8a9bb0"
              fontSize="12"
              fontFamily="var(--font-mono)"
            >
              {point.label}
            </text>
          )
        })}
      </svg>
    </Panel>
  )
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: Array<Array<string | number>>
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--col-border)' }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  textAlign: 'right',
                  padding: '10px 10px',
                  color: '#dbe5ee',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontSize: '10px',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: '1px solid var(--col-border)' }}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} style={{ textAlign: 'right', padding: '10px 10px', color: cellIndex === 0 ? 'var(--col-text-1)' : 'var(--col-text-2)' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SegmentedTooltipButton({
  label,
  tooltip,
  active,
  onClick,
}: {
  label: string
  tooltip: string
  active: boolean
  onClick: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          background: active ? 'var(--col-accent-bg)' : 'transparent',
          border: `1px solid ${active ? 'var(--col-accent-dim)' : 'var(--col-border)'}`,
          color: active ? 'var(--col-accent)' : '#dbe5ee',
          padding: '10px 12px',
          cursor: 'pointer',
          minWidth: '92px',
        }}
      >
        {label}
      </button>
      {open && (
        <span
          style={{
            position: 'absolute',
            top: '42px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '220px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid var(--col-border-2)',
            background: 'rgba(6, 8, 10, 0.98)',
            color: '#dbe5ee',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            lineHeight: 1.5,
            textTransform: 'none',
            letterSpacing: '0.01em',
            zIndex: 20,
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)',
            pointerEvents: 'none',
          }}
        >
          {tooltip}
        </span>
      )}
    </span>
  )
}

function RecommendationCard({ recommendation }: { recommendation: DashboardRecommendation }) {
  const styles = recommendationStyles(recommendation.severity)

  return (
    <div style={{ background: styles.bg, border: `1px solid ${styles.border}`, padding: '18px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: styles.color, marginBottom: '8px' }}>
        {recommendation.severity === 'stable' ? 'Stable' : recommendation.severity === 'watch' ? 'Watch Item' : 'Action Item'}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1.1, color: 'var(--col-text-1)', marginBottom: '8px' }}>
        {recommendation.issue}
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--col-text-2)', marginBottom: '14px' }}>{recommendation.why}</p>
      <div style={{ display: 'grid', gap: '8px' }}>
        {recommendation.checks.map((check) => (
          <div key={check} style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--col-text-1)' }}>
            {check}
          </div>
        ))}
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="model-shell" style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <aside className="model-sidebar" style={{ background: 'var(--col-surface)', borderRight: '1px solid var(--col-border)', padding: '18px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', lineHeight: 1.05, color: 'var(--col-text-1)', marginBottom: '10px' }}>
          Operator Cockpit
        </div>
        <div style={{ fontSize: '14px', lineHeight: 1.65 }}>Loading seeded reality, fixed goals, and the current projection engine.</div>
      </aside>
      <main className="model-main">
        <Panel title="Loading cockpit" subtitle="The dashboard is pulling the internal seed snapshot and preparing the current operating view.">
          <div style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--col-text-2)' }}>
            This stays local for now. Later we can swap the seed layer for real CRM, finance, and Magnolia-connected data without changing the UI contract.
          </div>
        </Panel>
      </main>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="model-shell" style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <main className="model-main" style={{ paddingLeft: '32px' }}>
        <Panel title="Cockpit unavailable" subtitle="The page could not load the internal dashboard snapshot.">
          <div style={{ fontSize: '15px', lineHeight: 1.7, color: '#ff9ca6' }}>{message}</div>
        </Panel>
      </main>
    </div>
  )
}

export default function ModelPage() {
  const [snapshot, setSnapshot] = useState<DashboardSeedSnapshot | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('base')
  const [selectedHorizon, setSelectedHorizon] = useState<HorizonKey>('12m')
  const [baseInputs, setBaseInputs] = useState<ProjectionInputs | null>(null)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  useEffect(() => {
    let active = true

    async function loadSnapshot() {
      try {
        const response = await fetch('/api/dashboard', { cache: 'no-store' })
        if (!response.ok) throw new Error('Dashboard seed request failed.')
        const data = (await response.json()) as DashboardSeedSnapshot
        if (!active) return
        setSnapshot(data)
        setBaseInputs(data.projectionDefaults.base)
        setSelectedScenario(data.defaultScenario)
        setSelectedHorizon(data.defaultHorizon)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unknown dashboard error.')
      }
    }

    loadSnapshot()

    return () => {
      active = false
    }
  }, [])

  const currentInputs = baseInputs ? deriveScenarioInputs(baseInputs, selectedScenario) : null

  const latestMonthlyActual = snapshot?.actuals.monthly[snapshot.actuals.monthly.length - 1] ?? null
  const latestWeeklyActual = snapshot?.actuals.weekly[snapshot.actuals.weekly.length - 1] ?? null

  const currentPlanMonth = latestMonthlyActual?.planMonth ?? 0
  const projectionEndMonth = snapshot ? Math.min(120, currentPlanMonth + HORIZON_MONTHS[selectedHorizon]) : 0

  const projection = useMemo(() => {
    if (!snapshot || !currentInputs || !latestMonthlyActual) return []
    return buildProjectionForecast(currentInputs, latestMonthlyActual.planMonth, projectionEndMonth)
  }, [snapshot, currentInputs, latestMonthlyActual, projectionEndMonth])

  const status = useMemo<DashboardStatus | null>(() => {
    if (!snapshot || projection.length === 0) return null
    return buildDashboardStatus(snapshot.goal, snapshot.actuals.monthly, projection, selectedHorizon)
  }, [snapshot, projection, selectedHorizon])

  const recommendations = useMemo(() => {
    if (!snapshot || !status || projection.length === 0) return []
    return buildRecommendations(status, snapshot.actuals.weekly, projection)
  }, [snapshot, status, projection])

  const events = useMemo(() => {
    if (!snapshot || projection.length === 0) return { arr: [] as NarrativeEvent[], cash: [] as NarrativeEvent[] }
    return buildNarrativeEvents(snapshot.goal, projection)
  }, [snapshot, projection])

  const targetPaceEvents = useMemo<NarrativeEvent[]>(() => {
    if (!snapshot) return []

    return [
      {
        month: 24,
        title: 'Phase 2 ramp begins',
        detail: 'The target line assumes that by month 24 Allenix has moved beyond early proof and starts compounding through stronger distribution, delivery leverage, and the early shape of the broader platform.',
        chart: 'arr',
        tone: 'neutral',
      },
    ]
  }, [snapshot])

  const monthlyTimeline = useMemo(() => {
    if (!snapshot || !latestMonthlyActual) return []
    return buildMonthlyTimeline(snapshot.actuals.monthly, projectionEndMonth)
  }, [snapshot, latestMonthlyActual, projectionEndMonth])

  const arrChartSeries = useMemo(() => {
    if (!snapshot || monthlyTimeline.length === 0) return [] as ChartSeries[]
    const actualByMonth = new Map(snapshot.actuals.monthly.map((item) => [item.planMonth, item]))
    const projectionByMonth = new Map(projection.map((item) => [item.month, item]))

    return [
      {
        label: 'On-Target Pace',
        color: '#f5c26b',
        values: monthlyTimeline.map((point) => targetArrAtMonth(snapshot.goal, point.month) / 12),
        dashed: true,
      },
      {
        label: 'Reality',
        color: '#f0f2f4',
        values: monthlyTimeline.map((point) => actualByMonth.get(point.month)?.revenue ?? null),
      },
      {
        label: 'Projection',
        color: 'var(--col-accent)',
        values: monthlyTimeline.map((point) => point.month >= currentPlanMonth ? projectionByMonth.get(point.month)?.totalRevenue ?? null : null),
      },
    ]
  }, [snapshot, monthlyTimeline, projection, currentPlanMonth])

  const cashEbitdaSeries = useMemo(() => {
    if (!snapshot || monthlyTimeline.length === 0) return [] as ChartSeries[]
    const actualByMonth = new Map(snapshot.actuals.monthly.map((item) => [item.planMonth, item]))
    const projectionByMonth = new Map(projection.map((item) => [item.month, item]))

    return [
      {
        label: 'Reality Cash',
        color: '#7c9dfb',
        values: monthlyTimeline.map((point) => actualByMonth.get(point.month)?.cashBalance ?? null),
      },
      {
        label: 'Projection Cash',
        color: 'var(--col-accent)',
        values: monthlyTimeline.map((point) => point.month >= currentPlanMonth ? projectionByMonth.get(point.month)?.cashBalance ?? null : null),
      },
      {
        label: 'Reality EBITDA',
        color: '#dbe5ee',
        values: monthlyTimeline.map((point) => actualByMonth.get(point.month)?.ebitda ?? null),
        dashed: true,
      },
      {
        label: 'Projection EBITDA',
        color: '#f5c26b',
        values: monthlyTimeline.map((point) => point.month >= currentPlanMonth ? projectionByMonth.get(point.month)?.ebitda ?? null : null),
        dashed: true,
      },
    ]
  }, [snapshot, monthlyTimeline, projection, currentPlanMonth])

  const projectionMixSeries = useMemo(() => {
    if (projection.length === 0) return [] as ChartSeries[]

    return [
      {
        label: 'Core Revenue',
        color: 'var(--col-accent)',
        values: projection.map((item) => item.coreRevenue),
      },
      {
        label: 'Studios Attach',
        color: '#7dd3c7',
        values: projection.map((item) => item.studiosRevenue),
      },
      {
        label: 'Portfolio Revenue',
        color: '#7c9dfb',
        values: projection.map((item) => item.portfolioRevenue),
        dashed: true,
      },
    ]
  }, [projection])

  const projectionTimeline = useMemo<TimelinePoint[]>(() => {
    if (!snapshot || !latestMonthlyActual || projection.length === 0) return []
    return projection.map((month, index) => ({
      month: month.month,
      label: formatMonthLabel(addMonths(latestMonthlyActual.month, index)),
      sublabel: `Plan month ${month.month}`,
    }))
  }, [snapshot, latestMonthlyActual, projection])

  const weeklyGtmPoints = useMemo<TimelinePoint[]>(() => {
    if (!snapshot) return []
    return snapshot.actuals.weekly.map((week, index) => ({
      month: index,
      label: formatWeekLabel(week.weekEnding),
      sublabel: `Week ending ${formatWeekLabel(week.weekEnding)}`,
    }))
  }, [snapshot])

  const weeklyGtmSeries = useMemo(() => {
    if (!snapshot) return [] as ChartSeries[]
    const pipelineCoverage = normalizeToPercent(snapshot.actuals.weekly.map((week) => week.qualifiedPipeline))
    const winRate = snapshot.actuals.weekly.map((week) => week.winRatePct)
    const opportunityFlow = normalizeToPercent(snapshot.actuals.weekly.map((week) => week.newOpportunities))

    return [
      { label: 'Qualified Pipeline Index', color: 'var(--col-accent)', values: pipelineCoverage },
      { label: 'Win Rate', color: '#f5c26b', values: winRate },
      { label: 'New Opportunity Index', color: '#f0f2f4', values: opportunityFlow },
    ]
  }, [snapshot])

  const weeklyDeliverySeries = useMemo(() => {
    if (!snapshot) return [] as ChartSeries[]
    const activeClientLoad = normalizeToPercent(snapshot.actuals.weekly.map((week) => week.activeClients))
    const retentionHealth = snapshot.actuals.weekly.map((week) => {
      const totalMoved = week.newClients + week.churnedClients
      if (totalMoved <= 0) return 100
      return Math.max(0, 100 - (week.churnedClients / totalMoved) * 100)
    })

    return [
      { label: 'Delivery Health', color: 'var(--col-accent)', values: snapshot.actuals.weekly.map((week) => week.deliveryHealthPct) },
      { label: 'Retention Health', color: '#f5c26b', values: retentionHealth },
      { label: 'Client Load Index', color: '#f0f2f4', values: activeClientLoad },
    ]
  }, [snapshot])

  function updateInput<K extends keyof ProjectionInputs>(key: K, value: ProjectionInputs[K]) {
    if (!baseInputs) return
    setBaseInputs({
      ...baseInputs,
      [key]: value,
    })
  }

  function updateAcquisition<K extends keyof ProjectionInputs['acquisition']>(
    key: K,
    value: ProjectionInputs['acquisition'][K]
  ) {
    if (!baseInputs) return
    setBaseInputs({
      ...baseInputs,
      acquisition: {
        ...baseInputs.acquisition,
        [key]: value,
      },
    })
  }

  function resetScenario() {
    if (!snapshot) return
    setBaseInputs(snapshot.projectionDefaults.base)
  }

  if (error) return <ErrorState message={error} />
  if (!snapshot || !baseInputs || !currentInputs || !latestMonthlyActual || !latestWeeklyActual || !status) return <LoadingState />

  const northStarCards = [
    {
      label: 'Reality ARR Now',
      value: fmtMoneyShort(status.actualArrNow),
      helper: `Against ${fmtMoneyShort(status.targetArrNow)} on-target pace today`,
    },
    {
      label: 'ARR Gap At Horizon',
      value: fmtMoneyShort(status.projectedArrGap),
      helper: `${HORIZON_LABELS[selectedHorizon]} forward from current stage`,
    },
    {
      label: 'Reality EBITDA Margin',
      value: fmtPercent(status.actualMarginNow),
      helper: 'Descriptive only. Not judged against a straight-line pace.',
    },
    {
      label: 'Projected EBITDA Margin',
      value: fmtPercent(status.projectedMarginAtTarget),
      helper: `${HORIZON_LABELS[selectedHorizon]} forward under the selected scenario`,
    },
    {
      label: 'Latest Cash',
      value: fmtMoneyShort(latestMonthlyActual.cashBalance),
      helper: `Reality close for ${formatMonthLabel(latestMonthlyActual.month)}`,
    },
    {
      label: 'Overall Status',
      value: status.overallStatus === 'on-track' ? 'On Track' : status.overallStatus === 'ahead' ? 'Ahead' : 'Behind',
      helper: 'Judged from ARR pace, EBITDA pace, GTM signals, and delivery signals',
    },
  ]

  const monthlyRows = snapshot.actuals.monthly.map((month) => {
    const projectionPoint = projection.find((item) => item.month === month.planMonth)
    return [
      formatMonthLabel(month.month),
      fmtMoneyShort(month.revenue),
      fmtMoneyShort(month.grossProfit),
      fmtMoneyShort(month.ebitda),
      fmtMoneyShort(month.cashBalance),
      projectionPoint ? fmtMoneyShort(projectionPoint.totalRevenue) : '—',
      fmtMoneyShort(targetArrAtMonth(snapshot.goal, month.planMonth) / 12),
    ]
  })

  const projectionRows = projection
    .filter((month, index) => {
      if (selectedHorizon === '12m') return true
      if (index === 0 || index === projection.length - 1) return true
      return (month.month - currentPlanMonth) % 12 === 0
    })
    .map((month) => [
      `PM ${month.month}`,
      fmtMoneyShort(month.totalRevenue),
      fmtMoneyShort(month.grossProfit),
      fmtMoneyShort(month.ebitda),
      fmtPercent(month.ebitdaMarginPct),
      fmtMoneyShort(month.cashBalance),
      fmtCount(month.activeClients),
    ])

  return (
    <div className="model-shell" style={{ background: 'var(--col-bg)', color: 'var(--col-text-2)' }}>
      <aside className="model-sidebar" style={{ background: 'var(--col-surface)', borderRight: '1px solid var(--col-border)' }}>
        <div style={{ padding: '18px', borderBottom: '1px solid var(--col-border)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '8px' }}>
            Internal Dashboard
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', lineHeight: 1.05, letterSpacing: '-0.8px', color: 'var(--col-text-1)', marginBottom: '8px' }}>
            Allenix Operator Cockpit
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--col-text-2)' }}>
            Fixed north star. Seeded reality. Editable projection. The job here is to see whether we are actually on pace to build the firm we said we would.
          </div>
        </div>

        <SidebarSection
          title="Reality Assumptions"
          helper="These anchor every scenario to current truth. Upside and downside are automatically derived from base instead of being edited separately."
        >
          <NumberInput label="Starting MRR" tooltip={FIELD_HELP.startingMRR} value={baseInputs.startingMRR} onChange={(value) => updateInput('startingMRR', value)} prefix="$" step={5000} />
          <NumberInput label="Average Annual Contract Value" tooltip={FIELD_HELP.averageAnnualContractValue} value={baseInputs.averageAnnualContractValue} onChange={(value) => updateInput('averageAnnualContractValue', value)} prefix="$" step={5000} />
          <NumberInput label="Current Gross Margin" tooltip={FIELD_HELP.grossMarginPct} value={baseInputs.grossMarginPct} onChange={(value) => updateInput('grossMarginPct', value)} suffix="%" step={1} />
          <NumberInput label="Monthly Fixed OpEx" tooltip={FIELD_HELP.monthlyFixedOpEx} value={baseInputs.monthlyFixedOpEx} onChange={(value) => updateInput('monthlyFixedOpEx', value)} prefix="$" step={2500} />
          <NumberInput label="Cash On Hand" tooltip={FIELD_HELP.cashOnHand} value={baseInputs.cashOnHand} onChange={(value) => updateInput('cashOnHand', value)} prefix="$" step={5000} />
        </SidebarSection>

        <SidebarSection
          title="Forward Plan"
          helper="Only the things you can actually push over the next few quarters belong here."
        >
          <NumberInput label="New Clients Per Month" tooltip={FIELD_HELP.newClientsPerMonth} value={baseInputs.newClientsPerMonth} onChange={(value) => updateInput('newClientsPerMonth', value)} step={0.25} />
          <NumberInput label="Target New Clients Per Month" tooltip={FIELD_HELP.targetNewClientsPerMonth} value={baseInputs.targetNewClientsPerMonth} onChange={(value) => updateInput('targetNewClientsPerMonth', value)} step={0.25} />
          <NumberInput label="Months To Reach Target" tooltip={FIELD_HELP.monthsToReachTargetNewClients} value={baseInputs.monthsToReachTargetNewClients} onChange={(value) => updateInput('monthsToReachTargetNewClients', Math.max(1, value))} suffix="mo" step={1} />
          <NumberInput label="Annual Churn" tooltip={FIELD_HELP.annualChurnPct} value={baseInputs.annualChurnPct} onChange={(value) => updateInput('annualChurnPct', value)} suffix="%" step={0.5} />
          <NumberInput label="Studios Attach Rate" tooltip={FIELD_HELP.studiosAttachRatePct} value={baseInputs.studiosAttachRatePct} onChange={(value) => updateInput('studiosAttachRatePct', value)} suffix="%" step={1} />
          <NumberInput label="Target Gross Margin" tooltip={FIELD_HELP.targetGrossMarginPct} value={baseInputs.targetGrossMarginPct} onChange={(value) => updateInput('targetGrossMarginPct', value)} suffix="%" step={1} />
        </SidebarSection>

        <SidebarSection
          title="Advanced Assumptions"
          helper="Keep this collapsed unless we need more fidelity around customer acquisition, servicing drag, or Capital."
        >
          <button
            onClick={() => setAdvancedOpen((open) => !open)}
            style={{
              background: 'var(--col-surface-2)',
              border: '1px solid var(--col-border)',
              color: 'var(--col-text-1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 12px',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {advancedOpen ? 'Hide Advanced Inputs' : 'Show Advanced Inputs'}
            </span>
            <span style={{ color: 'var(--col-accent)' }}>{advancedOpen ? '−' : '+'}</span>
          </button>

          {advancedOpen && (
            <div style={{ display: 'grid', gap: '12px' }}>
              <NumberInput label="CAC Per New Client" tooltip={FIELD_HELP.cacPerNewClient} value={baseInputs.cacPerNewClient} onChange={(value) => updateInput('cacPerNewClient', value)} prefix="$" step={250} />
              <NumberInput label="Monthly Servicing Cost Per Client" tooltip={FIELD_HELP.monthlyServicingCostPerClient} value={baseInputs.monthlyServicingCostPerClient} onChange={(value) => updateInput('monthlyServicingCostPerClient', value)} prefix="$" step={50} />
              <ToggleRow
                label="Capital Scenario"
                checked={baseInputs.acquisition.enabled}
                onChange={(value) => updateAcquisition('enabled', value)}
                helper="Keep off unless we want to see how deals affect pace and headroom."
                tooltip={CAPITAL_FIELD_HELP.enabled}
              />
              {baseInputs.acquisition.enabled && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  <NumberInput label="Deals Per Year" tooltip={CAPITAL_FIELD_HELP.dealsPerYear} value={baseInputs.acquisition.dealsPerYear} onChange={(value) => updateAcquisition('dealsPerYear', value)} step={0.5} />
                  <NumberInput label="Average Target ARR" tooltip={CAPITAL_FIELD_HELP.averageTargetARR} value={baseInputs.acquisition.averageTargetARR} onChange={(value) => updateAcquisition('averageTargetARR', value)} prefix="$" step={100000} />
                  <NumberInput label="Purchase Multiple" tooltip={CAPITAL_FIELD_HELP.purchaseMultiple} value={baseInputs.acquisition.purchaseMultiple} onChange={(value) => updateAcquisition('purchaseMultiple', value)} suffix="x" step={0.1} />
                  <NumberInput label="Integration Drag" tooltip={CAPITAL_FIELD_HELP.integrationDragPct} value={baseInputs.acquisition.integrationDragPct} onChange={(value) => updateAcquisition('integrationDragPct', value)} suffix="%" step={1} />
                  <NumberInput label="Integration Months" tooltip={CAPITAL_FIELD_HELP.integrationMonths} value={baseInputs.acquisition.integrationMonths} onChange={(value) => updateAcquisition('integrationMonths', Math.max(1, value))} suffix="mo" step={1} />
                  <NumberInput label="Capital Available" tooltip={CAPITAL_FIELD_HELP.capitalAvailableForDeals} value={baseInputs.acquisition.capitalAvailableForDeals} onChange={(value) => updateAcquisition('capitalAvailableForDeals', value)} prefix="$" step={250000} />
                </div>
              )}
            </div>
          )}
        </SidebarSection>

        <div style={{ padding: '18px', borderTop: '1px solid var(--col-border)', marginTop: '18px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--col-text-3)', marginBottom: '10px' }}>
            Current Reality Close
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            <SummaryCard label="Revenue" value={fmtMoneyShort(latestMonthlyActual.revenue)} helper={formatMonthLabel(latestMonthlyActual.month)} />
            <SummaryCard label="EBITDA" value={fmtMoneyShort(latestMonthlyActual.ebitda)} helper={`Active clients: ${fmtCount(latestMonthlyActual.activeClients)}`} />
          </div>
        </div>
      </aside>

      <main className="model-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '8px' }}>
              Goal. Reality. Projection.
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '44px', lineHeight: 0.98, letterSpacing: '-1.2px', color: 'var(--col-text-1)', marginBottom: '10px' }}>
              Are We Actually On Pace
            </h1>
            <p style={{ maxWidth: '820px', fontSize: '16px', lineHeight: 1.75, color: 'var(--col-text-2)' }}>
              The dashed line is fixed on-target pace to $250M ARR at 35 percent EBITDA margin. Reality is seeded weekly and monthly truth. The only thing you change here is the projection.
            </p>
            <p style={{ maxWidth: '820px', fontSize: '13px', lineHeight: 1.7, color: 'var(--col-text-3)', marginTop: '8px' }}>
              Weekly lives below in the operating view. These horizon buttons control the monthly financial pace and projection windows.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {(Object.keys(HORIZON_LABELS) as HorizonKey[]).map((horizon) => {
              const active = horizon === selectedHorizon
              return (
                <button
                  key={horizon}
                  onClick={() => setSelectedHorizon(horizon)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: active ? 'var(--col-accent-bg)' : 'transparent',
                    border: `1px solid ${active ? 'var(--col-accent-dim)' : 'var(--col-border)'}`,
                    color: active ? 'var(--col-accent)' : '#dbe5ee',
                    padding: '10px 12px',
                    cursor: 'pointer',
                  }}
                >
                  {HORIZON_LABELS[horizon]}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {(Object.keys(SCENARIO_LABELS) as ScenarioKey[]).map((scenario) => {
              const active = scenario === selectedScenario
              return (
                <SegmentedTooltipButton
                  key={scenario}
                  label={SCENARIO_LABELS[scenario]}
                  tooltip={SCENARIO_DESCRIPTIONS[scenario]}
                  active={active}
                  onClick={() => setSelectedScenario(scenario)}
                />
              )
            })}
          </div>

          <button
            onClick={resetScenario}
            style={{
              background: 'transparent',
              border: '1px solid var(--col-border)',
              color: 'var(--col-text-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '10px 12px',
              cursor: 'pointer',
            }}
          >
            Reset Base Assumptions
          </button>
        </div>

        <div style={{ display: 'grid', gap: '18px' }}>
          <Panel
            title="North Star"
            subtitle="The target line is fixed. This section answers whether the current operating path gets the firm back onto the long-range pace we committed to."
            right={<StatusPill status={status.overallStatus} />}
          >
            <LineChart
              title="Monthly ARR Pace"
              subtitle="Dashed is on-target pace. White is monthly reality. Cyan is the selected scenario projection."
              points={monthlyTimeline}
              series={arrChartSeries}
              yFormatter={fmtMoneyShort}
              markers={[...targetPaceEvents, ...events.arr]}
              markerValue={(month) => {
                if (targetPaceEvents.some((event) => event.month === month)) {
                  return targetArrAtMonth(snapshot.goal, month) / 12
                }
                const projectionPoint = projection.find((item) => item.month === month)
                if (projectionPoint) return projectionPoint.totalRevenue
                return targetArrAtMonth(snapshot.goal, month) / 12
              }}
            />

            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--col-text-3)', maxWidth: '820px' }}>
                ARR pace footnote: target at horizon <span style={{ color: 'var(--col-text-1)' }}>{fmtMoneyShort(status.targetArrAtTarget)}</span>. Projection at horizon <span style={{ color: 'var(--col-text-1)' }}>{fmtMoneyShort(status.projectedArrAtTarget)}</span>. Gap <span style={{ color: status.projectedArrGap >= 0 ? 'var(--col-accent)' : '#ff9ca6' }}>{fmtMoneyShort(status.projectedArrGap)}</span>.
                <div style={{ marginTop: '8px' }}>
                  Phase 2 ramp begins at month 24. That phase assumes Allenix has moved beyond early proof and starts compounding through stronger distribution, more delivery leverage, and the early shape of the broader platform.
                </div>
              </div>
              <StatusPill status={status.projectedArrStatus} />
            </div>
          </Panel>

          <div className="model-summary-grid">
            {northStarCards.map((card) => (
              <SummaryCard key={card.label} label={card.label} value={card.value} helper={card.helper} />
            ))}
          </div>

          <Panel
            title="How To Read This"
            subtitle="This cockpit is meant to remove ambiguity. The target never moves. Reality shows the latest weekly and monthly close. Projection is the editable path from here."
          >
            <div className="model-chart-grid">
              <div style={{ background: 'var(--col-surface-2)', border: '1px solid var(--col-border)', padding: '18px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--col-text-1)', marginBottom: '8px' }}>On-Target Pace</div>
                <div style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--col-text-2)' }}>
                  Fixed checkpoints. Month 24 at $9.6M ARR. Month 60 at $78M. Month 96 at $168M. Month 120 at $250M.
                </div>
              </div>
              <div style={{ background: 'var(--col-surface-2)', border: '1px solid var(--col-border)', padding: '18px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--col-text-1)', marginBottom: '8px' }}>Reality And Projection</div>
                <div style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--col-text-2)' }}>
                  White lines are reality. Cyan lines are the editable forecast. Weekly GTM and delivery signals help explain why the firm is ahead, on track, or behind.
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Weekly Operating View" subtitle="This is the leading-indicator layer. Mixed units are indexed to 100 where needed so GTM and delivery signals can live on one grid without pretending they are the same metric.">
            <div className="model-summary-grid" style={{ marginBottom: '18px', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
              <SummaryCard label="Qualified Pipeline" value={fmtMoneyShort(latestWeeklyActual.qualifiedPipeline)} helper={`Week ending ${formatWeekLabel(latestWeeklyActual.weekEnding)}`} />
              <SummaryCard label="New Opportunities" value={fmtCount(latestWeeklyActual.newOpportunities)} helper="Weekly GTM volume" />
              <SummaryCard label="Win Rate" value={fmtPercent(latestWeeklyActual.winRatePct)} helper="Leading close-quality signal" />
              <SummaryCard label="New Clients" value={fmtCount(latestWeeklyActual.newClients)} helper="Weekly adds" />
              <SummaryCard label="Delivery Health" value={fmtPercent(latestWeeklyActual.deliveryHealthPct)} helper="Operator team health signal" />
              <SummaryCard label="Active Clients" value={fmtCount(latestWeeklyActual.activeClients)} helper="Current delivery load" />
            </div>

            <div className="model-chart-grid">
              <LineChart
                title="Weekly GTM Health"
                subtitle="Shows whether demand creation and close quality are improving together."
                points={weeklyGtmPoints}
                series={weeklyGtmSeries}
                yFormatter={fmtPercent}
              />
              <LineChart
                title="Weekly Delivery Health"
                subtitle="Shows whether retention and operator load are still supporting compounding growth."
                points={weeklyGtmPoints}
                series={weeklyDeliverySeries}
                yFormatter={fmtPercent}
              />
            </div>
          </Panel>

          <Panel title="Monthly Financial View" subtitle="Monthly actuals and forward projection are shown together so revenue, gross profit, EBITDA, and cash stay tied to the same operating truth.">
            <div className="model-chart-grid">
              <LineChart
                title="Cash And EBITDA"
                subtitle="Cash gets only cash-relevant markers. EBITDA stays separate from purchase price and deal spend."
                points={monthlyTimeline}
                series={cashEbitdaSeries}
                yFormatter={fmtMoneyShort}
                markers={events.cash}
                markerValue={(month) => {
                  const projectionPoint = projection.find((item) => item.month === month)
                  if (!projectionPoint) return null
                  return projectionPoint.cashBalance
                }}
              />
              <Panel title="Monthly Actuals Vs Pace" subtitle="Reality closes are compared to the selected scenario and the fixed monthly pace line.">
                <DataTable
                  headers={['Month', 'Reality Rev', 'Gross Profit', 'Reality EBITDA', 'Reality Cash', 'Projection Rev', 'Target Rev']}
                  rows={monthlyRows}
                />
              </Panel>
            </div>
          </Panel>

          <Panel title="Projection" subtitle="This is the editable forward plan. It should feel like an operating decision surface, not a pitch deck spreadsheet.">
            <div className="model-chart-grid">
              <LineChart
                title="Projected Revenue Mix"
                subtitle="Firm-level first. Studios stays as attach revenue. Capital stays secondary unless the deal module is turned on."
                points={projectionTimeline}
                series={projectionMixSeries}
                yFormatter={fmtMoneyShort}
              />
              <Panel title="Projection Rollup" subtitle="These are actual projected monthly outputs from the selected scenario, not annualized snapshots.">
                <DataTable
                  headers={['Plan Month', 'Revenue', 'Gross Profit', 'EBITDA', 'EBITDA %', 'Cash', 'Clients']}
                  rows={projectionRows}
                />
              </Panel>
            </div>
          </Panel>

          <Panel title="Notes And Recommendations" subtitle="The recommendation engine is deliberately simple in v1. It looks for drift between pace, GTM health, delivery health, margin, and cash.">
            <div style={{ background: 'var(--col-surface-2)', border: '1px solid var(--col-border)', padding: '18px', marginBottom: '18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--col-accent)', marginBottom: '8px' }}>
                Latest operator note
              </div>
              <div style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--col-text-1)' }}>
                {latestWeeklyActual.note}
              </div>
            </div>

            <div className="model-events-grid">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.issue} recommendation={recommendation} />
              ))}
            </div>
          </Panel>
        </div>
      </main>
    </div>
  )
}
