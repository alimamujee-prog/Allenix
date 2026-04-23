export type ScenarioKey = 'base' | 'upside' | 'downside'
export type HorizonKey = '3m' | '6m' | '12m' | '36m' | '60m' | '120m'

export interface GoalCheckpoint {
  month: number
  value: number
}

export interface GoalConfig {
  targetArr: number
  targetEbitdaMargin: number
  arrCheckpoints: GoalCheckpoint[]
  marginCheckpoints: GoalCheckpoint[]
}

export interface WeeklyActual {
  weekEnding: string
  pipeline: number
  qualifiedPipeline: number
  newOpportunities: number
  winRatePct: number
  newClients: number
  churnedClients: number
  activeClients: number
  deliveryHealthPct: number
  note?: string
}

export interface MonthlyActual {
  month: string
  planMonth: number
  revenue: number
  grossProfit: number
  ebitda: number
  cashBalance: number
  activeClients: number
}

export interface AcquisitionScenario {
  enabled: boolean
  dealsPerYear: number
  averageTargetARR: number
  purchaseMultiple: number
  integrationDragPct: number
  integrationMonths: number
  capitalAvailableForDeals: number
}

export interface ProjectionInputs {
  startingMRR: number
  averageAnnualContractValue: number
  newClientsPerMonth: number
  targetNewClientsPerMonth: number
  monthsToReachTargetNewClients: number
  annualChurnPct: number
  studiosAttachRatePct: number
  grossMarginPct: number
  targetGrossMarginPct: number
  monthlyFixedOpEx: number
  cashOnHand: number
  cacPerNewClient: number
  monthlyServicingCostPerClient: number
  acquisition: AcquisitionScenario
}

export interface ProjectionMonth {
  month: number
  label: string
  activeClients: number
  newClients: number
  churnedClients: number
  coreRevenue: number
  studiosRevenue: number
  portfolioRevenue: number
  totalRevenue: number
  grossProfit: number
  ebitda: number
  ebitdaMarginPct: number
  cashBalance: number
  dealsClosedThisMonth: number
  totalDealsClosed: number
  acquisitionSpend: number
  capitalRemaining: number
}

export interface DashboardRecommendation {
  issue: string
  why: string
  checks: string[]
  severity: 'stable' | 'watch' | 'action'
}

export interface DashboardStatus {
  currentPlanMonth: number
  targetPlanMonth: number
  actualArrNow: number
  targetArrNow: number
  actualArrGap: number
  actualArrStatus: 'ahead' | 'on-track' | 'behind'
  projectedArrAtTarget: number
  targetArrAtTarget: number
  projectedArrGap: number
  projectedArrStatus: 'ahead' | 'on-track' | 'behind'
  actualMarginNow: number
  projectedMarginAtTarget: number
  overallStatus: 'ahead' | 'on-track' | 'behind'
}

export interface DashboardSeedSnapshot {
  goal: GoalConfig
  actuals: {
    weekly: WeeklyActual[]
    monthly: MonthlyActual[]
  }
  projectionDefaults: Record<ScenarioKey, ProjectionInputs>
  defaultScenario: ScenarioKey
  defaultHorizon: HorizonKey
  generatedAt: string
}

export interface NarrativeEvent {
  month: number
  title: string
  detail: string
  chart: 'arr' | 'cash'
  tone: 'positive' | 'neutral' | 'caution'
}

export const HORIZON_MONTHS: Record<HorizonKey, number> = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
  '36m': 36,
  '60m': 60,
  '120m': 120,
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * clamp(t, 0, 1)
}

function interpolateCheckpoints(checkpoints: GoalCheckpoint[], month: number) {
  const sorted = [...checkpoints].sort((left, right) => left.month - right.month)
  if (sorted.length === 0) return 0
  if (month <= sorted[0].month) return sorted[0].value

  for (let index = 0; index < sorted.length - 1; index++) {
    const current = sorted[index]
    const next = sorted[index + 1]
    if (month <= next.month) {
      const span = Math.max(1, next.month - current.month)
      return lerp(current.value, next.value, (month - current.month) / span)
    }
  }

  return sorted[sorted.length - 1].value
}

export function targetArrAtMonth(goal: GoalConfig, month: number) {
  return interpolateCheckpoints(goal.arrCheckpoints, month)
}

