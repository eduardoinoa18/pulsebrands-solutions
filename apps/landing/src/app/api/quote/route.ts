import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

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
  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Company/Name:</strong> ${company}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Details:</strong><br/>${details.replace(/\n/g, '<br/>')}</p>
  `

  try {
    const gmailUser = process.env.EMAIL_USER
    const gmailPass = process.env.EMAIL_PASS
    if (gmailUser && gmailPass) {
      const nodemailer = (await import('nodemailer')).default
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      })
      await transporter.sendMail({
        from: `PulseBrand <${gmailUser}>`,
        to,
        subject,
        text,
        html,
      })
    } else if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = process.env.RESEND_FROM || 'PulseBrand <notify@pulsebrandsolutions.com>'
      await resend.emails.send({ to, from, subject, text, html })
    } else {
      console.log('[QUOTE EMAIL]', { to, subject, text })
    }
  } catch (e) {
    console.error('QUOTE SEND ERROR', e)
    return NextResponse.json({ ok: false, error: 'Failed to submit request' }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/?submitted=1', request.url))
}
