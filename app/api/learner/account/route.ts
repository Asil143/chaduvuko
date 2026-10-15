import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(req: NextRequest) {
  const token = req.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!token) return NextResponse.json({ error: 'Sign in to delete your learner account.' }, { status: 401 })
  if (!url || !anonKey) return NextResponse.json({ error: 'Learner accounts are not configured.' }, { status: 503 })
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: 'Account deletion is not configured.' }, { status: 503 })

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data, error } = await client.auth.getUser()
  if (error || !data.user) return NextResponse.json({ error: 'Your sign-in session expired. Please sign in again.' }, { status: 401 })

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(data.user.id)
  if (deleteError) {
    console.error('Learner account deletion failed:', deleteError.message)
    return NextResponse.json({ error: 'Could not delete your account. Please try again or contact support.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