export function targetMarginAtMonth(goal: GoalConfig, month: number) {
  return interpolateCheckpoints(goal.marginCheckpoints, month)
}

export function statusFromRatio(projected: number, target: number, tolerance = 0.9) {
  if (target <= 0) return 'on-track' as const
  const ratio = projected / target
  if (ratio >= 1.05) return 'ahead' as const
  if (ratio >= tolerance) return 'on-track' as const
  return 'behind' as const
}

export function buildProjectionForecast(
  inputs: ProjectionInputs,
  startPlanMonth: number,
  endPlanMonth: number
) {
  const monthlyContractValue = inputs.averageAnnualContractValue > 0 ? inputs.averageAnnualContractValue / 12 : 0
  const maxPlanMonth = Math.max(startPlanMonth, endPlanMonth)
  const forecast: ProjectionMonth[] = []

  let activeClients = monthlyContractValue > 0 ? inputs.startingMRR / monthlyContractValue : 0
  let cashBalance = inputs.cashOnHand
  let capitalRemaining = Math.max(0, inputs.acquisition.capitalAvailableForDeals)
  let totalDealsClosed = 0
  let dealAccumulator = 0
  const acquisitionPrice = inputs.acquisition.averageTargetARR * inputs.acquisition.purchaseMultiple
  const integrationWindow = Math.max(1, Math.round(inputs.acquisition.integrationMonths))
  const startingPortfolioCohorts: Array<{ arr: number; age: number }> = []

  for (let planMonth = startPlanMonth; planMonth <= maxPlanMonth; planMonth++) {
    const step = planMonth - startPlanMonth
    const rampDenominator = Math.max(inputs.monthsToReachTargetNewClients - 1, 1)
    const growthRamp = inputs.monthsToReachTargetNewClients <= 1 ? 1 : clamp(Math.max(0, step - 1) / rampDenominator, 0, 1)
    const newClients = step === 0 ? 0 : Math.max(0, lerp(inputs.newClientsPerMonth, inputs.targetNewClientsPerMonth, growthRamp))
    const churnedClients = step === 0 ? 0 : activeClients * Math.max(0, inputs.annualChurnPct) / 12 / 100

    if (step > 0) {
      activeClients = Math.max(0, activeClients + newClients - churnedClients)
    }

    let dealsClosedThisMonth = 0
    if (step > 0 && inputs.acquisition.enabled && acquisitionPrice > 0) {
      dealAccumulator += Math.max(0, inputs.acquisition.dealsPerYear) / 12
      const scheduledDealsByNow = Math.floor(dealAccumulator + 1e-9)
      let dealsToClose = Math.max(0, scheduledDealsByNow - totalDealsClosed)

      while (dealsToClose > 0 && capitalRemaining >= acquisitionPrice) {
        capitalRemaining -= acquisitionPrice
        totalDealsClosed += 1
        dealsClosedThisMonth += 1
        startingPortfolioCohorts.push({ arr: inputs.acquisition.averageTargetARR, age: 0 })
        dealsToClose -= 1
      }
    }

    const coreRevenue = activeClients * monthlyContractValue
    const studiosRevenue = coreRevenue * Math.max(0, inputs.studiosAttachRatePct) / 100
    const marginT = maxPlanMonth === startPlanMonth ? 1 : (planMonth - startPlanMonth) / Math.max(1, maxPlanMonth - startPlanMonth)
    const grossMarginPct = clamp(lerp(inputs.grossMarginPct, inputs.targetGrossMarginPct, marginT), 0, 95)
    const dragMultiplier = 1 - clamp(inputs.acquisition.integrationDragPct, 0, 100) / 100

    const portfolioRevenue = startingPortfolioCohorts.reduce((sum, cohort) => {
      const recoveryT = integrationWindow <= 1 ? 1 : clamp(cohort.age / (integrationWindow - 1), 0, 1)
      const realizedShare = lerp(dragMultiplier, 1, recoveryT)
      return sum + (cohort.arr / 12) * realizedShare
    }, 0)

    const totalRevenue = coreRevenue + studiosRevenue + portfolioRevenue
    const grossProfit = totalRevenue * grossMarginPct / 100
    const servicingCost = activeClients * Math.max(0, inputs.monthlyServicingCostPerClient)
    const cacSpend = newClients * Math.max(0, inputs.cacPerNewClient)
    const ebitda = grossProfit - Math.max(0, inputs.monthlyFixedOpEx) - servicingCost - cacSpend
    const ebitdaMarginPct = totalRevenue > 0 ? (ebitda / totalRevenue) * 100 : 0

    if (step > 0) {
      cashBalance += ebitda
    }

    startingPortfolioCohorts.forEach((cohort) => {
      cohort.age += 1
    })

    forecast.push({
      month: planMonth,
      label: step === 0 ? 'Now' : `+${step}`,
      activeClients,
      newClients,
      churnedClients,
      coreRevenue,
      studiosRevenue,
      portfolioRevenue,
      totalRevenue,
      grossProfit,
      ebitda,
      ebitdaMarginPct,
      cashBalance,
      dealsClosedThisMonth,
      totalDealsClosed,
      acquisitionSpend: dealsClosedThisMonth * acquisitionPrice,
      capitalRemaining,
    })
  }

  return forecast
}

