import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_SLUGS = new Set(PLANNED_TRACKS.map(track => track.slug))

export async function POST(req: NextRequest) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload))
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const body = payload as Record<string, unknown>

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const track = typeof body.track === 'string' ? body.track : ''
  if (email.length > 254 || !EMAIL_RE.test(email))
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  if (!VALID_SLUGS.has(track))
    return NextResponse.json({ error: 'Unknown track.' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('track_interest')
    .upsert({ email, track_slug: track }, { onConflict: 'email,track_slug' })

  if (error) {
    console.error('Track interest save failed:', error.message)
    return NextResponse.json({ error: 'Could not save your request. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
