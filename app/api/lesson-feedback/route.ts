import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const CATEGORIES = new Set(['helpful', 'unclear', 'incorrect'])
const MAX_REQUEST_BYTES = 8_192

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return NextResponse.json({ error: 'Lesson feedback is not available right now.' }, { status: 503 })

  const contentLength = Number(req.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES)
    return NextResponse.json({ error: 'The feedback request is too large.' }, { status: 413 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Could not read your feedback.' }, { status: 400 })
  }

  const input = body && typeof body === 'object' ? body as Record<string, unknown> : {}
  if (typeof input.website === 'string' && input.website.trim()) return NextResponse.json({ ok: true })

  const lessonHref = typeof input.lessonHref === 'string' ? input.lessonHref.trim() : ''
  const category = typeof input.category === 'string' ? input.category : ''
  const details = typeof input.details === 'string' ? input.details.trim() : ''
  if (!lessonHref.startsWith('/learn/') || lessonHref.length > 300)
    return NextResponse.json({ error: 'Choose a valid lesson before sending feedback.' }, { status: 400 })
  if (!CATEGORIES.has(category))
    return NextResponse.json({ error: 'Choose a feedback category.' }, { status: 400 })
  if (details.length > 1000)
    return NextResponse.json({ error: 'Please keep your feedback under 1,000 characters.' }, { status: 400 })

  const { error } = await supabaseAdmin.from('lesson_feedback').insert({
    lesson_href: lessonHref,
    category,
    details: details || null,
  })
  if (error) {
    console.error('Lesson feedback save failed:', error.message)
    return NextResponse.json({ error: 'We could not save your feedback. Please try again later.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