export function buildDashboardStatus(
  goal: GoalConfig,
  actuals: MonthlyActual[],
  forecast: ProjectionMonth[],
  selectedHorizon: HorizonKey
) {
  const latestActual = actuals[actuals.length - 1]
  const currentPlanMonth = latestActual.planMonth
  const targetPlanMonth = Math.min(goal.arrCheckpoints[goal.arrCheckpoints.length - 1]?.month ?? currentPlanMonth, currentPlanMonth + HORIZON_MONTHS[selectedHorizon])
  const projectionPoint = forecast.find((month) => month.month === targetPlanMonth) ?? forecast[forecast.length - 1]
  const actualArrNow = latestActual.revenue * 12
  const targetArrNow = targetArrAtMonth(goal, currentPlanMonth)
  const projectedArrAtTarget = projectionPoint.totalRevenue * 12
  const targetArrAtTarget = targetArrAtMonth(goal, targetPlanMonth)
  const actualMarginNow = latestActual.revenue > 0 ? (latestActual.ebitda / latestActual.revenue) * 100 : 0
  const projectedMarginAtTarget = projectionPoint.ebitdaMarginPct

  const actualArrStatus = statusFromRatio(actualArrNow, targetArrNow)
  const projectedArrStatus = statusFromRatio(projectedArrAtTarget, targetArrAtTarget)

  let overallStatus: DashboardStatus['overallStatus'] = 'on-track'
  if ([actualArrStatus, projectedArrStatus].includes('behind')) {
    overallStatus = 'behind'
  } else if (projectedArrStatus === 'ahead') {
    overallStatus = 'ahead'
  }

  return {
    currentPlanMonth,
    targetPlanMonth,
    actualArrNow,
    targetArrNow,
    actualArrGap: actualArrNow - targetArrNow,
    actualArrStatus,
    projectedArrAtTarget,
    targetArrAtTarget,
    projectedArrGap: projectedArrAtTarget - targetArrAtTarget,
    projectedArrStatus,
    actualMarginNow,
    projectedMarginAtTarget,
    overallStatus,
  }
}

