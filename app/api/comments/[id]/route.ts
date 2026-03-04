import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await supabaseAdmin.from('comments')
    .update({ is_flagged: true }).eq('id', params.id)
  return NextResponse.json({ ok: true })
}