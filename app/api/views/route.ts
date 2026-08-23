import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const { data } = await supabaseAdmin
    .from('page_views').select('views').eq('slug', slug).maybeSingle()
  return NextResponse.json({ views: data?.views || 0 })
}

export async function POST(req: NextRequest) {
  const { slug } = await req.json()
  if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 })

  // Atomic upsert-and-increment (see supabase/migrations/20260823_increment_page_view.sql) —
  // the previous select-then-update here lost increments under concurrent requests.
  const { data, error } = await supabaseAdmin.rpc('increment_page_view', { p_slug: slug })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ views: data })
}
