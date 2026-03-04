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

  const { data: existing } = await supabaseAdmin
    .from('page_views').select('id, views').eq('slug', slug).maybeSingle()

  if (existing) {
    await supabaseAdmin.from('page_views')
      .update({ views: existing.views + 1 }).eq('id', existing.id)
    return NextResponse.json({ views: existing.views + 1 })
  } else {
    await supabaseAdmin.from('page_views').insert({ slug, views: 1 })
    return NextResponse.json({ views: 1 })
  }
}