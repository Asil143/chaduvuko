import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function readSlug(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const slug = value.trim()
  return slug.length > 0 && slug.length <= 300 ? slug : null
}

export async function GET(req: NextRequest) {
  const slug = readSlug(req.nextUrl.searchParams.get('slug'))
  if (!slug) return NextResponse.json({ error: 'A valid slug is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('page_views')
    .select('views')
    .eq('slug', slug)
    .maybeSingle()
  if (error) {
    console.error('Page view lookup failed:', error.message)
    return NextResponse.json({ error: 'Could not retrieve page views.' }, { status: 500 })
  }

  return NextResponse.json({ views: data?.views ?? 0 })
}

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null)
  const slug = body && typeof body === 'object' && 'slug' in body ? readSlug(body.slug) : null
  if (!slug) return NextResponse.json({ error: 'A valid slug is required.' }, { status: 400 })

  // Increment atomically so concurrent page visits cannot overwrite one another.
  const { data, error } = await supabaseAdmin.rpc('increment_page_view', { p_slug: slug })
  if (error) {
    console.error('Page view increment failed:', error.message)
    return NextResponse.json({ error: 'Could not record this page view.' }, { status: 500 })
  }

  return NextResponse.json({ views: data })
}
