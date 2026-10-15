import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MAX_SYNC_BYTES = 250_000
const ROADMAP_PREFIX = 'chaduvuko_rm_'
const ALLOWED_KEYS = new Set([
  'chaduvuko_learning_progress',
  'chaduvuko_dashboard_weekly_goal',
  'chaduvuko_project_progress',
  'chaduvuko_practice_progress',
])

function getUserClient(req: NextRequest) {
  const token = req.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!token) return { error: NextResponse.json({ error: 'Sign in to sync your learning progress.' }, { status: 401 }) }
  if (!url || !anonKey) return { error: NextResponse.json({ error: 'Progress sync is not configured.' }, { status: 503 }) }

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return { client }
}

function validProgress(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const entries = Object.entries(value)
  return entries.length <= 80 && entries.every(([key]) =>
    ALLOWED_KEYS.has(key) || (key.startsWith(ROADMAP_PREFIX) && /^chaduvuko_rm_[a-z0-9_-]{1,100}$/i.test(key)),
  )
}

export async function GET(req: NextRequest) {
  const { client, error } = getUserClient(req)
  if (error) return error
  const { data: authData, error: authError } = await client!.auth.getUser()
  if (authError || !authData.user) return NextResponse.json({ error: 'Your sign-in session expired. Please sign in again.' }, { status: 401 })

  const { data, error: readError } = await client!
    .from('learner_progress')
    .select('progress_state')
    .eq('user_id', authData.user.id)
    .maybeSingle()
  if (readError) {
    console.error('Learner progress read failed:', readError.message)
    return NextResponse.json({ error: 'Could not load synced progress.' }, { status: 500 })
  }
  return NextResponse.json({ progress: data?.progress_state ?? {} })
}

export async function PUT(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_SYNC_BYTES)
    return NextResponse.json({ error: 'The saved progress data is too large to sync.' }, { status: 413 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Could not read the progress sync request.' }, { status: 400 })
  }
  const progress = (body as { progress?: unknown } | null)?.progress
  if (!validProgress(progress) || new TextEncoder().encode(JSON.stringify(progress)).byteLength > MAX_SYNC_BYTES)
    return NextResponse.json({ error: 'The progress sync data is invalid or too large.' }, { status: 400 })

  const { client, error } = getUserClient(req)
  if (error) return error
  const { data: authData, error: authError } = await client!.auth.getUser()
  if (authError || !authData.user) return NextResponse.json({ error: 'Your sign-in session expired. Please sign in again.' }, { status: 401 })

  const { error: writeError } = await client!
    .from('learner_progress')
    .upsert({ user_id: authData.user.id, progress_state: progress, updated_at: new Date().toISOString() })
  if (writeError) {
    console.error('Learner progress write failed:', writeError.message)
    return NextResponse.json({ error: 'Could not save synced progress.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