export function buildRecommendations(
  status: DashboardStatus,
  weeklyActuals: WeeklyActual[],
  forecast: ProjectionMonth[]
) {
  const recommendations: DashboardRecommendation[] = []
  const latestWeekly = weeklyActuals[weeklyActuals.length - 1]
  const priorWeekly = weeklyActuals[Math.max(0, weeklyActuals.length - 2)]
  const lowCashPoint = forecast.reduce((lowest, current) => current.cashBalance < lowest.cashBalance ? current : lowest, forecast[0])
  const endPoint = forecast[forecast.length - 1]
  const gtmWeak =
    latestWeekly.qualifiedPipeline < priorWeekly.qualifiedPipeline * 0.92 ||
    latestWeekly.winRatePct < 22 ||
    latestWeekly.newOpportunities < 4
  const deliveryWeak =
    latestWeekly.deliveryHealthPct < 72 ||
    latestWeekly.churnedClients > latestWeekly.newClients ||
    latestWeekly.activeClients > priorWeekly.activeClients + 2
  const marginWeak = endPoint.ebitdaMarginPct < 15 && status.projectedArrStatus !== 'behind'
  const cashWeak = lowCashPoint.cashBalance < 0 || endPoint.cashBalance < 0

  if (status.projectedArrStatus === 'behind' && gtmWeak) {
    recommendations.push({
      issue: 'GTM is the first likely constraint.',
      why: 'Projected ARR pace is behind target and weekly demand signals are soft at the same time.',
      checks: ['Review qualified pipeline by stage.', 'Check whether win rate fell before opportunity volume did.', 'Inspect which channel is no longer feeding operator-fit demand.'],
      severity: 'action',
    })
  }

  if (status.projectedArrStatus === 'behind' && deliveryWeak) {
    recommendations.push({
      issue: 'Retention and delivery need attention.',
      why: 'The pace line is slipping while churn pressure and delivery strain are both visible in weekly reality.',
      checks: ['Audit the last two churn or downgrade events.', 'Check implementation completion times.', 'Confirm the current client load per operator is still healthy.'],
      severity: 'action',
    })
  }

  if (marginWeak) {
    recommendations.push({
      issue: 'Margin is lagging growth.',
      why: 'Revenue can get closer to pace while EBITDA still misses the 35 percent north star path.',
      checks: ['Review pricing against current scope creep.', 'Check servicing cost per client by cohort.', 'Look for delivery work that should become Magnolia-assisted or templated.'],
      severity: 'watch',
    })
  }

  if (cashWeak) {
    recommendations.push({
      issue: 'Cash discipline is still a watch item.',
      why: 'The forecast spends part of the horizon below zero even before the north star is reached.',
      checks: ['Recheck monthly fixed overhead.', 'Stress test the new-client ramp against a slower sales quarter.', 'Decide whether financing or cost reset is the cleaner bridge.'],
      severity: 'action',
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      issue: 'The operating picture is stable.',
      why: 'Projection pace is broadly in range and the recent weekly signals are not flashing a clear constraint.',
      checks: ['Keep watching qualified pipeline coverage.', 'Keep delivery health above 80.', 'Revisit the north star gap after the next monthly close.'],
      severity: 'stable',
    })
  }

  return recommendations.slice(0, 3)
}

export function buildNarrativeEvents(goal: GoalConfig, forecast: ProjectionMonth[]) {
  const arrEvents: NarrativeEvent[] = []
  const cashEvents: NarrativeEvent[] = []

  const breakevenMonth = forecast.find((month) => month.month > forecast[0].month && month.ebitda >= 0)
  if (breakevenMonth) {
    cashEvents.push({
      month: breakevenMonth.month,
      title: 'EBITDA turns positive',
      detail: `Operating earnings turn positive in plan month ${breakevenMonth.month}.`,
      chart: 'cash',
      tone: 'positive',
    })
  }

  const lowCashMonth = forecast.reduce((lowest, current) => current.cashBalance < lowest.cashBalance ? current : lowest, forecast[0])
  if (lowCashMonth.cashBalance < forecast[0].cashBalance) {
    cashEvents.push({
      month: lowCashMonth.month,
      title: 'Cash low point',
      detail: `Cash reaches ${Math.round(lowCashMonth.cashBalance).toLocaleString('en-US')} in plan month ${lowCashMonth.month}.`,
      chart: 'cash',
      tone: lowCashMonth.cashBalance < 0 ? 'caution' : 'neutral',
    })
  }

  const nextCheckpoint = goal.arrCheckpoints.find((checkpoint) =>
    checkpoint.month >= forecast[0].month && forecast.some((month) => month.month >= checkpoint.month && month.totalRevenue * 12 >= checkpoint.value)
  )

  if (nextCheckpoint) {
    arrEvents.push({
      month: nextCheckpoint.month,
      title: 'Checkpoint reached',
      detail: `Projection reaches the ${Math.round(nextCheckpoint.value / 1000000)}M ARR checkpoint.`,
      chart: 'arr',
      tone: 'positive',
    })
  }

  const churnPressure = forecast.find((month) => month.month > forecast[0].month && month.churnedClients >= month.newClients * 0.65 && month.churnedClients > 0.35)
  if (churnPressure) {
    arrEvents.push({
      month: churnPressure.month,
      title: 'Churn pressure shows up',
      detail: `Client attrition starts eroding the monthly net-add picture in plan month ${churnPressure.month}.`,
      chart: 'arr',
      tone: 'caution',
    })
  }

  return {
    arr: arrEvents.slice(0, 2),
    cash: cashEvents.slice(0, 2),
  }
}
