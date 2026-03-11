import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()
  if (!email || !email.includes('@'))
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .upsert(
      { email: email.toLowerCase(), name: name || null, subscribed_at: new Date().toISOString() },
      { onConflict: 'email' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asil-site.vercel.app'
  const greeting = name ? name : 'there'

  const html = [
    '<div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e;">',
    '<h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">As<span style="color: #0078d4">il</span></h1>',
    '<p style="font-size: 16px; line-height: 1.7; color: #444;">Hey ' + greeting + ' 👋</p>',
    '<p style="font-size: 16px; line-height: 1.7; color: #444;">You are now subscribed to free data engineering content — tutorials, career tips, and updates on the modern data stack.</p>',
    '<p style="font-size: 16px; line-height: 1.7; color: #444;">Start here if you have not already:</p>',
    '<a href="' + siteUrl + '/learn/roadmap" style="display: inline-block; background: #0078d4; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 8px 0;">Data Engineering Roadmap 2026 &rarr;</a>',
    '<p style="font-size: 13px; color: #999; margin-top: 40px;">Built by Asil &middot; Free forever &middot; No spam</p>',
    '</div>',
  ].join('\n')

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Asil <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome — you are on the list',
        html,
      }),
    })
  } catch {}

  return NextResponse.json({ ok: true })
}