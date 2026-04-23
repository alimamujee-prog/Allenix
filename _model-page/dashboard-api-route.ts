import { NextResponse } from 'next/server'

import { getOperatorCockpitSeed } from '../../../data/operatorCockpit'

export async function GET() {
  return NextResponse.json(getOperatorCockpitSeed())
}
