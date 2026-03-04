import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { voter_id } = await req.json()
  const commentId = params.id

  const { data: existing } = await supabaseAdmin
    .from('comment_upvotes')
    .select('id')
    .eq('comment_id', commentId)
    .eq('voter_id', voter_id)
    .maybeSingle()

  if (existing) {
    await supabaseAdmin.from('comment_upvotes')
      .delete().eq('comment_id', commentId).eq('voter_id', voter_id)
    await supabaseAdmin.rpc('decrement_upvotes', { comment_id: commentId })
  } else {
    await supabaseAdmin.from('comment_upvotes')
      .insert({ comment_id: commentId, voter_id })
    await supabaseAdmin.rpc('increment_upvotes', { comment_id: commentId })
  }

  return NextResponse.json({ ok: true })
}