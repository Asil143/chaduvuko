import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get('key')
  if (auth !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabaseAdmin
    .from('comments')
    .select('*')
    .eq('is_flagged', true)
    .order('created_at', { ascending: false })

  return NextResponse.json({ comments: data || [] })
}

export async function DELETE(req: NextRequest) {
  const { id, key } = await req.json()
  if (key !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await supabaseAdmin.from('comments').delete().eq('id', id)
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: NextRequest) {
  const { id, key } = await req.json()
  if (key !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Unflag a comment
  await supabaseAdmin.from('comments').update({ is_flagged: false }).eq('id', id)
  return NextResponse.json({ ok: true })
}