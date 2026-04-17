import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, revenue, message } = body

    if (!name || !email || !EMAIL_RE.test(email) || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Allenix Contact Form <contact@allenix.com>',
      to: 'ali@allenix.com',
      replyTo: email,
      subject: `New inquiry — ${name}${company ? ` · ${company}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; color: #0d0d0d;">
          <h2 style="font-size: 22px; margin-bottom: 4px;">New inquiry from ${name}</h2>
          <p style="color: #555; font-size: 14px; margin-top: 0;">Submitted via allenix.com/contact</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding: 8px 0; color: #555; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00c8b4;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #555;">Firm</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            ${revenue ? `<tr><td style="padding: 8px 0; color: #555;">Revenue</td><td style="padding: 8px 0;">${revenue}</td></tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <p style="font-size: 15px; color: #555; margin-bottom: 8px;">What breaks first if they step away:</p>
          <p style="font-size: 16px; line-height: 1.7; background: #f5f5f5; padding: 16px 20px; border-left: 3px solid #00c8b4;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact route error', err)
    return NextResponse.json({ error: 'Failed to send. Please email ali@allenix.com directly.' }, { status: 500 })
  }
}
