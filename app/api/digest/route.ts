import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Call this via a cron job or manually — sends weekly digest to all subscribers
export async function POST(req: NextRequest) {
  // Simple auth check
  const auth = req.headers.get('authorization')
  if (auth !== 'Bearer ' + process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get all subscribers
  const { data: subscribers } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('email, name')

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asil-site.vercel.app'

  const html = `
    <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e;">
      <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 4px;">
        As<span style="color: #0078d4">il</span>
      </h1>
      <p style="font-size: 12px; color: #999; margin-bottom: 32px; font-family: monospace;">
        Weekly Data Engineering Digest
      </p>

      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">This week on the site</h2>
      <p style="color: #555; line-height: 1.7; margin-bottom: 24px;">
        New content, updated tutorials, and things worth knowing for your data engineering journey.
      </p>

      <div style="border-left: 3px solid #0078d4; padding-left: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">Featured: Interview Prep</h3>
        <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 8px;">
          27 real questions with full answers — SQL window functions, PySpark transformations, system design, and behavioral. Grouped by topic with difficulty levels.
        </p>
        <a href="${siteUrl}/learn/interview" style="color: #0078d4; font-size: 13px; font-family: monospace;">
          Read it →
        </a>
      </div>

      <div style="border-left: 3px solid #00c2ff; padding-left: 16px; margin-bottom: 32px;">
        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">Tip of the week</h3>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          RANK() vs DENSE_RANK() — this comes up in almost every SQL interview. RANK() skips numbers after a tie (1, 2, 2, 4). DENSE_RANK() does not (1, 2, 2, 3). Know the difference cold.
        </p>
      </div>

      <a href="${siteUrl}/learn/roadmap"
        style="display: inline-block; background: #0078d4; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 32px;">
        Continue learning →
      </a>

      <p style="font-size: 12px; color: #bbb; border-top: 1px solid #eee; padding-top: 20px; font-family: monospace;">
        Built by Asil · Free forever · 
        <a href="${siteUrl}" style="color: #bbb;">asil-site.vercel.app</a>
      </p>
    </div>
  `

  let sent = 0
  for (const sub of subscribers) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Asil <onboarding@resend.dev>',
          to: sub.email,
          subject: 'Weekly digest — Data Engineering',
          html,
        }),
      })
      sent++
    } catch {}
  }

  return NextResponse.json({ sent, total: subscribers.length })
}