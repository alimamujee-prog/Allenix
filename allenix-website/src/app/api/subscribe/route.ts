import { NextRequest, NextResponse } from 'next/server'

// Vercel KV import — works on Vercel deployment
// Falls back to in-memory Set for local dev
let kv: { sadd: (key: string, val: string) => Promise<number>; sismember: (key: string, val: string) => Promise<number> } | null = null

async function getKv() {
  if (kv) return kv
  try {
    const mod = await import('@vercel/kv')
    kv = mod.kv
    return kv
  } catch {
    return null
  }
}

// In-memory fallback for local dev
const localSubscribers = new Set<string>()

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body

  // Validation
  if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()

  const store = await getKv()

  if (store) {
    // Check duplicate
    const exists = await store.sismember('subscribers', normalized)
    if (exists) {
      return NextResponse.json({ ok: true, message: 'Already subscribed.' })
    }
    await store.sadd('subscribers', normalized)
  } else {
    // Local dev fallback
    if (localSubscribers.has(normalized)) {
      return NextResponse.json({ ok: true, message: 'Already subscribed.' })
    }
    localSubscribers.add(normalized)
  }

  return NextResponse.json({ ok: true })
}
