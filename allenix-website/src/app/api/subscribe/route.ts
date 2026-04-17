import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT = 3
const WINDOW_SECONDS = 3600

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = (body?.email ?? '').trim().toLowerCase()

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Use Vercel KV if available, otherwise just return ok (local dev)
    if (process.env.KV_REST_API_URL) {
      const { kv } = await import('@vercel/kv')

      const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        req.headers.get('x-real-ip') ??
        'unknown'

      const rateLimitKey = `rl:subscribe:${ip}`
      const attempts = await kv.incr(rateLimitKey)
      if (attempts === 1) {
        await kv.expire(rateLimitKey, WINDOW_SECONDS)
      }
      if (attempts > RATE_LIMIT) {
        return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
      }

      await kv.set(`subscriber:${email}`, {
        email,
        ip,
        subscribedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('subscribe error', err)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}
