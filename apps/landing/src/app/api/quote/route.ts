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

  // Prepare confirmation email to the submitter
  const confirmSubject = 'We received your request — PulseBrand Solutions'
  const confirmText = `Hi ${company},\n\nThanks for reaching out to PulseBrand Solutions! We received your request for ${service}. Our team will get back to you shortly.\n\nHere is a copy of your message:\n${details}\n\n— PulseBrand Team`
  const confirmHtml = `
    <p>Hi ${company},</p>
    <p>Thanks for reaching out to <strong>PulseBrand Solutions</strong>! We received your request for <strong>${service}</strong>. Our team will get back to you shortly.</p>
    <p><strong>Your message:</strong></p>
    <blockquote style="margin:0;padding:12px;border-left:4px solid #ccc;background:#f9f9f9;">${details.replace(/\n/g, '<br/>')}</blockquote>
    <p>— PulseBrand Team</p>
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

      // Send confirmation to submitter
      if (email.includes('@')) {
        await transporter.sendMail({
          from: `PulseBrand <${gmailUser}>`,
          to: email,
          subject: confirmSubject,
          text: confirmText,
          html: confirmHtml,
        })
      }
    } else if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = process.env.RESEND_FROM || 'PulseBrand <notify@pulsebrandsolutions.com>'
      await resend.emails.send({ to, from, subject, text, html })

      // Send confirmation to submitter
      if (email.includes('@')) {
        await resend.emails.send({
          to: email,
          from,
          subject: confirmSubject,
          text: confirmText,
          html: confirmHtml,
        })
      }
    } else {
      console.log('[QUOTE EMAIL]', { to, subject, text })
      console.log('[QUOTE CONFIRMATION NOT SENT - no provider configured]', { email })
    }
  } catch (e) {
    console.error('QUOTE SEND ERROR', e)
    return NextResponse.json({ ok: false, error: 'Failed to submit request' }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/?submitted=1', request.url))
}
