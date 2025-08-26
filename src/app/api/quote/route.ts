import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const website = String(formData.get('website') || '')
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const company = String(formData.get('company') || formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const phone = String(formData.get('phone') || '')
  const service = String(formData.get('service') || 'General')
  const details = String(formData.get('details') || formData.get('message') || '')

  if (!company || !email || !service || !details) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const inboxRaw = process.env.QUOTE_INBOX?.toString() || 'pulsebrandsolution@gmail.com, eduardoinoa18@gmail.com'
  const to = inboxRaw.split(',').map((s) => s.trim()).filter(Boolean)

  const subject = `New Quote Request — ${company}`
  const text = `New Quote Request\n\nCompany/Name: ${company}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDetails: ${details}`

  try {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM || 'PulseBrand <notify@pulsebrandsolutions.com>'

    if (apiKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({ to, from, subject, text })
    } else {
      console.log('[QUOTE EMAIL]', { to, subject, text })
    }
  } catch (e) {
    console.error('QUOTE SEND ERROR', e)
    return NextResponse.json({ ok: false, error: 'Failed to submit request' }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/?submitted=1', request.url))
}
